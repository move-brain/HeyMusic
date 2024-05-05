import { useEffect, useState, memo } from "react";
import { getLoginQR, checkLoginQR, loginStatus } from "@/apis/login";
import { replaceHttpToHttps as rp } from "@/utils";
import { useInterval } from "@/utils/hooks";
interface UserInfo {
    name: string | null;
    avatar: string | null;
}
interface Props {
    setUserInfo: ({ name, avatar }: UserInfo) => void;
}
const ScanQR = ({ setUserInfo }: Props) => {
    const [src, setSrc] = useState("");
    const [delay, setDelay] = useState<number | null>(1500);

    const generateQR = async () => {
        const res = await getLoginQR();
        setSrc(res.data.qrimg);
    };

    useEffect(() => {
        generateQR();
    }, []);

    useInterval(async () => {
        if (src === "") {
            return;
        }

        // 800 为二维码过期
        // 801 为等待扫码
        // 802 为待确认
        // 803 为授权登录成功
        const res = await checkLoginQR();
        if (res.code === 800) {
            setDelay(null);
            await generateQR();
            setDelay(1500);
        } else if (res.code === 803) {
            setDelay(null);
            let cookie = "";
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
                Object.keys(cookieObj).forEach((key) => {
                    cookie += `${key}=${cookieObj[key]}; `;
                });
            }
            const sRes = await loginStatus(cookie);

            // 昵称
            window.localStorage.setItem("username", sRes.data.profile.nickname);
            // 头像
            window.localStorage.setItem("avatar", sRes.data.profile.avatarUrl);
            // 用户 id
            window.localStorage.setItem("userid", sRes.data.profile.userId);
            // token
            window.localStorage.setItem("cookie", cookie);
            setUserInfo({
                name: sRes.data.profile.nickname,
                avatar: sRes.data.profile.avatarUrl,
            });
        }
    }, delay);
    return (
        <div>
            <img src={src} alt="" />
        </div>
    );
};
export default memo(ScanQR);
