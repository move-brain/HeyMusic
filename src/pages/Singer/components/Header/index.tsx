import style from './index.module.scss';
import RoundImage from '@/components/RoundImage';
import PlayButton from '@/components/PlayButton';
interface Props {
    data: any;
}

function Header ({ data }: Props) {

    const { name, alias, cover , albumSize , musicSize , mvSize , transNames } = data;
    
    const handClick=async ()=>{
        console.log(1);
        
    }

    return (
        <div  className={style.header} >
            <RoundImage cover={cover} />
            <div className='right' >
                <div  className='rightName' >{name}</div>
                <div  className='Size' >
                    <span>{transNames&&transNames.join(',')}</span><br/>
                    {`${musicSize}首歌 · ${albumSize}张专辑 · ${mvSize}个MV`}
                </div>
                <PlayButton ClickButton={handClick} text='播放'/>
            </div>
        </div>

    );
}

export default Header;