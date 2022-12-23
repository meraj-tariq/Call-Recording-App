// ** Redux Imports
// import rootReducer from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistedReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['AuthUserSlice']
}

const rootReducer = persistReducer(persistConfig, persistedReducer)
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (gDM) => gDM({ serializableCheck: false }).concat(logger)
})

export { store }
