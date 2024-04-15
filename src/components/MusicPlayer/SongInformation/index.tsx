import { memo, useMemo } from 'react';
import style from './index.module.scss';
import { Link } from 'react-router-dom';
import { convertTime } from '@/utils';

import type { State } from '@/store/songSlice/types';

interface Props {
    playingItem: State['playingItem'];
}

function SongInformation({ playingItem }: Props) {
    const { id, name, cover, singers, duration, } = playingItem;
    return (
        <div className={style.container}>
            <img src={cover} />
            <div className="information">
                <Link className='songName' to={`/Song?id=${id}`}>{name}</Link>
                {singers.map((item)=>(<Link  key={item.id} to={`/Singer?id=${item.id}`} className="singer">{item.name}</Link>))}
            </div>
        </div>
    );
};

export default memo(SongInformation);