// import { configureStore } from '@reduxjs/toolkit';
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from './persistStorage';
// import rootReducer from './rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   // sirf auth ko rakhna ho to:
//   // whitelist: ['auth'],
//   // ya kuch fields ko skip karna ho to slices ke andar transforms use karo
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefault) =>
//     getDefault({
//       serializableCheck: {
//         // redux-persist ke actions ignore karna zaroori
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// // Types
// export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;
// export type RootState = ReturnType<typeof store.getState>;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from './persistStorage';

import auth from './slices/auth';

const rootReducer = combineReducers({
  auth
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
