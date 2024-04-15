import style from "./index.module.scss";
import PlaylistItem from '@/components/PlaylistItem'
import { Link } from "react-router-dom";
import type { SearchAlbumRes } from '@/apis/search';
import { memo } from "react";
interface Props {
    albums:SearchAlbumRes["result"]["albums"];
    onPlayAll: (id: number) => Promise<void>;
}

function NewalbumList({ albums, onPlayAll }: Props) {
    const renderList = (list: Props["albums"]) => (
        <div className="albumList">
            {list.map(({ id, name, picUrl , artists }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem type="Album" name={name} id={id} url={picUrl} onPlayAll={onPlayAll}  />
                    { artists.map((item)=>(<Link key={item.id} className="SingerName" to={`/Singer?id=${item.id}`} >{item.name}</Link>))} 
                </div>
            ))}
        </div>
    );
    return (
        <div className={style["new-album"]}>
            {renderList(albums)}
        </div>
    );
}

export default memo(NewalbumList);
