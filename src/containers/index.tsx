import { useEffect, Suspense } from "react";
import music from "@/utils/music";
import { Layout } from "@/components";
import { palynextSong, selectSong } from "@/store/songSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Loading } from "@/components";
import { useRoutes } from "react-router-dom";
import routes from "../routes";

function AppContainer() {
    const dispacth = useAppDispatch();
    // // 设置播放结束触发的回调函数
    const song = useAppSelector(selectSong);
    const { playingItem } = song;
    const elements = useRoutes(routes);
    useEffect(() => {
        music().setOnEnded(() => {
            // 播放下一首歌曲
            dispacth(palynextSong("next"));
        });
    }, [playingItem]);

    return (
        <Layout>
            <Suspense fallback={<Loading />}>{elements}</Suspense>
        </Layout>
    );
}

export default AppContainer;
