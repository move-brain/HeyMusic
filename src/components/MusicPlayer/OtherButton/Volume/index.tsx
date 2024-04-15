import { memo, useState } from "react";
import style from "./index.module.scss";
import {ProgressBar } from "@/components";
import music from "@/utils/music";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import { debounce } from "@/utils";
function Volume() {
    const [volumeValue,setvolumeValue]=useState(100)
    const iconProperty={
        color:! volumeValue? "#999999" :"rgba(0,0,0,0.87)" ,
        fontSize: "24px"
    }
    const iconPropertyAction={
        color:
        "rgba(0,0,0,0.87)",
        fontSize: "24px"

    }
    const iconPropertyBase={
        fontSize: "24px"
        
    }
    // 设置音量
    const handleChangeVolume = debounce((value: number) => {
        music().setVolume(value * 0.01);
        setvolumeValue(value)
    },500)

    return (
        <div className={style.volume}>
            {
                !volumeValue ? (<VolumeMuteIcon sx={iconPropertyAction} />):volumeValue<=70 ?(<VolumeDownRounded sx={iconPropertyBase} />):(<VolumeUpRounded sx={ volumeValue==100 ? iconPropertyAction:iconProperty} />)
            }
            <div className="slider">
                <ProgressBar
                    onChange={handleChangeVolume}
                    defaultValue={100}
                    tipFormatter={(value) => `${value >> 0}%`}
                />
            </div>
        </div>
    );
}

export default memo(Volume);
