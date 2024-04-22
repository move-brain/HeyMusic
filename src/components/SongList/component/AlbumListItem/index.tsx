import { memo, useState } from "react";
import style from "./index.module.scss";
import { convertTime } from "@/utils";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

interface Props {
    id: number;
    name: string;
    singers: Array<{ id: number; name: string }>;
    duration: number;
    isFree: boolean;
    albumId: number;
    albumName: string;
    cover: string;
    Idx: number;
}
const PlayListItem = ({
    id,
    name,
    singers,
    duration,
    Idx,
    isFree,
    albumId,
    albumName,
    cover,
}: Props) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            style={{ color: !isFree ? "#b8b8b8" : "black" }}
            className={style.AlbumListItem}
        >
            <div
                className={style.left}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {isHover ? (
                    <PlayArrowRounded
                        sx={{
                            cursor: "pointer",
                            height: "100%",
                            fontSize: "32px",
                            color: "#335eea",
                        }}
                    />
                ) : (
                    <span>{Idx}</span>
                )}

                <div className={style.songName}>{name}</div>
            </div>
            <div className={style.duration}>{convertTime(duration)}</div>
        </div>
    );
};

export default memo(PlayListItem);
