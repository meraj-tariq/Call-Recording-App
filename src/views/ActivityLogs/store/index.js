import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { Base_URL } from '../../../utility/Utils'

export const GET_AUDIO_ACTIVITY = createAsyncThunk('activityLogsSlice/GetAudioActivity', async ({ page, perPage, q }, { rejectWithValue }) => {
    try {
        // const response = await axios.get(`${Base_URL}/api/recordings?path=${tempPath}&inum=${inum}`
        const response = await axios.post(`${Base_URL}/api/recordings/logs/getActivity?Page=${page}&PageSize=${perPage}&q=${q}`
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        // console.log("response", response)
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


export const ActivityLogSlice = createSlice({
    name: 'activityLogsSlice',
    initialState: {
        isProcess: false,
        message: "",
        total: 1, //  state.total = action.payload.totalPages
        allTypeData: [],
        selectedUser: null
    },
    reducers: {},

    extraReducers: {
        [GET_AUDIO_ACTIVITY.pending]: (state) => {
            state.isProcess = true
        },
        [GET_AUDIO_ACTIVITY.fulfilled]: (state, { payload }) => {
            state.isProcess = false
            state.message = ""
            state.allTypeData = payload.allRecords

            state.total = payload.totalItems
        },
        [GET_AUDIO_ACTIVITY.rejected]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload?.message
        }
    }
})


export const { } = ActivityLogSlice.actions

export default ActivityLogSlice.reducer