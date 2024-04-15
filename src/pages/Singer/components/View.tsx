import style from './View.module.scss';
import { Loading } from '@/components';
import Header from './Header';
import Introduction from './Introduction';
import AlbumList from './AlbumList';
import MvsList from './MvsList';

import type { PageState } from '../index';
import SongList from './SongList';

interface Props {
    pageState: PageState | null;
    onPlayAll: (id: number) => Promise<void>;
}

function View({ pageState , onPlayAll}: Props) {
    if (!pageState) {
        return <Loading />;
    }

    const { header, songList, intro, albumList , MVList } = pageState;
    console.log(songList);
    
    return (
        <div className={style.singer}>
            <Header data={header} />
            <div className={style.title} >热门歌曲</div>
            <SongList data={songList.slice(0,12)} />
            <div className={style.title} >专辑</div>
            <AlbumList onPlayAll={onPlayAll} data={albumList} />
            <div className={style.title} >MV</div>
            <MvsList data={MVList} />
        </div>
    );
}

export default View;
