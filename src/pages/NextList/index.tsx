import { memo } from "react"
import { useAppSelector } from "@/store/hook"
import { selectSong } from "@/store/songSlice"
import PlaylistItem from "@/components/SongList/component/PlayListItem"
import style from './index.module.scss'
const Nextlist=()=>{
    const { playlist , playingItem } = useAppSelector(selectSong)
    const { id , name , singers , duration , isFree , albumId , albumName , cover } = playingItem
    const List=playlist.filter((item)=>item.id!==playingItem.id)
    return (
        <div className={style.nextList} >
           <h1>正在播放</h1>
           <div><PlaylistItem  data={playingItem} /></div>
           <h1>即将播放</h1>
           {
            List.map((item)=>(<PlaylistItem  data={item} />))
           }
        </div>
    )
}
export default memo(Nextlist)