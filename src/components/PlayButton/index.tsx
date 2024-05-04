import { ReactElement, memo } from "react";
import Button from "@mui/material/Button";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

interface Props {
    ClickButton: () => Promise<void>;
    text?: string;
    children?: ReactElement;
    IsDisabled?: boolean;
    width?: string;
}

const PlayButton = ({
    ClickButton,
    text,
    children,
    IsDisabled,
    width,
}: Props) => {
    return (
        <Button
            disabled={IsDisabled ? true : false}
            onClick={ClickButton}
            sx={{
                width: width ? width : "100px",
                backgroundColor: "#eaeffd",
                color: "#335eea",
                transition: "transform 0.3s ease",
                fontWeight: "700",
                fontSize: "16px",
                boxShadow: "none",
                borderRadius: "8px",
                "&:hover": {
                    backgroundColor: "#eaeffd",
                    color: "#335eea",
                    transform: "scale(1.1)",
                    boxShadow: "none",
                },
            }}
            variant="contained"
            startIcon={children ? children : <PlayArrowRounded />}
        >
            {text ? text : "按钮"}
        </Button>
    );
};

export default memo(PlayButton);
