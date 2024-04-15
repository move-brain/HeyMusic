import './app.css';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './containers';
import { Provider } from 'react-redux';
import { store } from '@/store/index';

function App() {
    return (
        <Provider store={store} >
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>
        </Provider>

    );
}

export default App;