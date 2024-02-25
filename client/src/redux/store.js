import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user:userReducer});
//after refreshing the page, the user is still visible in local storage of the browser
const persistConfig = {
    key:'root',
    version: 1,
    //local storage of the browser
    storage,
}
const persistedReducer =persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:  persistedReducer ,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
