import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import IconButton from "@mui/material/IconButton";
import style from "./index.module.scss";
export default () => {
    const iconProperty = {
        fontSize: "32px",
        color: "#000",
    };
    const goBack = (type: "back" | "next") => {
        if (type == "next") {
            window.history.forward();
        } else {
            window.history.back();
        }
    };
    const Fullscreen = (e: HTMLElement | null) => {
        if (e == null) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            e.requestFullscreen();
        }
    };

    return (
        <div className={style.navigation}>
            <IconButton
                onClick={() => goBack("back")}
                sx={{
                    height: "32px",
                    width: "32px",
                    marginRight: "8px",
                }}
                size="small"
            >
                <NavigateBeforeRoundedIcon sx={iconProperty} />
            </IconButton>
            <IconButton
                onClick={() => goBack("next")}
                sx={{
                    height: "32px",
                    width: "32px",
                }}
            >
                <NavigateNextRoundedIcon sx={iconProperty} />
            </IconButton>
            <IconButton
                onClick={() => Fullscreen(document.getElementById("root"))}
                sx={{
                    height: "32px",
                    width: "32px",
                    marginLeft: "12px",
                }}
            >
                <FullscreenRoundedIcon sx={iconProperty} />
            </IconButton>
        </div>
    );
};
