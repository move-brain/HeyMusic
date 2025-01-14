import {
    Fragment,
    useState,
    useEffect,
    memo,
    useRef,
    useCallback,
    useMemo,
} from "react";
import style from "./index.module.scss";
import Loading from "@/components/Loading";
import Toast from "@/components/Toast";
import { songlistTracks } from "@/apis/playlist";
import { useQuery } from "@/utils/hooks";
import { songDetail } from "@/apis/song";
import { resolveSongs } from "@/utils/resolve";
import music from "@/utils/music";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { playSong, selectSong, setPlaylist } from "@/store/songSlice/index";
import PlayListItem from "./component/PlayListItem";
import AlbumListItem from "./component/AlbumListItem";
import type { SongItem } from "@/store/songSlice/types";
import { throttle } from "lodash";

interface Props {
    songList?: SongItem[];
    isCreator?: boolean;
    songIds?: number[];
    album?: boolean;
}

function SongList({ songList, songIds, isCreator, album }: Props) {
    const playlistId = useQuery("id");
    const song = useAppSelector(selectSong);
    const dispatch = useAppDispatch();
    const { playingItem, playlist } = song;
    const [currentList, setCurrentList] = useState<SongItem[]>(songList || []);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SongItem | null>(null);
    const SongListRef = useRef<HTMLDivElement | null>(null);
    const AlbumListItemRef = useRef<HTMLDivElement | null>(null);
    const ItemHei = 70;
    const containerHei = 3 * window.innerHeight;
    const visibleItemCount = Math.ceil(containerHei / ItemHei);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(startIndex + visibleItemCount);
    const [list, setList] = useState<SongItem[] | []>([]);
    const listHeight = currentList.length * ItemHei;
    const startOffset = startIndex * ItemHei;

    // Memoized handlers
    const handleAddToPlaylist = useCallback(
        (songItem: SongItem) => {
            if (playlist.find((item) => item.id === songItem.id)) return;
            const newList = [...playlist, songItem];
            dispatch(setPlaylist(newList));
        },
        [playlist, dispatch]
    );

    const handleDownload = useCallback((songItem: SongItem) => {
        music().download(songItem.id);
    }, []);

    const handlePlay = useCallback(
        (songItem: SongItem) => {
            dispatch(playSong({ item: songItem }));
            if (!playlist.find((item) => item.id === songItem.id)) {
                dispatch(setPlaylist([...playlist, songItem]));
            }
        },
        [dispatch, playlist]
    );

    const handleDelete = useCallback(async () => {
        if (!selectedItem) return;
        await songlistTracks("del", playlistId as string, selectedItem.id);
        Toast.show("已删除");
        setCurrentList(
            currentList.filter((item) => item.id !== selectedItem.id)
        );
        setVisible(false);
    }, [selectedItem, playlistId, currentList]);

    // Memoized data
    const memoizedSongIds = useMemo(() => songIds, [songIds]);
    const memoizedCurrentPage = useMemo(() => currentPage, [currentPage]);

    // Effects
    useEffect(() => {
        const getData = async () => {
            if (!memoizedSongIds) return;
            const songRes = await songDetail(memoizedSongIds);
            setCurrentList(resolveSongs(songRes.songs, "detail"));
        };
        getData();
    }, [memoizedSongIds, memoizedCurrentPage]);

    const visibleList = useMemo(
        () =>
            currentList.slice(
                startIndex,
                Math.min(currentList.length, endIndex)
            ),
        [currentList, startIndex, endIndex]
    );

    const handleScroll = useCallback(() => {
        if (!SongListRef.current) return;
        const scrollTop = SongListRef.current.scrollTop - window.innerHeight;
        setStartIndex(Math.max(0, Math.floor(scrollTop / ItemHei)));
    }, []);

    const debouncedHandleScroll = useMemo(
        () => throttle(handleScroll, 50),
        [handleScroll]
    );

    useEffect(() => {
        const ref = SongListRef.current;
        if (!ref) return;
        ref.addEventListener("scroll", debouncedHandleScroll);
        return () => ref.removeEventListener("scroll", debouncedHandleScroll);
    }, [debouncedHandleScroll]);

    return (
        <div ref={SongListRef} className={style.songlist}>
            <div
                className={style.phantom}
                style={{ height: `${listHeight}px` }}
            />
            {visibleList.length === 0 ? (
                <Loading />
            ) : (
                <div style={{ transform: `translate3d(0,${startOffset}px,0)` }}>
                    {visibleList.map((item) => (
                        <div key={item.id}>
                            {!album ? (
                                <PlayListItem data={item} />
                            ) : (
                                <AlbumListItem
                                    Idx={visibleList.indexOf(item) + 1}
                                    {...item}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(SongList);
