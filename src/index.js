import ReactDOM from 'react-dom/client';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
//import { AuthContextProvider } from './Store/auth-context';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ReduxStore/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider  store={store}>
    
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
    </Provider>);
