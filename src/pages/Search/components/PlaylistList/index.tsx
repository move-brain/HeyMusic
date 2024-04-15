import style from "./index.module.scss";
import PlaylistItem from '@/components/PlaylistItem'
import type { SearchPlaylistRes } from '@/apis/search';

interface Props {
    playlists: SearchPlaylistRes["result"]["playlists"];
    onPlayAll: (id: number) => Promise<void>;
}

function RecommentPlaylist({ playlists, onPlayAll }: Props) {
    const renderList = (list: Props["playlists"]) => (
        <div className="playlist">
            {list.map(({ id, name, coverImgUrl }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem name={name} id={id} url={coverImgUrl} onPlayAll={onPlayAll}  />
                </div>
            ))}
        </div>
    );
    return (
        <div className={style["recommend-playlist"]}>
            {renderList(playlists)}
        </div>
    );
}

export default RecommentPlaylist;
