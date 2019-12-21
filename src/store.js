import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Custom reducers
import buscarUsusarioReducer from './reducers/buscarUsuarioReducer';

// Configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyBOYxmhuLMaMxmoBDAJTrIznsoku5jEkfY",
    authDomain: "bibliostore-f8840.firebaseapp.com",
    databaseURL: "https://bibliostore-f8840.firebaseio.com",
    projectId: "bibliostore-f8840",
    storageBucket: "bibliostore-f8840.appspot.com",
    messagingSenderId: "1020043573394",
    appId: "1:1020043573394:web:973f89a27bad752d8d0e4b",
    measurementId: "G-0PYQC6H58V"
}

// Inicializar firebase
firebase.initializeApp(firebaseConfig)

// Configuracion de react-redux
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducer

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    usuario : buscarUsusarioReducer
})

// State inicial
const initialState = {};

//  Create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;