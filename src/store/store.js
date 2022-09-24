import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'//thunk es el Middleware que vamos a utilizar para nuestras funciones asíncronas

import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducers';

                         //esto nos va a habilitar que tengamos las extensiones del devtools de redux mas poder aplicar middlewares con compose
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//createStore no puede contener mas de un reducer, sin embargo con combineReducers podemos agregarle mas reducers
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});


export const store = createStore(//este store de debe importarse en el punto mas alto de nuestra aplicacion (JournalApp) para que la informacion sea compratida en toda la app y sus componentes
    reducers,
    composeEnhancers( applyMiddleware(thunk) )//le aplicamos el middleware thunk
    );