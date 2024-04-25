import { useState, useEffect, memo, createContext } from "react";
import View from "./components/View";
import { resolveSongs } from "@/utils/resolve";
import {
    recommendPlaylist,
    topSong,
    topPlaylist,
    newAlbumlist,
    hotSinger,
} from "@/apis/discovery";
import { songDetail } from "@/apis/song";
import { album } from "@/apis/album";
import { playlistDetail } from "@/apis/playlist";
import { setPlaylist, playSong, commitPlaying } from "@/store/songSlice";
import { useAppDispatch } from "@/store/hook";
import type {
    RecommendPlaylistRes,
    topPlaylistRes,
    newAlbumlistType,
    hotSingerType,
} from "@/apis/discovery";
import type { SongItem } from "@/store/songSlice/types";
import type { officialType } from "./components/HuaLiu/utils";
import officialList from "./components/HuaLiu/utils";
export interface PageState {
    // 推荐歌单
    recommendPlaylist: RecommendPlaylistRes["result"];
    // 最新音乐
    recentSong: SongItem[];
    //排行榜
    rankingList: topPlaylistRes["list"];
    //新专辑
    albumList: newAlbumlistType["album"];
    //热门歌手
    hotSinger: hotSingerType["singer"];
    //第一栏
    fristPlayList: officialType["playList"];
}
export const PlayAllContext =
    //@ts-ignore
    createContext<(id: number, type?: string) => Promise<void>>(null);
function Discovery() {
    const [pageState, setPageState] = useState<PageState | null>(null);
    const dispatch = useAppDispatch();
    // 播放歌单内所有歌曲
    const handlePlayAll = async (id: number, type?: string) => {
        const detailRes =
            type == "Album" ? await album(id) : await playlistDetail(id);
        // 歌单中所有歌曲的 id
        const songIds =
            type == "Album"
                ? detailRes.songs.map((_: any) => _.id)
                : detailRes.playlist.trackIds.map((item: any) => item.id);
        const songRes = await songDetail(songIds);
        // 解析后的歌曲列表
        const songList = resolveSongs(songRes.songs, "detail");
        // 过滤 VIP 歌曲
        const freeSongList = songList.filter((item) => item.isFree);
        // 播放第一首歌曲

        dispatch(setPlaylist(freeSongList));
        dispatch(commitPlaying(freeSongList[0]));
        dispatch(playSong({ item: freeSongList[0] }));
    };
    // 改变标题
    useEffect(() => {
        document.title = "发现音乐";
    }, []);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            Promise.allSettled([
                recommendPlaylist(),
                topSong(),
                topPlaylist(),
                newAlbumlist(),
                hotSinger(),
            ]).then((res) => {
                setPageState({
                    recommendPlaylist:
                        res[0].status === "fulfilled"
                            ? res[0].value.result.slice(0, 10)
                            : [],
                    recentSong:
                        res[1].status === "fulfilled"
                            ? resolveSongs(res[1].value.data, "topSong")
                            : [],
                    rankingList:
                        res[2].status === "fulfilled"
                            ? res[2].value.list.slice(11, 16)
                            : [],
                    albumList:
                        res[3].status === "fulfilled"
                            ? res[3].value.albums
                            : [],
                    hotSinger:
                        res[4].status === "fulfilled"
                            ? res[4].value.list.artists
                            : [],
                    fristPlayList: officialList,
                });
            });
        };
        getData();
    }, []);
    return (
        <PlayAllContext.Provider value={handlePlayAll}>
            <View pageState={pageState} />
        </PlayAllContext.Provider>
    );
}

export default Discovery;
