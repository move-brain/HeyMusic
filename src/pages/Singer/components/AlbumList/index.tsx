import style from "./index.module.scss";
import PlaylistItem from '@/components/PlaylistItem'
import { Link } from "react-router-dom";
import { memo } from "react";
interface Props {
    data: {
        id: number;
        name: string;
        artists: { id: number; name: string }[];
        picUrl: string;
        date:string
    }[];
    onPlayAll: (id: number) => Promise<void>;
}

function AlbumList({ data , onPlayAll }: Props) {
    console.log(data);
    
    return (
        <div className={style.albumList}>
            {data.map(({ id, name, picUrl , date}) => (
                <div className="listitem" key={id}>
                    <PlaylistItem type="Album" name={name} id={id} url={picUrl} onPlayAll={onPlayAll}  />
                    <div className="date" >{date}</div>
                </div>
            ))}
        </div>
    );
}
export default memo(AlbumList);
