import style from "./View.module.scss";
import SelectList from "./SelectList";
import { Tagplaylist } from "@/apis/playlist";
import PlayLists from "./PlayLists";
interface Props {
    Playlist: Tagplaylist["playlists"] | [];
    category: string;
    onPlayAll: (id: number, type?: string) => Promise<void>;
    IsLoading: boolean;
    getMore: () => Promise<void>;
}
const View = ({ Playlist, category, onPlayAll, IsLoading, getMore }: Props) => {
    return (
        <div className={style.explore}>
            <div className="headline">发现</div>
            <SelectList category={category} />
            <PlayLists
                getMore={getMore}
                IsLoading={IsLoading}
                onPlayAll={onPlayAll}
                Playlist={Playlist}
            ></PlayLists>
        </div>
    );
};
export default View;
