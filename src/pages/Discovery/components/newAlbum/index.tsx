import style from "./index.module.scss";
import PlaylistItem from '@/components/PlaylistItem'
import { Link } from "react-router-dom";
import type { PageState } from "../../index";
interface Props {
    data: PageState["albumList"];
    onPlayAll: (id: number) => Promise<void>;
}

function NewalbumList({ data, onPlayAll }: Props) {
    const renderList = (list: Props["data"]) => (
        <div className="playlist">
            {list.map(({ id, name, blurPicUrl , artist }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem type="Album" name={name} id={id} url={blurPicUrl} onPlayAll={onPlayAll}  />
                    <Link className="SingerName" to={`/Singer?id=${artist.id}`} >{artist.name}</Link>
                </div>
            ))}
        </div>
    );
    return (
        <div className={style["new-album"]}>
            {renderList(data.slice(0, 10))}
        </div>
    );
}

export default NewalbumList;
