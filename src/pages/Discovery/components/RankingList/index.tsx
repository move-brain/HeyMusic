import style from "./index.module.scss";
import PlaylistItem from "@/components/PlaylistItem";
import { PlayAllContext, type PageState } from "../../index";
import { useContext } from "react";
interface Props {
    data: PageState["rankingList"];
}

function RankingList({ data }: Props) {
    const onPlayAll = useContext(PlayAllContext);
    const renderList = (list: Props["data"]) => (
        <div className="playlist">
            {list.map(({ id, name, coverImgUrl, updateFrequency }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem
                        name={name}
                        id={id}
                        url={coverImgUrl}
                        onPlayAll={onPlayAll}
                    />
                    <div className="updateFrequency">{updateFrequency}</div>
                </div>
            ))}
        </div>
    );
    return <div className={style["ranking-list"]}>{renderList(data)}</div>;
}
export default RankingList;
