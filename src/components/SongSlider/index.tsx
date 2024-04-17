import { memo } from "react";
import Slider from "@mui/material/Slider";
interface Props {
    ChanageDuration: (event: Event, value: number) => void;
    currentTime: number;
    duration: number;
    styleObj?: Object;
}

const SongSlider = ({
    ChanageDuration,
    currentTime,
    duration,
    styleObj,
}: Props) => {
    const Sxbase = {
        color: "#335eea",
        height: 2.5,
        padding: "0px",
        position: "absolute",
        top: "0px",
        "& .MuiSlider-thumb": {
            width: 2.5,
            height: 2.5,
            position: "absolute",
            top: "0px",
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:hover, &.Mui-focusVisible, &.Mui-active": {
                color: "#fff",
                boxShadow: "none",
                width: 12,
                height: 12,
            },
        },
        "& .MuiSlider-rail": {
            opacity: 0.28,
            position: "absolute",
            top: "0px",
        },
        "& .MuiSlider-track": {
            position: "absolute",
            top: "0px",
        },
        "&::before": {
            boxShadow: "0 13px 13px rgba(0,0,0,0.4)",
        },
    };
    const SxStyle = styleObj ? Object.assign(Sxbase, styleObj) : Sxbase;
    return (
        <Slider
            aria-label="time-indicator"
            value={currentTime}
            min={0}
            step={1}
            max={duration}
            // @ts-ignore
            onChange={ChanageDuration}
            sx={SxStyle}
        />
    );
};
export default memo(SongSlider);
