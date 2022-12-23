// ** Reducers Imports
import layout from './layout'
import navbar from './navbar'
// import recordingSlice from "../views/Recorder/store/"
import recordingSlice from "../views/Recorder/store"
import dashboardSlice from "../views/Dashboard/store"
import AuthUserSlice from "../views/Authentication/store"
import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ActivityLogSlice from "../views/ActivityLogs/store"
import AddRecorder from "../views/AddRecords/store/AddRecordSlice"

const persistedReducer = combineReducers({
    navbar,
    layout,
    recordingSlice,
    dashboardSlice,
    AuthUserSlice,
    ActivityLogSlice,
    AddRecorder
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['AuthUserSlice']
}

const rootReducer = persistReducer(persistConfig, persistedReducer)


export default rootReducer

