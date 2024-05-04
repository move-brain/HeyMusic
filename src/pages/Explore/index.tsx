import { useEffect, useState } from "react";
import View from "./components/View";
import { useQuery } from "@/utils/hooks";
import { songDetail } from "@/apis/song";
import { useAppDispatch } from "@/store/hook";
import { resolveSongs } from "@/utils/resolve";
import {
    getTagPlaylist,
    type Tagplaylist,
    playlistDetail,
} from "@/apis/playlist";
import { setPlaylist, playSong, commitPlaying } from "@/store/songSlice";
const explore = () => {
    const category = useQuery("category") || "全部";
    const [Playlist, setPlaylists] = useState<Tagplaylist["playlists"] | []>(
        []
    );
    const [IsLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    // 播放歌单内所有歌曲
    const handlePlayAll = async (id: number, type?: string) => {
        const detailRes = await playlistDetail(id);
        // 歌单中所有歌曲的 id
        const songIds = detailRes.playlist.trackIds.map((item: any) => item.id);
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
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const playlist = await getTagPlaylist(category);
            setPlaylists(playlist.playlists);
            setIsLoading(false);
        };
        getData();
    }, [category]);
    return (
        <View
            IsLoading={IsLoading}
            onPlayAll={handlePlayAll}
            category={category}
            Playlist={Playlist}
        />
    );
};
export default explore;
