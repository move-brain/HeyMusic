import style from "./index.module.scss";
import PlaylistItem from '@/components/PlaylistItem'
import type { PageState } from "../../index";
interface Props {
    data: PageState["rankingList"];
    onPlayAll: (id: number) => Promise<void>;
}

function RankingList({ data, onPlayAll }: Props) {
    const renderList = (list: Props["data"]) => (
        <div className="playlist">
            {list.map(({ id, name, coverImgUrl,updateFrequency }) => (
                <div className="listitem" key={id}>
                    <PlaylistItem name={name} id={id} url={coverImgUrl} onPlayAll={onPlayAll} />
                    <div className="updateFrequency" >{updateFrequency}</div>
                </div>
            ))}
        </div>
    );
    return (
        <div className={style["ranking-list"]}>
            {renderList(data)}
        </div>
    );
}
export default RankingList;
