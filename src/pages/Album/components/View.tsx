import style from "./View.module.scss";
import { Detail, CommentList, Loading } from "@/components";
import SongList from "@/components/SongList";
import type { PageState } from "../index";

interface Props {
    pageState: PageState | null;
}

function View({ pageState }: Props) {
    if (!pageState) {
        return <Loading />;
    }

    const { detail, songList, comment } = pageState;

    return (
        <div className={style.album}>
            <Detail data={{ detail, songList }} />
            <SongList album songList={songList} />
            {/* <CommentList data={comment} /> */}
        </div>
    );
}

export default View;
