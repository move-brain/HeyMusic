import { memo } from "react";
import style from "./index.module.scss";
import { Header, MusicPlayer } from "@/components";
import type { ReactElement } from "react";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import { useAppSelector } from "@/store/hook";
import { selectSong } from "@/store/songSlice";
interface Props {
    children: ReactElement;
}

function Layout({ children }: Props) {
    const song = useAppSelector(selectSong);
    const { playingItem, playlist } = song;
    return (
        <div className={style.layout}>
            <div className={style.top}>
                <Header />
            </div>
            <div className={style.middle}>
                <Fade in timeout={1000}>
                    <div className={style.right}>{children}</div>
                </Fade>
            </div>
            {playingItem.id !== 776039 && playlist.length == 1 && (
                <Slide direction="up" timeout={1500} in={true}>
                    <div className={style.bottom}>
                        <MusicPlayer />
                    </div>
                </Slide>
            )}
        </div>
    );
}

export default memo(Layout);
