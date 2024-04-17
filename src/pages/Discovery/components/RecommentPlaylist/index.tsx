import style from "./index.module.scss";
import PlaylistItem from "@/components/PlaylistItem";
import type { PageState } from "../../index";

interface Props {
    data: PageState["recommendPlaylist"];
    onPlayAll: (id: number) => Promise<void>;
}

function RecommentPlaylist({ data, onPlayAll }: Props) {
    const renderList = (list: Props["data"]) => (
        <div className="playlist">
            {list.map(({ id, name, picUrl }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem
                        name={name}
                        id={id}
                        url={picUrl}
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

export default RecommentPlaylist;
