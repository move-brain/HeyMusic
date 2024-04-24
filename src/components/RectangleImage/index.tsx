import { memo, useState } from "react";
import style from "./index.module.scss";
import { replaceHttpToHttps as rp } from "@/utils";

interface Props {
    cover: string;
    isKeep?: boolean;
}
const RectangleImg = ({ cover, isKeep }: Props) => {
    const [isHovered, setIsHovered] = useState(isKeep ? true : false);
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
            <img loading="lazy" src={`${rp(cover)}?param=300y300`} />
            <div
                className={style.shaow}
                style={isHovered ? backImage : {}}
            ></div>
        </div>
    );
};

export default memo(RectangleImg);
