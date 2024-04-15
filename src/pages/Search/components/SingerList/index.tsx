import RoundImage from "@/components/RoundImage";
import style from './index.module.scss'
import { Link } from 'react-router-dom'
interface Props {
    data: {
        id: number;
        name: string;
        picUrl: string;
    }[];
}

function SingerList({ data }: Props) {
    
    return (
        <div 
        className={style.singerList}>
            {
                data.map((item)=> (
                    <div key={item.id} >
                       <Link  className="LinkImage" to={`/Singer?id=${item.id}`} > <RoundImage cover={item.picUrl} /></Link>
                        <Link to={`/Singer?id=${item.id}`} className="Name" >{item.name}</Link>
                    </div>

          
                
                ))
            }
        </div>
    );
}

export default SingerList;