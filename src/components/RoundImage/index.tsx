import { memo , useState } from "react"
import style from './index.module.scss'

interface Props{
    cover:string,
}
const RoundImg=({cover}:Props)=>{
    const [isHovered, setIsHovered] = useState(false);
        const backImage={
        backgroundImage:`url(${cover})`,
        borderRadius:"50%"
    }
    return (
        <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={style.ImgePar}>
            <img src={cover}/>
            <div className={style.shaow} style={isHovered ? backImage:{}} ></div>
        </div>
    )
}

export default memo(RoundImg)