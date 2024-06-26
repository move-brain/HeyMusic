import { memo, useMemo } from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";
import { convertTime } from "@/utils";
import { replaceHttpToHttps as rp } from "@/utils";
import type { State } from "@/store/songSlice/types";

interface Props {
    playingItem: State["playingItem"];
}

function SongInformation({ playingItem }: Props) {
    const { id, name, cover, singers, duration } = playingItem;
    return (
        <div className={style.container}>
            <img src={`${rp(cover)}?param=100y100`} />
            <div className="information">
                <Link className="songName" to={`/Song?id=${id}`}>
                    {name}
                </Link>
                <div className="singers">
                    {singers.map((item) => (
                        <Link
                            key={item.id}
                            to={`/Singer?id=${item.id}`}
                            className="singer"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(SongInformation);
