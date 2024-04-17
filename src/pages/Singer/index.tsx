import { useState, useEffect } from "react";
import { useQuery } from "@/utils/hooks";
import { resolveSongs } from "@/utils/resolve";
import { singerInfo, singerDesc, singerAlbum, singerMvs } from "@/apis/singer";
import View from "./components/View";

import type { SongItem } from "@/store/songSlice/types";

export interface PageState {
    header: any;
    songList: SongItem[];
    albumList: any[];
    intro: any;
    MVList: {
        id: number;
        imgurl: string;
        name: string;
        publishTime: string;
    }[];
}

function Singer() {
    const id = useQuery("id");

    const [pageState, setPageState] = useState<PageState | null>(null);
    const onPlayAll = async (id: number) => {
        console.log(id);
    };
    useEffect(() => {
        if (!id) {
            return;
        }

        const getData = async () => {
            const singerRes = await singerInfo(id as string);
            console.log(singerRes);

            const descRes = await singerDesc(id as string);
            const albumRes = await singerAlbum(id as string);
            const Mvs = await singerMvs(id);
            console.log(Mvs);

            const header = {
                name: singerRes.artist.name,
                alias: singerRes.artist.alias,
                cover: singerRes.artist.picUrl,
                albumSize: singerRes.artist.albumSize,
                musicSize: singerRes.artist.musicSize,
                mvSize: singerRes.artist.mvSize,
                transNames: singerRes.artist.transNames,
            };
            const songList = resolveSongs(singerRes.hotSongs, "detail");
            const intro = {
                intro: descRes.introduction,
                briefDesc: descRes.briefDesc,
            };
            console.log(albumRes);

            const albumList = albumRes.hotAlbums.map((item: any) => ({
                id: item.id,
                name: item.name,
                artists: item.artists,
                picUrl: item.picUrl,
                date: new Date(item.publishTime).getFullYear(),
            }));

            const MVList = Mvs.mvs.map((item: any) => ({
                id: item.id,
                imgurl: item.imgurl,
                name: item.name,
                publishTime: item.publishTime,
            }));

            setPageState({ header, songList, intro, albumList, MVList });
        };
        setPageState(null);
        getData();
    }, []);

    // 改变标题
    useEffect(() => {
        const name = pageState?.header?.name;
        if (name) {
            document.title = `${name}的音乐`;
        }
    }, [pageState]);

    if (!id) {
        return <div>id 错误</div>;
    }

    return <View onPlayAll={onPlayAll} pageState={pageState} />;
}

export default Singer;
