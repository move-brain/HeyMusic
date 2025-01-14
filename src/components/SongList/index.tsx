import {
    Fragment,
    useState,
    useEffect,
    memo,
    useRef,
    useCallback,
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
    //添加到播放列表
    const handleAddToPlaylist = (songItem: SongItem) => {
        // 播放列表中已有该歌曲
        if (playlist.find((item) => item.id === songItem.id)) {
            return;
        }

        // 追加到当前播放列表
        const newList = playlist.slice();
        newList.push(songItem);
        dispatch(setPlaylist(newList));
    };

    //下载
    const handleDownload = (songItem: SongItem) => {
        const { id } = songItem;
        music().download(id);
    };

    // 播放指定歌曲
    const handlePlay = (songItem: SongItem) => {
        // 播放
        dispatch(playSong({ item: songItem }));
        // 播放列表中已有该歌曲
        if (playlist.find((item) => item.id === songItem.id)) {
            return;
        }
        // 追加到当前播放列表
        const newList = playlist.slice();
        newList.push(songItem);
        dispatch(setPlaylist(newList));
    };

    //收藏歌单中的某首歌
    // const handleCollectSong = (id: number) => {
    //     collectSong(id);
    // };

    //删除歌单中的某首歌
    const handleDelete = async () => {
        if (!selectedItem) {
            return;
        }

        await songlistTracks("del", playlistId as string, selectedItem.id);
        Toast.show("已删除");

        // 在 currentList 中删除
        const newList = currentList.filter(
            (item) => item.id !== selectedItem.id
        );
        setCurrentList(newList);
        setVisible(false);
    };

    useEffect(() => {
        // 根据分页加载数据
        const getData = async () => {
            setCurrentList([]);
            // const start = (currentPage - 1) * 50;
            // const ids = songIds!.slice(start, start + 50);
            const songRes = await songDetail(songIds!);
            const { songs } = songRes;
            setCurrentList(resolveSongs(songs, "detail"));
        };

        if (songIds) {
            getData();
        }
    }, [songIds, currentPage]);

    useEffect(() => {
        if (!currentList.length) {
            return;
        }
        setList(currentList.slice(startIndex, endIndex));
    }, [currentList]);

    useEffect(() => {
        setList(
            currentList.slice(
                startIndex,
                Math.min(currentList.length, startIndex + visibleItemCount)
            )
        );
        setEndIndex(startIndex + visibleItemCount);
    }, [startIndex]);

    const handleScroll = () => {
        if (!SongListRef.current) {
            return;
        }
        const scrollTop = SongListRef.current?.scrollTop - window.innerHeight;
        if (scrollTop < 0) {
            setStartIndex(0);
            return;
        }
        setStartIndex(Math.floor(scrollTop! / ItemHei));
    };
    const debouncedHandleScroll = useCallback(throttle(handleScroll, 50), []);
    useEffect(() => {
        SongListRef.current?.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            SongListRef.current?.removeEventListener(
                "scroll",
                debouncedHandleScroll
            );
        };
    }, [debouncedHandleScroll]);

    return (
        <div ref={SongListRef} className={style.songlist}>
            <div
                className={style.phantom}
                style={{ height: listHeight + "px" }}
            ></div>

            {list.length === 0 ? (
                <Loading />
            ) : (
                <div style={{ transform: `translate3d(0,${startOffset}px,0)` }}>
                    {list.map((item, index) => {
                        const {
                            id,
                            name,
                            singers,
                            duration,
                            isFree,
                            albumId,
                            albumName,
                            cover,
                        } = item;
                        return (
                            <div key={id}>
                                {!album ? (
                                    <PlayListItem data={item} />
                                ) : (
                                    <AlbumListItem
                                        Idx={index + 1}
                                        id={id}
                                        name={name}
                                        singers={singers}
                                        duration={duration}
                                        isFree={isFree}
                                        albumId={albumId}
                                        albumName={albumName}
                                        cover={cover}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
            {/* <Pagination
                currentPage={currentPage}
                total={songIds?.length || 0}
                pageSize={50}
                onChange={setCurrentPage}
            />
            <Modal
                visible={visible}
                title="删除歌曲"
                onCancel={() => setVisible(false)}
                onOk={handleDelete}
            >
                是否要删除歌曲 {selectedItem?.name} ？
            </Modal> */}
        </div>
    );
}

export default memo(SongList);
