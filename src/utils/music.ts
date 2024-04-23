import ajax from "@/apis/apiBase";
import axios from "axios";
import cache from "./cache";
import { songDetail, getLyric } from "@/apis/song";
import { resolveLyric, resolveSongs } from "@/utils/resolve";
import { replaceHttpToHttps as rp } from "@/utils";
import getFreqData from "./getFreqData";

export interface MusicItem {
    buffer: ArrayBuffer;
    info: {
        id: number;
        name: string;
        singers: Array<{ id: number; name: string }>;
        duration: number;
        cover: string;
        isFree: boolean;
        albumId: number;
        albumName: string;
        lyric: [string, string, number][];
    };
}

interface PlayingItem extends MusicItem {
    abuffer: AudioBuffer;
}

// canvas width / height
const W = 900;
const H = 310;

class Music {
    private isLoading: boolean;
    // 播放结束的回调
    private onEnded: (() => void) | null;
    // 开始时间，用于计算当前播放时长
    private startTime: number | false; //开始时间，用于计算当前播放时长。如果音乐正在播放，则该变量存储音乐播放开始的时间戳；如果音乐暂停或停止，则为 false
    // 当前播放的歌曲
    private playingItem: PlayingItem | null; //当前正在播放的歌曲对象
    private rejectFn: () => void; //用于取消音乐播放的函数，当需要取消上一次的音乐播放请求时，调用该函数即可

    private audioContext: AudioContext; //Web Audio API 中的 AudioContext 对象，用于处理音频相关的操作，例如创建音频源、连接音频节点等
    private gainNode: GainNode; //音频增益节点，用于控制音频的音量大小
    private reqId: number;
    private canvasContext: CanvasRenderingContext2D | null;
    private currentSource: AudioBufferSourceNode | null;

    constructor() {
        this.isLoading = false;
        this.audioContext = new AudioContext();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination); //连接到扬声器 便于控制音量 音频源节点连接它（音频节点也可以直接连接扬声器）
        this.canvasContext = null;
        this.currentSource = null;
        this.onEnded = null;
        this.startTime = false;
        this.playingItem = null;
        this.rejectFn = () => {};
        this.reqId = 0;
        this.drawCanvas = this.drawCanvas.bind(this);
    }

    /* ============= 私有方法 ============= */

    /**
     * 绘制音乐频谱图
     */
    private drawCanvas() {
        // 请求下一次绘制
        this.reqId = requestAnimationFrame(this.drawCanvas);

        const { canvasContext, playingItem } = this;
        if (!playingItem) {
            return;
        }

        // 0 ~ 1 的数组
        const data = getFreqData(playingItem.abuffer);

        // 绘制
        canvasContext!.clearRect(0, 0, W, H);
        const barWidth = W / data.length;
        for (let i = 0; i < data.length; ++i) {
            const barHeight = data[i] * H;
            const x = i * barWidth;
            const y = H - barHeight;
            canvasContext!.fillRect(x, y, barWidth, barHeight);
        }
    }

    /**
     * 获取指定 id 歌曲信息
     */
    private getMusic(id: number): Promise<PlayingItem | null> {
        //   获取歌曲的PCM Data   返回一个promise
        return new Promise((resolve, reject) => {
            const { audioContext } = this;
            this.rejectFn = reject;
            // id 为当前播放的歌曲
            if (id === this.playingItem?.info?.id) {
                resolve(this.playingItem);
                return;
            }

            const cacheItem = cache().get(id);

            // 已缓存，使用缓存项生成 AudioBuffer 再返回
            if (cacheItem) {
                audioContext
                    .decodeAudioData(cacheItem.buffer.slice(0))
                    .then((abuffer) => {
                        resolve({
                            ...cacheItem,
                            abuffer,
                        });
                    });
                return;
            }
            ajax<{ code: number; data: any }>(`/song/url?id=${id}`).then(
                (res) => {
                    if (res.code !== 200 || res.data[0].code !== 200) {
                        resolve(null);
                        return;
                    }
                    console.log(res.data);
                    const { url } = res.data[0]; //获取歌曲url
                    const pBuffer = axios({
                        url: rp(url),
                        responseType: "arraybuffer", //告诉服务器要以 arraybuffer 格式返回
                    })
                        .then((res) => res.data)
                        .catch((_) => null);

                    Promise.all([
                        pBuffer,
                        songDetail([id]), //获取歌曲详情
                        getLyric(id), //  获取歌词
                    ]).then(([buffer, detailRes, lyricRes]) => {
                        if (buffer === null) {
                            console.log("get music fail, id:", id);
                            resolve(null);
                            return;
                        }
                        // 歌曲详情
                        const detail = resolveSongs(
                            detailRes.songs,
                            "detail"
                        )[0];
                        // 歌词
                        const lyric = resolveLyric(lyricRes);

                        const item = {
                            buffer,
                            info: {
                                ...detail,
                                lyric,
                            },
                        };
                        // 将歌曲信息保存到缓存中
                        cache().save(id, item);

                        audioContext
                            .decodeAudioData(buffer.slice(0))
                            .then((abuffer) => {
                                item.info.duration = abuffer.duration; //歌曲时长
                                resolve({
                                    ...item,
                                    abuffer,
                                });
                            });
                    });
                }
            );
        });
    }

    /**
     * 恢复播放
     */
    private async restart(): Promise<boolean> {
        await this.audioContext.resume(); //恢复之前被暂停的音频上下文中的时间进程
        return true;
    }

    /* ============= 暴露方法 =============  */
    /**
     * 播放歌曲
     *
     * @param id 歌曲 id
     * @param offset 播放初始位置，默认为 0
     */
    async play(id: number, offset?: number): Promise<boolean> {
        const { currentSource, audioContext, gainNode, playingItem, rejectFn } =
            this;
        // 调用 play 时，上一次的 getMusic 可能还没有 fulfilled
        // 直接 reject 掉上一次的调用
        rejectFn();
        // 当前状态为暂停
        // 恢复 Context 为播放状态
        if (audioContext.state === "suspended") {
            this.restart();
            // 需要播放的歌曲与当前歌曲相同
            if (
                playingItem &&
                playingItem.info.id === id &&
                offset === undefined
            ) {
                return true;
            }
        }
        // 停止当前音频
        this.startTime = false;
        if (currentSource) {
            currentSource.onended = null;
            //stop  事件将声音安排在指定的时间停止播放   参数为0 或者是负值将停止播放
            currentSource.stop(0);
            currentSource.disconnect();
        }
        // 获取歌曲的 AudioBuffer
        const music = await this.getMusic(id).catch((_) => null);
        if (!music) {
            return false;
        }
        // 创建 Source
        //方法用于创建一个新的AudioBufferSourceNode接口，该接口可以通过AudioBuffer 对象来播放音频数据
        const source = audioContext.createBufferSource();
        source.buffer = music.abuffer;

        //将音频缓冲区源节点连接到目标（一般是扬声器）
        source.connect(gainNode);
        this.currentSource = source;

        // 播放
        this.startTime = audioContext.currentTime - (offset || 0);
        source.start(audioContext.currentTime, offset || 0); //start方法可以开始播放声音
        this.playingItem = music;

        // 设置播放结束的回调
        source.onended = () => {
            //该音频节点停止播放时触发该事件
            this.startTime = false;
            this.onEnded && this.onEnded();
        };
        return true;
    }

    /**
     * 暂停播放
     */
    async pause(): Promise<boolean> {
        await this.audioContext.suspend(); //暂停音频上下文中的时间进程，暂停音频硬件访问并减少进程中的 CPU/电池使用
        return true;
    }

    /**
     * 设置音量
     * @param value 音量 0 ~ 1 的数字
     */
    setVolume(value: number): void {
        this.gainNode.gain.value = value;
    }

    /**
     * 开始绘制音乐频谱图
     */
    drawStart() {
        cancelAnimationFrame(this.reqId);
        this.reqId = requestAnimationFrame(this.drawCanvas);
    }

    /**
     * 停止绘制音乐频谱图
     */
    drawStop() {
        this.canvasContext!.clearRect(0, 0, W, H);
        cancelAnimationFrame(this.reqId);
    }

    /**
     * 设置 canvas context
     */
    setCanvasContext(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#6dccff";
        this.canvasContext = ctx;
    }

    /**
     * 下载歌曲
     * @param id 歌曲 id
     */
    async download(id: number): Promise<boolean> {
        const music = await this.getMusic(id);
        if (!music) {
            return false;
        }
        const { singers, name } = music.info;
        const singerName = singers.map((singer) => singer.name).join("_");
        const blob = new Blob([music.buffer]);
        const blobUrl = URL.createObjectURL(blob);

        // 使用 a 标签结合 download 属性下载
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${name} - ${singerName}.mp3`;
        a.click();
        URL.revokeObjectURL(blobUrl);

        return true;
    }

    /**
     * 设置播放结束时的回调函数
     * @param callback 回调函数
     */
    setOnEnded(callback: () => void) {
        this.onEnded = callback;
    }

    /**
     * 获取当前播放时长
     */
    getCurrentTime(): number {
        const { audioContext, startTime } = this;
        return startTime !== false ? audioContext.currentTime - startTime : 0;
    }

    /**
     * 获取当前播放的歌曲
     */
    getPlayingItem(): MusicItem["info"] {
        return this.playingItem!.info;
    }
}

// 单例模式

export default (() => {
    let instance: Music;
    return () => instance || (instance = new Music());
})();
