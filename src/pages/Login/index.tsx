import { memo, useEffect, useState } from "react";
import View from "./View";
import { emailLogin, phoneLogin } from "@/apis/login";
import { replaceHttpToHttps as rp } from "@/utils";

const Login = () => {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [loginType, setLoginType] = useState<number>(2);

    const handLogin = async () => {
        return;
        // 无效输入
        if (!account || !password) {
            return;
        }
        // 登录类型
        let res;
        console.log(/^1[3-9]\d{9}$/.test(account), password);

        if (loginType == 1 && /^[\w-.]+@[\w-.]+\.\w+$/.test(account)) {
            res = await emailLogin(account, password);
        } else if (loginType == 2 && /^1[3-9]\d{9}$/.test(account)) {
            res = await phoneLogin(account, password);
        } else {
            // Toast.show("账号类型有误");
            return;
        }
        console.log(res);

        // 昵称
        window.localStorage.setItem("username", res.profile.nickname);
        // 头像
        window.localStorage.setItem("avatar", rp(res.profile.avatarUrl));
        // 用户 id
        window.localStorage.setItem("userid", res.account.id);

        const matchRes: string[] | null = res.cookie.match(/[\w-]+=\w+/g);
        if (matchRes) {
            const cookieObj: Record<string, string> = {};
            matchRes.forEach((item) => {
                const [key, value] = item.split("=");
                const lowerKey = key.toLowerCase();
                if (["max-age", "expires"].indexOf(lowerKey) >= 0) {
                    return;
                }
                cookieObj[key] = value;
            });
            let cookie = "";
            Object.keys(cookieObj).forEach((key) => {
                cookie += `${key}=${cookieObj[key]}; `;
            });
            window.localStorage.setItem("cookie", cookie);
        }

        // setUserInfo({
        //     name: res.profile.nickname,
        //     avatar: rp(res.profile.avatarUrl),
        // });

        // onCancel();
    };
    return (
        <View
            handLogin={handLogin}
            setAccount={(value: string) => setAccount(value)}
            setPassword={(value: string) => setPassword(value)}
            setLoginType={(value: number) => setLoginType(value)}
            loginType={loginType}
        ></View>
    );
};
export default memo(Login);
