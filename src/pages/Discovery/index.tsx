import { useState, useEffect } from "react";
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
function Discovery() {
    const [pageState, setPageState] = useState<PageState | null>(null);
    const dispatch = useAppDispatch();
    // 播放歌单内所有歌曲
    const handlePlayAll = async (id: number) => {
        const detailRes = await playlistDetail(id);
        // 歌单中所有歌曲的 id
        const songIds = detailRes.playlist.trackIds.map((item) => item.id);
        const songRes = await songDetail(songIds);
        // 解析后的歌曲列表
        const songList = resolveSongs(songRes.songs, "detail");
        // 过滤 VIP 歌曲
        const freeSongList = songList.filter((item) => item.isFree);
        // 播放第一首歌曲

        dispatch(setPlaylist(freeSongList));
        dispatch(commitPlaying(songList[0]));
        dispatch(playSong({ item: songList[0] }));
    };

    // 改变标题
    useEffect(() => {
        document.title = "发现音乐";
    }, []);

    useEffect(() => {
        const getData = async () => {
            // 轮播图
            // 推荐歌单
            const playlistRes = await recommendPlaylist();

            // 最新音乐
            const recentSongRes = await topSong();
            //排行榜
            const top = await topPlaylist();
            //最新专辑
            const newAlbum = await newAlbumlist();
            //热门歌手
            const Singers = await hotSinger();

            setPageState({
                recommendPlaylist: playlistRes.result.slice(0, 10),
                recentSong: resolveSongs(recentSongRes.data, "topSong"),
                rankingList: top.list.slice(11, 16),
                albumList: newAlbum.albums,
                hotSinger: Singers.list.artists,
                fristPlayList: officialList,
            });
        };
        getData();
    }, []);
    return <View pageState={pageState} onPlayAll={handlePlayAll} />;
}

export default Discovery;
