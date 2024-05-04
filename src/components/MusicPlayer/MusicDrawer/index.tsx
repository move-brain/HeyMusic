import { memo } from "react";
import style from "./index.module.scss";
import SquareImg from "@/components/SquareImg";
import Drawer from "@mui/material/Drawer";
import { convertTime } from "@/utils";
import SongSlider from "@/components/SongSlider";
import ControlButton from "../ControlButton";
import DrawerButton from "@/components/DrawerButton";
import LinearProgress from "@mui/material/LinearProgress";

import type { State } from "@/store/songSlice/types";
import classNames from "classnames";

interface Props {
    IsShow: boolean;
    playingItem: State["playingItem"];
    currentTime: number;
    ChanageDuration: (event: Event, value: number) => void;
    ShowMusic: (bool: boolean) => void;
    handlePlayOrPause: () => void;
    isLoading: boolean;
}

const MusicBac = ({
    IsShow,
    playingItem,
    currentTime,
    ChanageDuration,
    ShowMusic,
    handlePlayOrPause,
    isLoading,
}: Props) => {
    const { lyric, cover, name, singers, duration } = playingItem;

    const singerName = singers.map((_) => _.name);
    const sliderObj = {
        height: 4,
        "& .MuiSlider-thumb": {
            width: 4,
            height: 4,
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
    };

    return (
        <Drawer
            hideBackdrop
            anchor="bottom"
            sx={{
                ".MuiPaper-root": {
                    width: "100%",
                    height: "100%",
                },
            }}
            open={IsShow}
        >
            <div className={style.MusicBac}>
                <div className="left">
                    <SquareImg highDefinition cover={cover} isKeep />
                    <div className="Name">{name}</div>
                    <div className="singer">{singerName.join("-")}</div>
                    <div className="slider">
                        {isLoading ? (
                            <LinearProgress
                                sx={{
                                    height: "2.5px",
                                    color: "#335eea",
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
                    <div className="Time">
                        <span>{convertTime(currentTime)}</span>
                        <span>{convertTime(duration)}</span>
                    </div>
                    <div className="control">
                        <ControlButton handlePlayOrPause={handlePlayOrPause} />
                    </div>
                </div>
                <div className="right">
                    {lyric?.map(
                        (item) =>
                            item && (
                                <div
                                    className={classNames("lyricItem", {
                                        activeLyric: true,
                                    })}
                                >
                                    <span>{item[0]}</span>
                                </div>
                            )
                    )}
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    right: "20px",
                    top: "20px",
                }}
            >
                <DrawerButton ClickIcon={ShowMusic} />
            </div>
        </Drawer>
    );
};

export default memo(MusicBac);
