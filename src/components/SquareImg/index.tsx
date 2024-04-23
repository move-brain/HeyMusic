import { memo, useState } from "react";
import style from "./index.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { replaceHttpToHttps as rp } from "@/utils";

interface Props {
    cover: string;
    isKeep?: boolean;
}
const SquareImg = ({ cover, isKeep }: Props) => {
    const [isHovered, setIsHovered] = useState(isKeep ? true : false);
    const [iscomplete, setIscomplete] = useState(false);
    const backImage = { backgroundImage: `url(${cover})` };
    return (
        <div
            onMouseEnter={() => {
                !isKeep && setIsHovered(true);
            }}
            onMouseLeave={() => {
                !isKeep && setIsHovered(false);
            }}
            className={style.ImgePar}
        >
            {!iscomplete && (
                <Skeleton
                    variant="rounded"
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                />
            )}
            <img
                src={`${rp(cover)}?param=400y400`}
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

export default memo(SquareImg);
