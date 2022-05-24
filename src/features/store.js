import {configureStore} from '@reduxjs/toolkit';
import AdminReducer from './adminSlice/adminSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import { PersistGate } from 'redux-persist/integration/react'


  
  const persistConfig = {
    key: 'root',
    version: 1,
    //exception state
    blacklist: ['users'],
    storage,
  }
  
  const adminPersistedReducer = persistReducer(persistConfig, AdminReducer);

export const store = configureStore({
    reducer: {
        admin: adminPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});