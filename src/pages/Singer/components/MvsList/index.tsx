import { memo } from "react"
import RectangleImage from "@/components/RectangleImage"
import { Link } from 'react-router-dom'
import style from './index.module.scss'
interface Props {
   data:{
    id:number,
    imgurl:string,
    name:string,
    publishTime:string
}[]
}

const MvsList=({data}:Props)=>{
    return (
        <div className={style.MvsList} >
            {
                data.map(({ id , imgurl , name , publishTime })=>(
                    <div className="Item" >
                    <Link to={`/Video?id=${id}`} >
                        <RectangleImage cover={imgurl} /> 
                    </Link>
                    <Link to={`/Video?id=${id}`} className="name" >{name}</Link>
                    <div className="date" >{publishTime}</div>
                    </div>

                ))
            }
        </div>
    )
}
export default memo(MvsList)