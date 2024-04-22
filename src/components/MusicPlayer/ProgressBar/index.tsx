import { memo } from "react";
import style from "./index.module.scss";
import SongSlider from "@/components/SongSlider";
import type { State } from "@/store/songSlice/types";
import LinearProgress from "@mui/material/LinearProgress";
interface Props {
    playingItem: State["playingItem"];
    currentTime: number;
    isLoading: boolean;
    ChanageDuration: (event: Event, value?: number) => void;
}

function ProgressBar({
    playingItem,
    currentTime,
    ChanageDuration,
    isLoading,
}: Props) {
    const { duration } = playingItem;
    return (
        <div className={style.progressbar}>
            {/* <SongSlider
                duration={duration}
                ChanageDuration={ChanageDuration}
                currentTime={currentTime}
            /> */}
            {isLoading ? (
                <LinearProgress
                    sx={{
                        height: "2.5px",
                    }}
                />
            ) : (
                <SongSlider
                    duration={duration}
                    ChanageDuration={ChanageDuration}
                    currentTime={currentTime}
                />
            )}
        </div>
    );
}

export default memo(ProgressBar);
