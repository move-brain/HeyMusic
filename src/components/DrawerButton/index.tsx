import { memo } from "react";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import style from "./index.module.scss";
import { IconButton } from "@mui/material";
interface Props {
    type?: "B" | "T";
    ClickIcon: (bool: boolean) => void;
}

const DrawerButton = ({ type, ClickIcon }: Props) => {
    const Iconproperty = {
        color: "#000",
    };

    return (
        <>
            <IconButton onClick={() => ClickIcon(type == "B")}>
                {type == "B" ? (
                    <KeyboardDoubleArrowUpRoundedIcon sx={Iconproperty} />
                ) : (
                    <KeyboardDoubleArrowDownRoundedIcon sx={Iconproperty} />
                )}
            </IconButton>
        </>
    );
};
export default memo(DrawerButton);
