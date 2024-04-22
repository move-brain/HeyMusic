import { memo, useState } from "react";
import style from "./index.module.scss";
import Skeleton from "@mui/material/Skeleton";
interface Props {
    cover: string;
}
const RoundImg = ({ cover }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iscomplete, setIscomplete] = useState(false);
    const backImage = {
        backgroundImage: `url(${cover})`,
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
                src={cover}
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
