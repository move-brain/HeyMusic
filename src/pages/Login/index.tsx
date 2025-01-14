import { memo, useEffect, useState } from "react";
import View from "./View";
import { emailLogin, phoneLogin } from "@/apis/login";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { changeInfo, selectUserIfo } from "@/store/userInfo";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { UserInfo } from "@/types/global";
const Login = () => {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState<number>(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userInfo = useAppSelector(selectUserIfo);
    const [IsLogin, setIsLogin] = useState(false);
    const handLogin = async () => {
        return;
        // // 无效输入
        // if (!account || !password) {
        //     return;
        // }
        // // 登录类型
        // let res;
        // if (loginType == 1 && /^[\w-.]+@[\w-.]+\.\w+$/.test(account)) {
        //     res = await emailLogin(account, password);
        // } else if (loginType == 2 && /^1[3-9]\d{9}$/.test(account)) {
        //     res = await phoneLogin(account, password);
        // } else {
        //     // Toast.show("账号类型有误");
        //     return;
        // }

        // // 昵称
        // window.localStorage.setItem("username", res.profile.nickname);
        // // 头像
        // window.localStorage.setItem("avatar", rp(res.profile.avatarUrl));
        // // 用户 id
        // window.localStorage.setItem("userid", res.account.id);

        // const matchRes: string[] | null = res.cookie.match(/[\w-]+=\w+/g);
        // if (matchRes) {
        //     const cookieObj: Record<string, string> = {};
        //     matchRes.forEach((item) => {
        //         const [key, value] = item.split("=");
        //         const lowerKey = key.toLowerCase();
        //         if (["max-age", "expires"].indexOf(lowerKey) >= 0) {
        //             return;
        //         }
        //         cookieObj[key] = value;
        //     });
        //     let cookie = "";
        //     Object.keys(cookieObj).forEach((key) => {
        //         cookie += `${key}=${cookieObj[key]}; `;
        //     });
        //     window.localStorage.setItem("cookie", cookie);
        // }

        // setUserInfo({
        //     name: res.profile.nickname,
        //     avatar: rp(res.profile.avatarUrl),
        // });

        // onCancel();
    };
    useEffect(() => {
        if (userInfo.avatar && userInfo.name) {
            setIsLogin(true);
            navigate("/Discovery");
        }
    }, []);

    return (
        <>
            <View
                handLogin={handLogin}
                setAccount={(value: string) => setAccount(value)}
                setPassword={(value: string) => setPassword(value)}
                setLoginType={(value: number) => setLoginType(value)}
                setUserInfo={({ name, avatar }: UserInfo) => {
                    dispatch(changeInfo({ name, avatar }));
                    setIsLogin(true);
                    navigate("/Discovery");
                }}
                loginType={loginType}
            ></View>
            {IsLogin && (
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Alert
                        sx={{
                            position: "absolute",
                            top: "70px",
                            margin: "auto",
                        }}
                        variant="filled"
                        severity="success"
                    >
                        您已登录成功
                    </Alert>
                </div>
            )}
        </>
    );
};
export default memo(Login);
