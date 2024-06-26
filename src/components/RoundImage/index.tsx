import { memo, useState } from "react";
import style from "./index.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { replaceHttpToHttps as rp } from "@/utils";

interface Props {
    cover: string;
}
const RoundImg = ({ cover }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iscomplete, setIscomplete] = useState(false);
    const backImage = {
        backgroundImage: `url(${rp(cover)}?param=200y200)`,
        borderRadius: "50%",
    };
    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={style.ImgePar}
        >
            {!iscomplete && (
                <Skeleton
                    variant="rounded"
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                    }}
                />
            )}
            <img
                srcSet={`${rp(cover)}?param=100y100 100w,${rp(
                    cover
                )}?param=200y200 250w,${rp(cover)}?param=300y300 300w,${rp(
                    cover
                )}?param=400y400 400w`}
                sizes="12.6vw"
                src={`${rp(cover)}?param=800y800`}
                loading="lazy"
                onLoad={() => setIscomplete(true)}
            />
            <div
                className={style.shaow}
                style={isHovered ? backImage : {}}
            ></div>
        </div>
    );
};

export default memo(RoundImg);
