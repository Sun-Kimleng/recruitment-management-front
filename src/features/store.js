import {configureStore} from '@reduxjs/toolkit';
import AdminReducer from './adminSlice/adminSlice'
import NavbarReducer from './navbarSlice/navbarSlice'
import JobReducer from './jobSlice/jobSlice';

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
  import storageSession from 'redux-persist/lib/storage/session'
  import { PersistGate } from 'redux-persist/integration/react'


  
  const persistConfig = {
    key: 'root',
    version: 1,
    //exception state
    blacklist: ['triggerLeftBar','users', 'registerError', 'loginError', 'isOpen'],
    storage,
  }
  
  const persistConfigSession ={
    key: 'user',
    version: 1,
    //exception state
    blacklist: ['users', 'registerError', 'loginError', 'isOpen'],
    storage: storageSession,
  }

  const adminPersistedReducer = persistReducer(persistConfig, AdminReducer);
  const NavbarPersistedReducer = persistReducer(persistConfig, NavbarReducer)
  const JobPersistedReducer = persistReducer(persistConfigSession, JobReducer)
export const store = configureStore({
    reducer: {
        admin: adminPersistedReducer,
        Navbar: NavbarPersistedReducer,
        job: JobPersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});