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
            await Promise.allSettled([
                singerInfo(id as string, 12),
                singerDesc(id as string),
                singerAlbum(id as string),
                singerMvs(id),
            ]).then((res) => {
                console.log(res[0]);
                setPageState({
                    header:
                        res[0].status == "fulfilled"
                            ? {
                                  name: res[0].value.artist.name,
                                  alias: res[0].value.artist.alias,
                                  cover: res[0].value.artist.picUrl,
                                  albumSize: res[0].value.artist.albumSize,
                                  musicSize: res[0].value.artist.musicSize,
                                  mvSize: res[0].value.artist.mvSize,
                                  transNames: res[0].value.artist.transNames,
                              }
                            : {},
                    songList:
                        res[0].status == "fulfilled"
                            ? resolveSongs(res[0].value.hotSongs, "detail")
                            : [],
                    intro:
                        res[1].status == "fulfilled"
                            ? {
                                  intro: res[1].value.introduction,
                                  briefDesc: res[1].value.briefDesc,
                              }
                            : {},
                    albumList:
                        res[2].status == "fulfilled"
                            ? res[2].value.hotAlbums.map((item: any) => ({
                                  id: item.id,
                                  name: item.name,
                                  artists: item.artists,
                                  picUrl: item.picUrl,
                                  date: new Date(
                                      item.publishTime
                                  ).getFullYear(),
                              }))
                            : [],
                    MVList:
                        res[3].status == "fulfilled"
                            ? res[3].value.mvs.map((item: any) => ({
                                  id: item.id,
                                  imgurl: item.imgurl,
                                  name: item.name,
                                  publishTime: item.publishTime,
                              }))
                            : [],
                });
            });
        };
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
