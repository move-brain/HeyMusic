import style from "./index.module.scss";
import { Link } from "react-router-dom";
import { setPlaylist, playSong, selectSong } from "@/store/songSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import type { MouseEvent } from "react";
import type { PageState } from "../../index";

interface Props {
    data: PageState["recentSong"];
}

function RecentSonglist({ data }: Props) {
    const dispatch = useAppDispatch();
    const song = useAppSelector(selectSong);
    const { playlist } = song;
    // 播放点击的歌曲
    const handlePlay = (e: MouseEvent, index: number) => {
        e.preventDefault();
        const clickSong = data[index];
        const newPlaylist = playlist.slice();
        newPlaylist.push(clickSong);
        dispatch(setPlaylist(newPlaylist));
        dispatch(playSong({ item: clickSong }));
    };
    const renderList = (list: Props["data"], offset: number) =>
        list.map(({ id, name, cover, singers }, idx) => (
            <div className={style.item} key={id}>
                <Link className={style.image} to={`/Song?id=${id}`}>
                    <div className={style.image1}>
                        <img src={cover} loading="lazy" />
                    </div>
                </Link>
                <div className={style.information}>
                    <Link className={style["song-title"]} to={`/Song?id=${id}`}>
                        {name}
                    </Link>
                    <div className={style.singer}>
                        {singers.map(({ name }) => name).join(" / ")}
                    </div>
                </div>
            </div>
        ));

    return (
        <div className={style["recent-songlist"]}>
            {renderList(data.slice(0, 10), 0)}
        </div>
    );
}

export default RecentSonglist;
