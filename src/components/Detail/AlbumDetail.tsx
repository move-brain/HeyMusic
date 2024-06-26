import { Fragment } from "react";
import { Link } from "react-router-dom";
import { setPlaylist, playSong, commitPlaying } from "@/store/songSlice";
import SquareImg from "@/components/SquareImg";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import PlayButton from "../PlayButton";
import { replaceHttpToHttps as rp } from "@/utils";
import type { SongItem } from "@/store/songSlice/types";
import { useAppDispatch } from "@/store/hook";

interface Props {
    detailData: {
        title: string;
        cover: string;
        singers: { id: number; name: string }[];
        publishTime: number;
        description: string;
    };
    songList: SongItem[];
}

function AlbumDetail({ detailData, songList }: Props) {
    const { title, cover, singers, publishTime, description } = detailData;
    const dispatch = useAppDispatch();
    // 播放全部

    const handlePlayAll = async () => {
        const freeSongList = songList.filter((item) => item.isFree);
        const firstSong = freeSongList[0];
        dispatch(playSong({ item: firstSong }));
        dispatch(commitPlaying(firstSong));
        dispatch(setPlaylist(freeSongList));
    };

    return (
        <>
            <div className="list-left">
                <SquareImg isKeep cover={`${rp(cover)}?param=400y400`} />
            </div>
            <div className="list-right">
                <div className="title-album">{title}</div>
                <div>
                    <div className="singer">
                        <span>Album by</span>
                        {singers.map(({ id, name }, idx) => (
                            <Fragment key={idx}>
                                <Link to={`/Singer?id=${id}`}>
                                    <span>{" " + name}</span>
                                    {" " + name}
                                </Link>
                                <span> / </span>
                            </Fragment>
                        ))}
                    </div>
                    <div className="Date">
                        {new Date(publishTime)
                            .toLocaleDateString()
                            .slice(0, 4) +
                            " " +
                            songList.length +
                            "首歌"}
                    </div>
                </div>

                {description && (
                    <div className="description">{description}</div>
                )}
                <PlayButton text="播放" ClickButton={handlePlayAll}>
                    <PlayArrowRounded />
                </PlayButton>
            </div>
        </>
    );
}

export default AlbumDetail;
