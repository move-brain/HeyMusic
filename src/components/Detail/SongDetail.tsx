import { Fragment } from "react";
import { Link } from "react-router-dom";
import music from "@/utils/music";
import { replaceHttpToHttps as rp } from "@/utils";
import {
    playSong,
    setPlaylist,
    selectSong,
    commitPlaying,
} from "@/store/songSlice";
import type { SongItem } from "@/store/songSlice/types";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import SquareImg from "@/components/SquareImg";
import PlayButton from "../PlayButton";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
interface Props {
    detailData: {
        title: string;
        cover: string;
        singers: { id: number; name: string }[];
        albumId: number;
        albumName: string;
    };
    songData: SongItem;
    lyric: [string, string, number][];
}

function SongDetail({ detailData, songData, lyric }: Props) {
    const { title, cover, singers, albumId, albumName } = detailData;
    const { id, isFree } = songData;
    const dispatch = useAppDispatch();
    const song = useAppSelector(selectSong);
    const { playingItem, playlist } = song;
    // 播放歌曲
    const handlePlay = async () => {
        // 正在播放该歌曲
        if (playingItem.id === songData.id) {
            return;
        }

        // 在播放列表中不包含该歌曲
        // 追加到当前播放列表
        if (!playlist.find((item) => item.id === songData.id)) {
            const newList = playlist.slice();
            newList.push(songData);
            dispatch(setPlaylist(newList));
        }
        dispatch(commitPlaying(songData));
        dispatch(playSong({ item: songData }));
    };

    // 收藏歌曲
    const handleCollectSong = () => {
        // collectSong(id);
    };

    // 下载歌曲
    const handleDownload = async () => {
        music().download(id);
    };

    return (
        <>
            <div className="list-left">
                <SquareImg isKeep cover={`${rp(cover)}?param=400y400`} />
            </div>
            <div className="list-right">
                <div className="title-song">{title}</div>
                <div className="singer">
                    歌手：
                    {singers.map(({ id, name }, idx) => (
                        <Fragment key={idx}>
                            <Link to={`/Singer?id=${id}`}>{name}</Link>
                            <span> / </span>
                        </Fragment>
                    ))}
                </div>
                <div>
                    所属专辑：
                    <Link to={`/Album?id=${albumId}`}>{albumName}</Link>
                </div>
                <div className="btns">
                    <PlayButton
                        IsDisabled={!isFree}
                        text="播放"
                        ClickButton={handlePlay}
                    />
                    <PlayButton
                        IsDisabled={!isFree}
                        text="下载"
                        ClickButton={handleDownload}
                    >
                        <FileDownloadRoundedIcon />
                    </PlayButton>
                </div>
                <input
                    type="checkbox"
                    id="toggle-lyric"
                    className="toggle"
                    style={{ display: "none" }}
                />
                {lyric.length === 0 && <div>暂无歌词</div>}
                <div className="lyric">
                    {lyric.map(([origin, trans], idx) => (
                        <p key={idx}>
                            {origin}
                            {trans && (
                                <>
                                    <br />
                                    {trans}
                                </>
                            )}
                        </p>
                    ))}
                </div>
                <label htmlFor="toggle-lyric" />
            </div>
        </>
    );
}

export default SongDetail;
