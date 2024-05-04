import { ReactElement, memo } from "react";
import Button from "@mui/material/Button";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

interface Props {
    ClickButton: () => Promise<void>;
    text?: string;
    children?: ReactElement;
    IsDisabled?: boolean;
}

const LoginButton = ({ ClickButton, text, children, IsDisabled }: Props) => {
    return (
        <Button
            disabled={IsDisabled ? true : false}
            onClick={ClickButton}
            sx={{
                width: "320px",
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
                    transform: "scale(1.05)",
                    boxShadow: "none",
                },
            }}
            variant="contained"
        >
            {text ? text : "按钮"}
        </Button>
    );
};

export default memo(LoginButton);
