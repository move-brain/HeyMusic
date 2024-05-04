import { memo } from "react";
import { type Tagplaylist } from "@/apis/playlist";
import PlaylistItem from "@/components/PlaylistItem";
import style from "./index.module.scss";
import { Loading } from "@/components";
import PlayButton from "@/components/PlayButton";
interface Props {
    Playlist: Tagplaylist["playlists"] | [];
    onPlayAll: (id: number, type?: string) => Promise<void>;
    IsLoading: boolean;
    getMore: () => Promise<void>;
}
const PlayLists = ({ Playlist, onPlayAll, IsLoading, getMore }: Props) => {
    if (PlayLists.length === 0 || IsLoading) {
        return <Loading />;
    }
    return (
        <>
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
            <div className={style.bottomButton}>
                <PlayButton width="200px" text="加载更多" ClickButton={getMore}>
                    <div></div>
                </PlayButton>
            </div>
        </>
    );
};
export default memo(PlayLists);
