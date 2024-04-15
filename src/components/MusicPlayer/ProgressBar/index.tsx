import { memo } from "react";
import style from "./index.module.scss";
import SongSlider from "@/components/SongSlider";
import type { State } from "@/store/songSlice/types";
interface Props {
    playingItem: State["playingItem"];
    currentTime: number;
    ChanageDuration:(event:Event,value?:number)=>void,
}

function ProgressBar({ playingItem, currentTime , ChanageDuration }: Props) {
    const { duration } = playingItem;
    return (
        <div className={style.progressbar} >
        <SongSlider duration={duration} ChanageDuration={ChanageDuration} currentTime={currentTime} />
        </div>
    )
}


export default memo(ProgressBar);
