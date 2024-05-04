import style from "./View.module.scss";
import SelectList from "./SelectList";
import { Tagplaylist } from "@/apis/playlist";
import PlayLists from "./PlayLists";
interface Props {
    Playlist: Tagplaylist["playlists"] | [];
    category: string;
    onPlayAll: (id: number, type?: string) => Promise<void>;
    IsLoading: boolean;
}
const View = ({ Playlist, category, onPlayAll, IsLoading }: Props) => {
    return (
        <div className={style.explore}>
            <div className="headline">发现</div>
            <SelectList category={category} />
            <PlayLists
                IsLoading={IsLoading}
                onPlayAll={onPlayAll}
                Playlist={Playlist}
            ></PlayLists>
        </div>
    );
};
export default View;
