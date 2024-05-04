import style from "./index.module.scss";
import { Link } from "react-router-dom";
import SquareImg from "@/components/SquareImg";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { IconButton } from "@mui/material";
import type { MouseEvent } from "react";
import { transitionCount } from "@/utils/index";
interface Props {
    id: number;
    name: string;
    url: string;
    onPlayAll: (id: number, type?: string) => Promise<void>;
    type?: string;
    playCount?: number;
}

export default ({
    id,
    url,
    name,
    onPlayAll,
    type = "playList",
    playCount,
}: Props) => {
    const handlePlay = (e: MouseEvent, id: number) => {
        e.preventDefault();
        onPlayAll(id, type);
    };

    return (
        <div className={style.playlistItem}>
            <Link
                style={{ position: "relative" }}
                to={
                    type == "playList"
                        ? `/Playlist?id=${id}`
                        : `/Album?id=${id}`
                }
            >
                <SquareImg cover={url} />

                <div className="play-button" onClick={(e) => handlePlay(e, id)}>
                    <PlayArrowRoundedIcon
                        sx={{
                            color: "#fff",
                        }}
                    />
                </div>
            </Link>
            <Link
                className="description"
                to={
                    type == "playList"
                        ? `/Playlist?id=${id}`
                        : `/Album?id=${id}`
                }
            >
                {playCount && (
                    <div className="playcount">
                        <PlayArrowRoundedIcon
                            sx={{
                                position: "absolute",
                                left: "-3px",
                                fontSize: "16px",
                            }}
                        />
                        <span>{transitionCount(playCount)}</span>
                    </div>
                )}
                {name}
            </Link>
        </div>
    );
};
