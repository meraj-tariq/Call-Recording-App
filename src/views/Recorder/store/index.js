import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Base_URL } from '../../../utility/Utils'

export const GET_All_RECORDINGS = createAsyncThunk('recording/getAllRecordings', async ({ page, perPage, q, inum, startDateTime, endDateTime }, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${Base_URL}/api/recordings/getAllRecordings?Page=${page}&PageSize=${perPage}&q=${q}&inum=${inum}&sdt=${startDateTime}&edt=${endDateTime}`
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        // console.log("response", response)
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const PLAY_AUDIO_FILE = createAsyncThunk('recording/palyingAudio', async ({ path, inum, newPath }, { rejectWithValue }) => {
    try {
        // const response = await axios.get(`${Base_URL}/api/recordings?path=${tempPath}&inum=${inum}`
        const response = await axios.get(`${Base_URL}/api/recordings?path=${path}&inum=${inum}&tempPath=${newPath}`)
        // console.log("response", response)
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const AUDIO_ACTIVITY = createAsyncThunk('recording/audioActivity', async (data, { rejectWithValue }) => {
    try {
        // const response = await axios.get(`${Base_URL}/api/recordings?path=${tempPath}&inum=${inum}`
        const response = await axios.post(`${Base_URL}/api/recordings/logs/add`, data
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        // console.log("response", response)
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


export const recordingSlice = createSlice({
    name: 'recording',
    initialState: {
        isProcess: false,
        recorderList: [],
        message: "",
        total: 1, //  state.total = action.payload.totalPages
        audioURL: "",
        selectedFile: null,
        AUDIO_PLAY_STATUS: false

    },
    reducers: {
        selectRecording: (state, action) => {
            state.selectedFile = action.payload
        },
        clearState: (state) => {
            state.audioURL = ""
            state.selectedFile = null
            state.recorderList = []
            state.AUDIO_PLAY_STATUS = false
        }
    },
    extraReducers: {
        [GET_All_RECORDINGS.pending]: (state) => {
            state.isProcess = true
        },
        [GET_All_RECORDINGS.fulfilled]: (state, { payload }) => {
            state.isProcess = false
            state.message = ""
            state.recorderList = payload.allRecords
            state.total = payload.totalItems
        },
        [GET_All_RECORDINGS.rejected]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload?.message
        },
        [PLAY_AUDIO_FILE.pending]: (state) => {
            // state.isProcess = true
            // state.selectedFile = null
            state.audioURL = ""
            state.AUDIO_PLAY_STATUS = true
        },
        [PLAY_AUDIO_FILE.fulfilled]: (state, { meta }) => {
            // state.isProcess = false
            // state.message = ""
            state.audioURL = `${`${Base_URL}/api/recordings?path=${meta.arg.path}`}`
            state.AUDIO_PLAY_STATUS = false

            // state.total = payload.totalItems
        },
        [PLAY_AUDIO_FILE.rejected]: (state) => {
            // state.isProcess = false
            // state.message = payload?.message
            state.AUDIO_PLAY_STATUS = false
        }

    }
})

export const { selectRecording, clearState } = recordingSlice.actions
export default recordingSlice.reducer
