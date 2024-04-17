import { memo } from "react";
import RectangleImage from "@/components/RectangleImage";
import { Link } from "react-router-dom";

interface Props {
    id: number;
    Url: string;
    title: string;
    creater: Array<{ userId: number; userName: string }>;
}

const VideosItem = ({ Url, id, title, creater }: Props) => {
    return (
        <div>
            <Link to={`/Video?id=${id}`}>
                <RectangleImage cover={Url} />
            </Link>
            <div className="title_creater">
                <div className="videoTitle">{title}</div>
                {creater.map((item) => (
                    <Link key={item.userId} to={`/Singer?id=${item.userId}`}>
                        {item.userName}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default memo(VideosItem);
