import { useEffect, Suspense, useCallback, useMemo, memo } from "react";
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
    const handleEnded = useCallback(() => {
        dispacth(palynextSong("next"));
    }, [dispacth]);

    useEffect(() => {
        const player = music();
        player.setOnEnded(handleEnded);
        return () => {
            player.setOnEnded(() => {});
        };
    }, [handleEnded, playingItem]);

    const memoizedElements = useMemo(() => elements, [elements]);

    return (
        <Layout>
            <Suspense fallback={<Loading />}>{memoizedElements}</Suspense>
        </Layout>
    );
}

export default memo(AppContainer);
