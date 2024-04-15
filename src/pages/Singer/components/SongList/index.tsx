import SongListItem from "@/components/SongListItem";
import { memo } from "react"
import style from './index.module.scss'

interface Props {
    data:{
        id:number,
        duration:number,
        name:string,
        singers:Array<{ id: number; name: string;}>,
        isFree:boolean,
        albumId:number,
        albumName:string,
        cover:string
    }[]
}

const SongList=({data}:Props)=>{
    return (
        <div  className={style.songList} >
            {
             data.map((item)=>(<SongListItem key={item.id} data={item} />))   
            }
        </div>
    )
}

export default memo(SongList)