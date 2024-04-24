import { useState, useEffect, memo } from "react";
import style from "./index.module.scss";
import { getCookie } from "@/utils";
import { logout } from "@/apis/login";
import LoginModal from "./LoginModal";
import Search from "./Search";
import Navigation from "./Navigation";
import Tabs from "./Tabs";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";

interface UserInfo {
    name: string | null;
    avatar: string | null;
}

function Header() {
    const { pathname } = useLocation();
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: null,
        avatar: null,
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // token 未过期
        if (getCookie()) {
            const name = window.localStorage.getItem("username");
            const avatar = window.localStorage.getItem("avatar");
            if (name && avatar) {
                setUserInfo({ name, avatar });
            }
        }
    }, []);

    const toggleVisible = () => {
        // 已登录
        if (userInfo.name !== null) {
            return;
        }
        setVisible(!visible);
    };

    // 退出登录
    const handleLogout = async () => {
        const result = await logout();
        if (result.code === 200) {
            window.localStorage.clear();
            setUserInfo({ name: null, avatar: null });
        }
    };

    return (
        <div className={style.header}>
            <Navigation />
            <Tabs currRoute={pathname} />
            <div className="serAndavatar">
                <Search />
                <Avatar
                    avatar={
                        userInfo.avatar
                            ? userInfo.avatar
                            : "src/assets/musician.png"
                    }
                />
            </div>
            {visible && (
                <LoginModal
                    onCancel={toggleVisible}
                    setUserInfo={setUserInfo}
                />
            )}
        </div>
    );
}

export default memo(Header);
