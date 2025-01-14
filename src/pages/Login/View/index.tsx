import { memo } from "react";
import styles from "./index.module.scss";
import Form from "../Form";
import ScanQR from "../ScanQR";
//@ts-ignore
import musicSvg from "../../../assets/musicSvg.png";
interface UserInfo {
    name: string | null;
    avatar: string | null;
}
interface Props {
    setPassword: (value: string) => void;
    setAccount: (value: string) => void;
    setLoginType: (value: number) => void;
    loginType: number;
    handLogin: () => Promise<void>;
    setUserInfo: ({ name, avatar }: UserInfo) => void;
}

const View = ({
    setAccount,
    setPassword,
    setLoginType,
    loginType,
    handLogin,
    setUserInfo,
}: Props) => {
    return (
        <div className={styles.View}>
            <img className="image" src={musicSvg} alt="" />
            <span className="title">登录网易云账号</span>
            {!loginType ? (
                <ScanQR setUserInfo={setUserInfo} />
            ) : (
                <Form
                    handLogin={handLogin}
                    loginType={loginType}
                    setAccount={setAccount}
                    setPassword={setPassword}
                />
            )}
            <div
                style={{ color: loginType == 0 ? "#335eea" : "" }}
                onClick={() => setLoginType(0)}
                className="mode"
            >
                网易云扫描登录
            </div>
            <div
                style={{ color: loginType == 2 ? "#335eea" : "" }}
                onClick={() => setLoginType(2)}
                className="mode"
            >
                手机号登录
            </div>
            <div
                style={{ color: loginType == 1 ? "#335eea" : "" }}
                onClick={() => setLoginType(1)}
                className="mode"
            >
                邮箱登录
            </div>
        </div>
    );
};
export default memo(View);
