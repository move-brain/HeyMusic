import { memo, useState } from "react";
import style from "./index.module.scss";
import Skeleton from "@mui/material/Skeleton";
import { replaceHttpToHttps as rp } from "@/utils";

interface Props {
    cover: string;
    isKeep?: boolean;
    highDefinition?: boolean;
}
const SquareImg = ({ cover, isKeep, highDefinition }: Props) => {
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
            {highDefinition ? (
                <img
                    src={`${rp(cover)}`}
                    loading="lazy"
                    onLoad={() => setIscomplete(true)}
                />
            ) : (
                <img
                    srcSet={`${rp(cover)}?param=100y100 100w,${rp(
                        cover
                    )}?param=200y200 250w,${rp(cover)}?param=300y300 300w,${rp(
                        cover
                    )}?param=400y400 400w`}
                    sizes="15vw"
                    src={`${rp(cover)}`}
                    loading="lazy"
                    onLoad={() => setIscomplete(true)}
                />
            )}

            <div
                className={style.shaow}
                style={isHovered ? backImage : {}}
            ></div>
        </div>
    );
};

export default memo(SquareImg);
