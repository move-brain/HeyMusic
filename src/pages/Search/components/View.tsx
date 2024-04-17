import style from "./View.module.scss";
import AlbumList from "./AlbumList";
import SingerList from "./SingerList";
import PlaylistList from "./PlaylistList";
import SongListItem from "../../../components/SongListItem";
import type { PageState } from "../index";
import { Loading } from "@/components";
import VideosList from "./VideosList";

interface Props {
    pageState: PageState | null;
    // setPageState: (pageState: Partial<PageState>) => void;
    onPlayAll: (id: number) => Promise<void>;
}
function View({ pageState, onPlayAll }: Props) {
    if (!pageState) {
        return <Loading />;
    }
    const { songs, albums, videos, artists, playlists } = pageState;
    return (
        <div className={style.view}>
            <div className="arAndalb">
                <div className="Item">
                    <div className="title">艺人</div>
                    <SingerList data={artists} />
                </div>
                <div className="Item">
                    <div className="title">专辑</div>
                    <AlbumList onPlayAll={onPlayAll} albums={albums} />
                </div>
            </div>
            <div className="songs">
                <div className="title">歌曲</div>
                <div className="songList">
                    {songs.map((item) => (
                        <SongListItem key={item.id} data={item} />
                    ))}
                </div>
            </div>
            <div className="videos">
                <div className="title">视频</div>
                <div className="videosList">
                    {videos.slice(0, 3).map((item) => (
                        <VideosList
                            creater={item.creator}
                            key={item.vid}
                            id={item.vid}
                            Url={item.coverUrl}
                            title={item.title}
                        />
                    ))}
                </div>
            </div>
            <div className="playList">
                <div className="title">歌单</div>
                <PlaylistList onPlayAll={onPlayAll} playlists={playlists} />
            </div>
        </div>
    );
}

export default View;
