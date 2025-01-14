import { memo } from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";
import { convertTime } from "@/utils";
import { replaceHttpToHttps as rp } from "@/utils";
interface Props {
    data: {
        id: number;
        name: string;
        singers: Array<{ id: number; name: string }>;
        duration: number;
        isFree: boolean;
        albumId: number;
        albumName: string;
        cover: string;
    };
}
const PlayListItem = ({ data }: Props) => {
    const { id, name, singers, duration, isFree, albumId, albumName, cover } =
        data;
    return (
        <div
            style={{ color: !isFree ? "#b8b8b8" : "black" }}
            className={style.playListItem}
        >
            <div className={style.left}>
                <Link to={`/Song?id=${id}`}>
                    {" "}
                    <img
                        className={style.image}
                        src={`${rp(cover)}?param=100y100`}
                    />
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
            <Link
                style={{ color: !isFree ? "#b8b8b8" : "black" }}
                className={style.albumName}
                to={`/Album?id=${albumId}`}
            >
                <span>{albumName}</span>
            </Link>
            <div className={style.duration}>{convertTime(duration)}</div>
        </div>
    );
};

export default memo(PlayListItem, (prevProps, nextProps) => {
    return prevProps.data.id === nextProps.data.id; // 根据唯一 ID 判断是否需要重新渲染
});
