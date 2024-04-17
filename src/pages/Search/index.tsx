import { useEffect, useState, Suspense } from "react";
import View from "./components/View";
import { search } from "@/apis/search";
import { replaceHttpToHttps as rp } from "@/utils";
import { resolveSongs } from "@/utils/resolve";
import { useQuery } from "@/utils/hooks";
import { Loading } from "@/components";
import type {
    SearchSongRes,
    SearchAlbumRes,
    SearchSingerRes,
    SearchPlaylistRes,
    SearchVideosRes,
} from "@/apis/search";

export interface PageState {
    songs: SearchSongRes["result"]["songs"];
    albums: SearchAlbumRes["result"]["albums"];
    videos: SearchVideosRes["result"]["videos"];
    artists: SearchSingerRes["result"]["artists"];
    playlists: SearchPlaylistRes["result"]["playlists"];
}

// 类别对应的数字
const typeMap = {
    song: "1",
    album: "10",
    singer: "100",
    playlist: "1000",
    videos: "1014",
};

function Search() {
    const keyword = useQuery("keyword");
    const [pageState, setPageState] = useState<PageState | null>(null);

    const handlePlay = async (id: number) => {
        console.log(id);
    };

    // 获取搜索内容
    useEffect(() => {
        if (!keyword) {
            return;
        }
        const requests = [
            search(keyword, typeMap["song"], 0, 16),
            search(keyword, typeMap["album"], 0, 3),
            search(keyword, typeMap["singer"], 0, 3),
            search(keyword, typeMap["videos"], 0, 5),
            search(keyword, typeMap["playlist"], 0, 12),
        ];
        const getData = async () => {
            Promise.all(requests).then((res) => {
                setPageState({
                    songs: resolveSongs(
                        (res[0] as SearchSongRes).result.songs,
                        "search"
                    ),
                    albums: (res[1] as SearchAlbumRes).result.albums.map(
                        (item) => {
                            const { id, name, artists } = item;
                            const picUrl = rp(item.picUrl);
                            const singers = artists.map(({ id, name }) => ({
                                id,
                                name,
                            }));
                            return { id, name, picUrl, artists: singers };
                        }
                    ),
                    artists: (res[2] as SearchSingerRes).result.artists.map(
                        (item) => {
                            const { id, name } = item;
                            const picUrl = rp(item.picUrl);
                            return { id, name, picUrl };
                        }
                    ),
                    playlists: (
                        res[4] as SearchPlaylistRes
                    ).result.playlists.map((item) => {
                        const { id, name, description } = item;
                        const picUrl = rp(item.coverImgUrl);
                        return { id, name, coverImgUrl: picUrl, description };
                    }),
                    videos: (res[3] as SearchVideosRes).result.videos!.map(
                        (item) => {
                            const { vid, coverUrl, creator, title } = item;
                            const picUrl = rp(coverUrl);
                            return { vid, coverUrl: picUrl, creator, title };
                        }
                    ),
                });
            });
        };
        getData();
    }, []);

    if (!keyword) {
        return <div>请输入搜索内容</div>;
    }

    return (
        <Suspense fallback={<Loading />}>
            <View pageState={pageState} onPlayAll={handlePlay} />
        </Suspense>
    );
}

export default Search;
