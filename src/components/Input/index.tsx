import styles from "./index.module.scss";
import classNames from "classnames";
import { Icon } from "@/components";
import { CSSProperties, useRef } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface Props {
    className?: string;
    style?: CSSProperties;
    value?: string;
    type?: "text" | "search" | "password";
    maxLength?: number;
    placeholder?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    onPressEnter?: (value: string) => void;
    onSearch?: (value: string) => void;
    onChange?: (value: string) => void;
    focus?: boolean;
}

function Input({
    className,
    style,
    value,
    type = "text",
    placeholder,
    maxLength,
    onFocus,
    onBlur,
    onChange,
    onSearch,
    onPressEnter,
    focus,
}: Props) {
    const valueRef = useRef("");
    const doSearch = () => {
        if (type === "search") {
            onSearch && onSearch(valueRef.current);
        }
    };
    const handlePressEnter = () => {
        onPressEnter && onPressEnter(valueRef.current);
    };

    return (
        <div
            style={{ backgroundColor: !focus ? "#e8eaed" : "#edf2ff" }}
            className={styles["input-wrapper"]}
        >
            <SearchRoundedIcon
                sx={{
                    fontSize: "20px",
                    width: "32px",
                    color: !focus ? "#afafb0" : "#335eea",
                }}
            />
            <input
                type={type}
                className={classNames(styles.input, className)}
                placeholder={placeholder}
                maxLength={maxLength}
                style={Object.assign({}, style, {
                    backgroundColor: !focus ? "#e8eaed" : "#edf2ff",
                    color: !focus ? "#afafb0" : "#335eea",
                })}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={(evt) => {
                    if (evt.key === "Enter") {
                        handlePressEnter();
                        doSearch();
                    }
                }}
                onChange={(evt) => {
                    valueRef.current = evt.target.value;
                    onChange && onChange(evt.target.value);
                    if (evt.target.value === "") {
                        doSearch();
                    }
                }}
            />
        </div>
    );
}

export default Input;
