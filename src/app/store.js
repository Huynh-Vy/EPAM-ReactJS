import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/features/Auth/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { combineReducers} from 'redux';
import movieReducer from '../components/Movie/movieSlice';

const persistConfig = {
    key: 'root',
    storage: localStorage
}

const rootReducer = combineReducers({
    user: userReducer,
    movie: movieReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;