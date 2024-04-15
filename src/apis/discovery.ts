// 推荐相关 API

import ajax from './apiBase';

export interface BannerRes {
    banners: {
        imageUrl: string;
        targetId: number;
        targetType: number;
        url: string;
    }[];
}

/**
 * 获取轮播图
 */
export const banner = () => {
    return ajax<BannerRes>('/banner');
}

export interface RecommendPlaylistRes {
    result: {
        id: number;
        name: string;
        copywriter: string;
        picUrl: string;
        playCount: number;
    }[];
}

/**
 * 获取推荐歌单
 * @param limit 限制数
 */
export const recommendPlaylist = (limit: number = 10) => {
    return ajax<RecommendPlaylistRes>(`/personalized?limit=${limit}`);
}

export interface TopSongRes {
    data: {
        id: number;
        name: string;
        album: {
            id: number;
            name: string;
            picUrl: string;
        };
        artists: {
            id: number;
            name: string;
        }[];
    }[];
}

/**
 * 新歌速递
 * @param type 类型 全部0 华语7 欧美96 日系8 韩系16
 */
export const topSong = (type: number = 0) => {
    return ajax<TopSongRes>(`/top/song?type=${type}&limit=10`);
}

//获取相似的歌曲
export const simiSong = (id: number) => {
    return ajax(`/simi/song?id=${id}`);
}


export interface topPlaylistRes {
    list: {
        id: number;
        name: string;
        updateFrequency: string;
        coverImgUrl: string;
        description: string;
    }[];
}

/**
排行榜
 */
export const topPlaylist = () => {
    return ajax(`/toplist/detail`);
}

export interface newAlbumlistType{
    album:{
        artist:{
            name:string,
            id:number,
    
        },
        blurPicUrl:string,
        id:number,
        name:string,
    }[]
}


/**
最新专辑
 */
export const newAlbumlist = () => {
    return ajax(`/album/newest`);
}


export interface hotSingerType{
    singer:{
        picUrl:string,
        id:number,
        name:string,
    }[]
}


/**
热门歌手
 */
export const hotSinger = () => {
    return ajax(`/toplist/artist`);
}



export interface huaLiuType{
    hotAlbums:{
        blurPicUrl:string,
        id:number,
        name:string,
    }[]
}



/**
热门歌手
 */
export const huaLiu = () => {
    return ajax(`/artist/album?id=6452`);
}