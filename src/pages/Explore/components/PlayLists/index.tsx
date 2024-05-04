import { memo } from "react";
import { type Tagplaylist } from "@/apis/playlist";
import PlaylistItem from "@/components/PlaylistItem";
import style from "./index.module.scss";
import { Loading } from "@/components";

interface Props {
    Playlist: Tagplaylist["playlists"] | [];
    onPlayAll: (id: number, type?: string) => Promise<void>;
    IsLoading: boolean;
}
const PlayLists = ({ Playlist, onPlayAll, IsLoading }: Props) => {
    if (PlayLists.length === 0 || IsLoading) {
        return <Loading />;
    }
    return (
        <div className={style.PlayLists}>
            {Playlist.map(({ id, name, coverImgUrl, playCount }) => (
                <div key={id}>
                    <PlaylistItem
                        onPlayAll={onPlayAll}
                        name={name}
                        url={coverImgUrl}
                        id={id}
                        playCount={playCount}
                    ></PlaylistItem>
                </div>
            ))}
        </div>
    );
};
export default memo(PlayLists);
