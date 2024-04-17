import { memo } from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";
interface Props {
    data: {
        id: number;
        duration: number;
        name: string;
        singers: Array<{ id: number; name: string }>;
        isFree: boolean;
        albumId: number;
        albumName: string;
        cover: string;
    };
}
const SongList = ({ data }: Props) => {
    const { id, name, singers, isFree, cover } = data;
    return (
        <div
            style={{ color: !isFree ? "#b8b8b8" : "black" }}
            className={style.playListItem}
        >
            <div className={style.left}>
                <Link to={`/Song?id=${id}`}>
                    {" "}
                    <img className={style.image} src={cover} />
                </Link>
                <div className={style.songAndsinger}>
                    <div className={style.songName}>{name}</div>
                    <div>
                        {singers.map((item, index) => (
                            <Link
                                style={{ color: !isFree ? "#b8b8b8" : "black" }}
                                to={`/Singer?id=${item.id}`}
                                key={item.id}
                                className={style.singer}
                            >
                                {index == singers.length - 1
                                    ? item.name
                                    : item.name + " / "}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(SongList);
