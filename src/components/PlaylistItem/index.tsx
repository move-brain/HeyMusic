import style from "./index.module.scss";
import { Link } from "react-router-dom";
import { Icon } from "@/components";
import { replaceHttpToHttps as rp } from "@/utils";
import SquareImg from "@/components/SquareImg";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { IconButton } from "@mui/material";
import type { MouseEvent } from "react";

interface Props {
    id: number;
    name: string;
    url: string;
    onPlayAll: (id: number) => Promise<void>;
    type?: string;
}

export default ({ id, url, name, onPlayAll, type = "playList" }: Props) => {
    const handlePlay = (e: MouseEvent, id: number) => {
        e.preventDefault();
        onPlayAll(id);
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
                <SquareImg cover={rp(url)} />
                <div className="play-button" onClick={(e) => handlePlay(e, id)}>
                    <IconButton>
                        <PlayArrowRoundedIcon
                            sx={{
                                color: "#fff",
                            }}
                        />
                    </IconButton>
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
                {name}
            </Link>
        </div>
    );
};
