import style from "./index.module.scss";
import PlaylistItem from "@/components/PlaylistItem";
import type { PageState } from "../../index";

interface Props {
    data: PageState["fristPlayList"];
    onPlayAll: (id: number) => Promise<void>;
}

function HuaLiu({ data, onPlayAll }: Props) {
    const renderList = (list: Props["data"]) => (
        <div className="playlist">
            {list.map(({ id, name, coverImgUrl }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem
                        name={name}
                        id={id}
                        url={coverImgUrl}
                        onPlayAll={onPlayAll}
                    />
                </div>
            ))}
        </div>
    );
    return (
        <div className={style["recommend-playlist"]}>
            {renderList(data.slice(0, 10))}
        </div>
    );
}

export default HuaLiu;
