import { memo } from "react";
import style from "./View.module.scss";
import { Loading } from "@/components";
import RecommentPlaylist from "./RecommentPlaylist";
import RankingList from "./RankingList";
import RecentSonglist from "./RecentSonglist";
import type { PageState } from "../index";
import NewalbumList from "./newAlbum";
import RecommentSinger from "./RecommentSinger";
import HuaLiu from "./HuaLiu";
interface Props {
    pageState: PageState | null;
}

function View({ pageState }: Props) {
    if (!pageState) {
        return <Loading />;
    }

    const {
        recommendPlaylist,
        rankingList,
        recentSong,
        albumList,
        hotSinger,
        fristPlayList,
    } = pageState;

    return (
        <div className={style.discovery}>
            <div>
                <div className="title">云音乐</div>
                <HuaLiu data={fristPlayList} />
            </div>
            <div>
                <div className="title">推荐歌单</div>
                <RecommentPlaylist data={recommendPlaylist} />
            </div>
            <div>
                <div className="title">热门歌手</div>
                <RecommentSinger data={hotSinger} />
            </div>
            <div>
                <div className="title">新专速递</div>
                <NewalbumList data={albumList} />
            </div>
            <div>
                <div className="title">最新音乐</div>
                <RecentSonglist data={recentSong} />
            </div>
            <div>
                <div className="title">排行榜</div>
                <RankingList data={rankingList} />
            </div>
        </div>
    );
}

export default memo(View);
