import { memo} from "react";
import Slider from '@mui/material/Slider';
import style from './index.module.scss'

interface Props {
    value?: number;
    defaultValue?: number;
    tipFormatter?: (value: number) => string;
    onChange?: (value: number) => void;
}

function ProgressBar({
    tipFormatter,
    onChange,
    defaultValue
}: Props) {

    // 鼠标移动
    const ChangeVolume = (event:Event) => {
        //@ts-ignore
        onChange && onChange(event.target.value);
    };

    return (
        <Slider
            aria-label="Volume"
            defaultValue={defaultValue&&100}
            onChange={ChangeVolume}
            sx={{
              color:
              "rgba(0,0,0,0.87)",
              height:"3px",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 6,
                height: 6,
                backgroundColor: "#fff",
                "&::before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
    );
}

export default memo(ProgressBar);
