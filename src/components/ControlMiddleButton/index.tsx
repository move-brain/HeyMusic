import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

interface Props {
    playState: boolean;
    ClickButton: () => void;
}

export default function ControlMiddleButton({ playState, ClickButton }: Props) {
    return (
        <IconButton
            aria-label={playState ? "play" : "pause"}
            onClick={ClickButton}
            sx={{ margin: "0 10px" }}
        >
            {!playState ? (
                <PlayArrowRounded sx={{ fontSize: "3rem", color: "#000" }} />
            ) : (
                <PauseRounded sx={{ fontSize: "3rem", color: "#000" }} />
            )}
        </IconButton>
    );
}
