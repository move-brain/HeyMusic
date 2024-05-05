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
import { selectUserIfo, changeInfo } from "@/store/userInfo";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useNavigate } from "react-router-dom";
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
                    avatar={
                        userInfo.avatar
                            ? userInfo.avatar
                            : "https://s2.loli.net/2024/05/05/jJignK7eVA1S68T.png"
                    }
                />
            </div>
        </div>
    );
}

export default memo(Header);
