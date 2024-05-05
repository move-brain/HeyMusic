import { memo } from "react";
import Input from "../Input";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Button from "../Button";
import LockIcon from "@mui/icons-material/Lock";

interface Props {
    setPassword: (value: string) => void;
    setAccount: (value: string) => void;
    loginType: number;
    handLogin: () => Promise<void>;
}
const Form = ({ setAccount, setPassword, loginType, handLogin }: Props) => {
    return (
        <>
            <Input
                onChange={setAccount}
                Icon={loginType == 1 ? <EmailIcon /> : <PhoneAndroidIcon />}
                // placeholder={loginType == 1 ? "邮箱" : "网易云后台出了问题无法实现登录"}
                placeholder="网易云后台出了问题无法实现账密登录"
            />
            <div style={{ height: "20px" }}></div>

            <Input
                placeholder="无法实现账密登录"
                onChange={setPassword}
                Icon={<LockIcon />}
                type="password"
            />
            <div style={{ height: "40px" }}></div>
            <Button ClickButton={handLogin} text="登录" />
        </>
    );
};
export default memo(Form);
