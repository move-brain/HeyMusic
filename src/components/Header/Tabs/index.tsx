import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import style from "./index.module.scss";
import { memo } from "react";
interface Props {
    currRoute: string;
}

function Tabs({ currRoute }: Props) {
    const tabs = [
        {
            id: 1,
            title: "首页",
            route: "/Discovery",
        },
        {
            id: 2,
            title: "发现",
            route: "/Explore",
        },
        {
            id: 3,
            title: "音乐库",
            route: "/User",
        },
    ];

    return (
        <div className={style.tabs}>
            {tabs.map((item) => (
                <Link className={style.Link} key={item.id} to={item.route}>
                    <IconButton
                        sx={{
                            borderRadius: "8px",
                            padding: "5px 10px",
                        }}
                    >
                        <span
                            style={
                                currRoute == item.route
                                    ? { color: "#335eea" }
                                    : {}
                            }
                            className={style.title}
                        >
                            {item.title}
                        </span>
                    </IconButton>
                </Link>
            ))}
        </div>
    );
}
export default memo(Tabs);
