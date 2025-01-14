import { useEffect, memo } from "react";
import style from "./index.module.scss";
import { getCookie } from "@/utils";
import { logout } from "@/apis/login";
import Search from "./Search";
import Navigation from "./Navigation";
import Tabs from "./Tabs";
import Avatar from "./Avatar";
import { selectUserIfo, changeInfo } from "@/store/userInfo";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useNavigate, useLocation } from "react-router-dom";
//@ts-ignore
import nologin from "../../assets/favicon.png";
function Header() {
    const { pathname } = useLocation();
    const userInfo = useAppSelector(selectUserIfo);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (getCookie()) {
            const name = window.localStorage.getItem("username");
            const avatar = window.localStorage.getItem("avatar");
            if (name && avatar) {
                dispatch(changeInfo({ name, avatar }));
            }
        }
    }, []);

    const toggleVisible = () => {
        // 已登录
        if (userInfo.name !== "") {
            return;
        }
        navigate("/Login");
    };

    // 退出登录
    const handleLogout = async () => {
        const result = await logout();
        if (result.code === 200) {
            window.localStorage.clear();
            dispatch(changeInfo({ name: null, avatar: null }));
        }
    };

    return (
        <div className={style.header}>
            <Navigation />
            <Tabs currRoute={pathname} />
            <div className="serAndavatar">
                <Search />
                <Avatar
                    onclick={toggleVisible}
                    avatar={userInfo.avatar ? userInfo.avatar : nologin}
                />
            </div>
        </div>
    );
}

export default memo(Header);
