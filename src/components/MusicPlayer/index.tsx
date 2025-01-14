import { memo, useEffect, useState } from "react";
import style from "./index.module.scss";
import { useInterval } from "@/utils/hooks";
import music from "@/utils/music";
import { debounce } from "@/utils";
import SongInformation from "./SongInformation";
import ControlButton from "./ControlButton";
import OtherButton from "./OtherButton";
import ProgressBar from "./ProgressBar";
import { useAppSelector, useAppDispatch } from "@/store/hook";
import { selectSong, pauseSong, playSong } from "@/store/songSlice";
import MusicDrawer from "./MusicDrawer";

function MusicPlayer() {
    const song = useAppSelector(selectSong);
    const dispatch = useAppDispatch();
    const [currentTime, setCurrentTime] = useState(0);
    const [Isclick, setIsclick] = useState<boolean>(false);
    const { isPlaying, playMode, playlist, playingItem, isLoading } = song;
    const [IsShow, setShow] = useState(false);
    // 每 300 ms 更新一次当前播放时间

    useInterval(() => {
        const time = music().getCurrentTime();
        !Isclick && setCurrentTime(time);
    }, 100);

    useEffect(() => {
        if (!isLoading) {
            setIsclick(false);
        }
    }, [isLoading]);

    const ChanageDuration = debounce((event: Event, value?: number) => {
        // @ts-ignore
        setCurrentTime(event.target.value);
        setIsclick(true);
        // @ts-ignore
        dispatch(playSong({ item: playingItem, offset: event.target.value }));
    }, 200);

    const handlePlayOrPause = debounce(() => {
        if (isPlaying) {
            dispatch(pauseSong());
        } else {
            dispatch(playSong({ item: playingItem, offset: currentTime }));
        }
    }, 300);

    const ShowMusic = (bool: boolean) => {
        setShow(bool);
    };
    return (
        <div className={style["music-player"]}>
            <ProgressBar
                playingItem={playingItem}
                currentTime={currentTime}
                isLoading={isLoading}
                ChanageDuration={ChanageDuration}
            />
            <div className={style.MusicPlayerBottom}>
                <div className={style.info_button}>
                    <SongInformation playingItem={playingItem} />
                    <ControlButton handlePlayOrPause={handlePlayOrPause} />
                    <OtherButton
                        isPlaying={isPlaying}
                        playingItem={playingItem}
                        playlist={playlist}
                        //@ts-ignore
                        playMode={playMode}
                        currentTime={currentTime}
                        ShowMusic={ShowMusic}
                    />
                </div>
                <MusicDrawer
                    isLoading={isLoading}
                    handlePlayOrPause={handlePlayOrPause}
                    ShowMusic={ShowMusic}
                    IsShow={IsShow}
                    playingItem={playingItem}
                    currentTime={currentTime}
                    ChanageDuration={ChanageDuration}
                />
            </div>
        </div>
    );
}

export default memo(MusicPlayer);
