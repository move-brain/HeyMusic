import style from "./index.module.scss";
import PlaylistItem from "@/components/PlaylistItem";
import { Link } from "react-router-dom";
import { PlayAllContext, type PageState } from "../../index";
import { useContext } from "react";
interface Props {
    data: PageState["albumList"];
}

function NewalbumList({ data }: Props) {
    const onPlayAll = useContext(PlayAllContext);
    const renderList = (list: Props["data"]) => (
        <div className="playlist">
            {list.map(({ id, name, blurPicUrl, artist }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem
                        type="Album"
                        name={name}
                        id={id}
                        url={blurPicUrl}
                        onPlayAll={onPlayAll}
                    />
                    <Link className="SingerName" to={`/Singer?id=${artist.id}`}>
                        {artist.name}
                    </Link>
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
