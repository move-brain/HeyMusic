import {
    memo,
    ReactElement,
    useEffect,
    cloneElement,
    useState,
    useCallback,
} from "react";
import styles from "./index.module.scss";
import { useRef } from "react";

interface Props {
    Icon: ReactElement;
    value?: string;
    type?: "text" | "search" | "password";
    maxLength?: number;
    placeholder?: string;
    onChange?: (value: string) => void;
}
const loginInput = ({
    Icon,
    value,
    type = "text",
    placeholder,
    maxLength,
    onChange,
}: Props) => {
    const valueRef = useRef("");
    const [focus, setFocus] = useState(false);
    const IconCss = {
        fontSize: "20px",
        width: "32px",
        color: !focus ? "#afafb0" : "#335eea",
    };

    return (
        <div
            style={{ backgroundColor: !focus ? "#e8eaed" : "#edf2ff" }}
            className={styles["input-wrapper"]}
        >
            {cloneElement(Icon, { sx: IconCss })}
            <input
                type={type}
                className={styles.input}
                placeholder={placeholder}
                maxLength={maxLength}
                style={{
                    backgroundColor: !focus ? "#e8eaed" : "#edf2ff",
                    color: !focus ? "#afafb0" : "#335eea",
                }}
                value={value}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={(evt) => {
                    valueRef.current = evt.target.value;
                    onChange && onChange(evt.target.value);
                }}
            />
        </div>
    );
};
export default memo(loginInput);
