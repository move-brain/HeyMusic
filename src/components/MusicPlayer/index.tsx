import { memo, useEffect, useState, useCallback, useMemo } from "react";
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

    // Memoized values
    const memoizedPlayingItem = useMemo(() => playingItem, [playingItem]);
    const memoizedIsLoading = useMemo(() => isLoading, [isLoading]);

    // Callbacks
    const handlePlayOrPause = useCallback(
        debounce(() => {
            if (isPlaying) {
                dispatch(pauseSong());
            } else {
                dispatch(
                    playSong({ item: memoizedPlayingItem, offset: currentTime })
                );
            }
        }, 300),
        [isPlaying, memoizedPlayingItem, currentTime, dispatch]
    );

    const ChanageDuration = useCallback(
        debounce((event: Event, value?: number) => {
            const target = event.target as HTMLInputElement;
            setCurrentTime(Number(target.value));
            setIsclick(true);
            dispatch(
                playSong({
                    item: memoizedPlayingItem,
                    offset: Number(target.value),
                })
            );
        }, 200),
        [memoizedPlayingItem, dispatch]
    );

    const ShowMusic = useCallback((bool: boolean) => {
        setShow(bool);
    }, []);

    // Effects
    useInterval(() => {
        const time = music().getCurrentTime();
        !Isclick && setCurrentTime(time);
    }, 100);

    useEffect(() => {
        if (!memoizedIsLoading) {
            setIsclick(false);
        }
    }, [memoizedIsLoading]);

    return (
        <div className={style["music-player"]}>
            <ProgressBar
                playingItem={memoizedPlayingItem}
                currentTime={currentTime}
                isLoading={memoizedIsLoading}
                ChanageDuration={ChanageDuration}
            />
            <div className={style.MusicPlayerBottom}>
                <div className={style.info_button}>
                    <SongInformation playingItem={memoizedPlayingItem} />
                    <ControlButton handlePlayOrPause={handlePlayOrPause} />
                    <OtherButton
                        isPlaying={isPlaying}
                        playingItem={memoizedPlayingItem}
                        playlist={playlist}
                        playMode={
                            playMode as "list-loop" | "random" | "single-cycle"
                        }
                        currentTime={currentTime}
                        ShowMusic={ShowMusic}
                    />
                </div>
                <MusicDrawer
                    isLoading={memoizedIsLoading}
                    handlePlayOrPause={handlePlayOrPause}
                    ShowMusic={ShowMusic}
                    IsShow={IsShow}
                    playingItem={memoizedPlayingItem}
                    currentTime={currentTime}
                    ChanageDuration={ChanageDuration}
                />
            </div>
        </div>
    );
}

export default memo(MusicPlayer);
