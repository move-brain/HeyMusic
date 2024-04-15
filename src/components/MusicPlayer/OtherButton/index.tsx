import style from './index.module.scss';
import Playlist from './Playlist';
import PlayMode from './PlayMode';
import Volume from './Volume';
import DrawerButton from '@/components/DrawerButton';

import type { State } from '@/store/songSlice/types';

interface Props {
    isPlaying: boolean;
    playingItem: State['playingItem'];
    playlist: State['playlist'];
    playMode: State['playMode'];
    currentTime: number;
    ShowMusic:(bool:boolean)=>void
}

function OtherButton({ isPlaying, playingItem, playlist, playMode, currentTime , ShowMusic}: Props) {
    
    return (
        <div className={style['other-button']}>
            <Playlist
                isPlaying={isPlaying}
                playingItem={playingItem}
                playlist={playlist}
                currentTime={currentTime}
            />
            <PlayMode playMode={playMode} />
            <Volume />
            <DrawerButton ClickIcon={ShowMusic} type='B' />
        </div>
    );
}

export default OtherButton;