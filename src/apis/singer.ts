//歌手相关 API

import ajax from "./apiBase";

/**
 * 歌手图片、歌曲等信息
 * @param id 歌手 id
 * @returns
 */
export const singerInfo = (id: number | string, limit: number) => {
    return ajax(`/artists?id=${id}&limit=${limit}`);
};

/**
 * 歌手介绍
 * @param id 歌手 id
 */
export const singerDesc = (id: number | string) => {
    return ajax(`/artist/desc?id=${id}`);
};

/**
 * 获取歌手专辑
 * @param id 歌手 id
 * @param offset 偏移
 */
export const singerAlbum = (id: number | string, offset: number = 0) => {
    return ajax(`/artist/album?id=${id}&limit=30&offset=${offset}`);
};

/**
 * 获取歌手Mv
 * @param id 歌手 id
 * @param offset 偏移
 */
export const singerMvs = (id: number | string, offset: number = 0) => {
    return ajax(`/artist/mv?id=${id}`);
};
