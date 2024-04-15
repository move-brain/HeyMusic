import { memo , useState } from "react"
import style from './index.module.scss'

interface Props{
    cover:string,
    isKeep?:boolean
}
const RectangleImg=({cover,isKeep}:Props)=>{
    const [isHovered, setIsHovered] = useState(isKeep ? true:false);
        const backImage={backgroundImage:`url(${cover})`,}
    return (
        <div
        onMouseEnter={() => { !isKeep&&setIsHovered(true)}}
        onMouseLeave={() => {!isKeep&&setIsHovered(false)}}
        className={style.ImgePar}>
            <img src={cover}  />
            <div className={style.shaow} style={isHovered ? backImage:{}} ></div>
        </div>
    )
}

export default memo(RectangleImg)