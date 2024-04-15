import style from "./index.module.scss";
import type { PageState } from "../../index";
import { replaceHttpToHttps as rp } from "@/utils";
import { Link } from "react-router-dom";
import RoundImage from "@/components/RoundImage";
interface Props {
    data: PageState["hotSinger"];
}
export default function RecommentSinger({ data }: Props) {
    const renderList = (list: Props["data"]) => (
        <div className={style.playlist}>
            {list.map(({ id, name, picUrl }) => (
            <div className={style.listitem} key={id}>
                <RoundImage cover={picUrl} />
                <Link className={style.name} to={`/Singer?id=${id}`} >
              {name}
            </Link>
            </div>
            ))}
        </div>
    );
    return (
        <div className={style["hot-singer"]}>
            {renderList(data.slice(0, 6))}
        </div>
    );
}

