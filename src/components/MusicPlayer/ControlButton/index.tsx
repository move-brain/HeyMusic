import { memo } from "react";
import style from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectSong, palynextSong } from "@/store/songSlice";
import ControlMiddleButton from "@/components/ControlMiddleButton";
import ControlRorLButton from "@/components/ControlRorLButton";
interface Props {
    handlePlayOrPause: () => void;
}
function ControlButton({ handlePlayOrPause }: Props) {
    const song = useAppSelector(selectSong);
    const { isPlaying, playingItem } = song;
    const dispatch = useAppDispatch();
    // 切换歌曲
    const handleChangeMusic = (type: "next" | "prev") => {
        dispatch(palynextSong(type));
    };

    // 暂停或恢复播放

    return (
        <div className={style.container}>
            <ControlRorLButton
                type="left"
                handleChangeMusic={handleChangeMusic}
            />
            <ControlMiddleButton
                ClickButton={handlePlayOrPause}
                playState={isPlaying}
            />
            <ControlRorLButton
                type="right"
                handleChangeMusic={handleChangeMusic}
            />
        </div>
    );
}

export default memo(ControlButton);
