declare global {
    // 音乐播放相关类型
    interface MusicItem {
        id: number;
        name: string;
        artists: string[];
        duration: number;
        album?: string;
        lyric?: string;
        url?: string;
    }

    interface PlayingItem extends MusicItem {
        progress: number;
        isPlaying: boolean;
    }

    // API响应通用类型
    interface ApiResponse<T> {
        code: number;
        message?: string;
        data: T;
    }

    // 分页相关类型
    interface Pagination {
        page: number;
        pageSize: number;
        total: number;
    }

    // 组件通用Props类型
    interface CommonProps {
        className?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }
}

export interface UserInfo {
    name: string | null;
    avatar: string | null;
}

export {};
