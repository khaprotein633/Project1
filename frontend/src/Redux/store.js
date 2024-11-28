// store.js

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { userReducer } from './reducers/user';
import { productReducer } from './reducers/product';
import { cartReducer } from './reducers/cart';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers with persistence
const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  product: productReducer,
  cart: cartReducer,

};

// Configure store with persisted reducers
const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;