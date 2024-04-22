import { Link } from "react-router-dom";
import { songDetail } from "@/apis/song";
import { replaceHttpToHttps as rp } from "@/utils";

import type { SongItem } from "@/store/songSlice/types";
import { resolveSongs } from "@/utils/resolve";
import cache from "@/utils/cache";
import { setPlaylist, playSong, commitPlaying } from "@/store/songSlice";
import { useAppDispatch } from "@/store/hook";
import SquareImg from "@/components/SquareImg";
import PlayButton from "../PlayButton";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

interface Props {
    detailData: {
        title: string;
        cover: string;
        creator: {
            id: number;
            name: string;
            avatar: string;
            createTime: number;
        };
        tags: string[];
        isCreator: boolean;
        description: string;
    };
    songList?: SongItem[];
    songIds?: number[];
}

function PlaylistDetail({ detailData, songList, songIds }: Props) {
    const { title, cover, creator, tags, description } = detailData;
    const dispatch = useAppDispatch();
    const handlePlayAll = async () => {
        // 免费歌曲列表
        let freeSongList: SongItem[] = [];
        // 已有歌曲数据
        if (songList) {
            freeSongList = songList.filter((item) => item.isFree);
        } else if (songIds) {
            // 没有歌曲数据
            const count = Math.ceil(songIds.length * 0.02);
            // 分割 id， 每 50 个 id 请求一次
            for (let i = 0; i < count; ++i) {
                const startIndex = i * 50;
                const sliceIds = songIds.slice(startIndex, startIndex + 50);
                const res = await songDetail(sliceIds);
                const freeList = resolveSongs(res.songs, "detail").filter(
                    (item) => item.isFree
                );
                freeSongList = [...freeSongList, ...freeList];
            }
        }
        cache().delAll();
        dispatch(setPlaylist(freeSongList));
        dispatch(commitPlaying(freeSongList[0]));
        dispatch(playSong({ item: freeSongList[0] }));
    };

    return (
        <>
            <div className="list-left">
                <SquareImg isKeep cover={`${rp(cover)}?param=400y400`} />
            </div>
            <div className="list-right">
                <div className="title-playlist">{title}</div>
                <div className="creator">
                    <Link to={`/User?id=${creator.id}`}>
                        <img src={`${rp(creator.avatar)}?param=100y100`} />
                    </Link>
                    <div>
                        <Link
                            to={`/User?id=${creator.id}`}
                            className="creatoeName"
                        >
                            {creator.name}
                        </Link>
                        <div className="Date">
                            {new Date(creator.createTime)
                                .toLocaleDateString()
                                .replace(/\//g, "-")}
                            创建
                        </div>
                    </div>
                </div>
                {description && (
                    <div className="description">{description}</div>
                )}
                <PlayButton ClickButton={handlePlayAll} text="播放">
                    <PlayArrowRounded />
                </PlayButton>
            </div>
        </>
    );
}

export default PlaylistDetail;
