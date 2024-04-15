import { memo } from "react";
import style from "./index.module.scss";
import { Icon } from "@/components";
import IconButton from '@mui/material/IconButton';
import {setPlayMode} from '@/store/songSlice/index'
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import ShuffleTwoToneIcon from '@mui/icons-material/ShuffleTwoTone';

import type { State } from "@/store/songSlice/types";
import { useAppDispatch } from "@/store/hook";

interface Props {
    playMode: State["playMode"];
}


function PlayMode({ playMode }: Props) {
    const dispatch=useAppDispatch()
    // 设置播放模式
    const handleSetPlayMode = () => {
        let nextPlayMode: State["playMode"];
        if (playMode === "list-loop") {
            nextPlayMode = "random";
        } else if (playMode === "random") {
            nextPlayMode = "single-cycle";
        } else {
            nextPlayMode = "list-loop";
        }
        dispatch(setPlayMode(nextPlayMode))
    };

    const iconProperty={
        fontSize: "24px",
        color:"#000"
    }
    
    return (
        <div className={style["play-mode"]}>
            <div title={playMode === "list-loop" ? "循环播放":playMode === "random" ? "随机播放":"单曲循环"} className={style.icon}>
                <IconButton  onClick={handleSetPlayMode} >
                {playMode === "list-loop" && <LoopRoundedIcon sx={iconProperty} />}
                {playMode === "random" && <ShuffleTwoToneIcon  sx={iconProperty} />}
                {playMode === "single-cycle" && <RepeatOneRoundedIcon  sx={iconProperty} />}
                </IconButton>
            </div>
        </div>
    );
}

export default memo(PlayMode);
