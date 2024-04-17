import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { SongItem, PlayingItem, State } from "./types.ts";
import music from "@/utils/music";
import { RootState } from "../index.js";
import { Toast } from "@/components";

const initSong = {
    id: 776039,
    name: "ONE's hope",
    singers: [{ id: 18303, name: "やなぎなぎ" }],
    duration: 369.72,
    cover: "https://p1.music.126.net/l22TRH7bs4VG6HMT2Iy56w==/2511284557902801.jpg",
    isFree: true,
    albumId: 76484,
    albumName: "Colorful Parade",
};

export const playSong = createAsyncThunk(
    "song/playSong",
    async ({
        item,
        offset,
    }: {
        item: SongItem | PlayingItem;
        offset?: number;
    }) => {
        const { id } = item;
        const response = await music().play(id, offset);
        return response;
    }
);

export const palynextSong = createAsyncThunk(
    "song/palynextSong",
    async (type: "prev" | "next", { getState }) => {
        const state: RootState = getState() as RootState;
        const { song } = state;
        let { playlist, playMode, playingItem } = song;
        const len = playlist.length;
        if (len <= 1 || playMode === "single-cycle") {
            // @ts-ignore
            return;
        }
        const currentIndex = playlist.findIndex(
            ({ id }) => id === playingItem.id
        );
        let nextIndex: number;
        switch (playMode) {
            case "list-loop":
                nextIndex =
                    type === "next"
                        ? // 下一首
                          (currentIndex + 1) % len
                        : // 上一首
                          (len + currentIndex - 1) % len;
                break;
            case "random":
                nextIndex = (Math.random() * len) >> 0;
                if (nextIndex === currentIndex) {
                    nextIndex = (currentIndex + 1) % len;
                }
        }
        const { id } = playlist[nextIndex!];
        const response = await music().play(id, 0);
        return response;
    }
);
const songSlice = createSlice({
    name: "songSlice",
    initialState: {
        isLoading: false,
        isPlaying: false, //是否播放
        playlist: [initSong], //播放列表
        playMode: "list-loop", //播放模式
        playingItem: {
            //正在播放的音乐
            ...initSong,
            lyric: null,
        },
    },
    reducers: {
        pauseSong: (state) => {
            music().pause();
            state.isPlaying = false;
        },
        test: () => {
            console.log("成功");
        },
        setPlaylist: (state, action: PayloadAction<SongItem[]>) => {
            state.playlist = action.payload;
        },
        setPlayMode: (state, action: PayloadAction<State["playMode"]>) => {
            state.playMode = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(playSong.pending, (state) => {
                state.isPlaying = true;
                state.isLoading = true;
            })
            .addCase(playSong.fulfilled, (state, action) => {
                if (action.payload) {
                    // @ts-ignore
                    state.playingItem = music().getPlayingItem();
                    state.isPlaying = true;
                    state.isLoading = false;
                } else {
                    Toast.show(`加载歌曲失败`);
                }
            })
            .addCase(palynextSong.pending, (state) => {
                state.isPlaying = true;
                state.isLoading = true;
            })
            .addCase(playSong.rejected || palynextSong.rejected, () => {
                Toast.show(`加载歌曲失败`);
            })
            .addCase(palynextSong.fulfilled, (state, action) => {
                if (action.payload) {
                    // @ts-ignore
                    state.playingItem = music().getPlayingItem();
                    state.isPlaying = true;
                    state.isLoading = false;
                } else {
                    Toast.show(`加载歌曲失败`);
                }
            });
    },
});
export const { setPlaylist, setPlayMode, pauseSong } = songSlice.actions;
export const selectSong = (state: RootState) => state.song;
export default songSlice.reducer;
