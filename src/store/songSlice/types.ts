import type { MusicItem } from "@/utils/music";

export type SongItem = Omit<MusicItem["info"], "lyric">;

export interface PlayingItem extends SongItem {
    lyric: null | [string, string, number][];
}

export interface State {
    // 是否正在播放
    isPlaying: boolean;
    // 播放列表
    playlist: SongItem[];
    // 播放模式
    playMode: "list-loop" | "random" | "single-cycle";
    // 正在播放的歌曲
    playingItem: PlayingItem;
}