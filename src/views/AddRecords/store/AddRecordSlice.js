import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import { Base_URL } from '../../../utility/Utils'

export const UPLOAD_TAR_FOLDER = createAsyncThunk('addRecorderSlice/UploadTarFolder', async (path, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${Base_URL}/api/recordings/findtarFiles`, { path })

        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


export const UNTAR_SINGLE_FILE = createAsyncThunk('addRecorderSlice/UNTAR_SINGLE_FILE', async (path, { rejectWithValue }) => {
    try {
        const options = {
            onDownloadProgress: progressEvent => {
                const { total } = progressEvent
                // const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length'])
                const current = progressEvent.currentTarget.response.length

                const percentCompleted = Math.floor(current / total * 100)
                console.log('completed: ', percentCompleted, progressEvent)
            }
        }
        const response = await axios.post(`${Base_URL}/api/recordings/untarTarSingleFiles`, { path }, options

            // headers: { "Access-Control-Allow-Origin": "*" }
            // onUploadProgress: (ProgressEvent) => {
            //     const { loaded, total } = ProgressEvent
            //     const percent = Math.floor((loaded * 100) / total)
            //     console.log("loaded:", loaded)
            //     console.log(`${loaded}kb of ${total}kb | ${percent}%`)
            //     checkProgressStatus(loaded, total)
            // }
        )

        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const AddRecorder = createSlice({
    name: 'addRecorderSlice',
    initialState: {
        isProcess: false,
        message: "",
        listTarFolderPath: null,
        uploadAllProcess: false
    },
    reducers: {
        clearTarPathList: (state) => {
            state.listTarFolderPath = null
        },
        UpdateFileProgress: (state, { payload }) => {
            state.listTarFolderPath = state.listTarFolderPath.map((item) => {
                if (item.path === payload.path) {
                    return { ...item, UploadStatus: true }
                }
                return {
                    ...item
                }
            })
        },
        handleRemovePath: (state, { payload }) => {
            console.log(payload)
            state.listTarFolderPath = payload
        }
    },

    extraReducers: {
        [UPLOAD_TAR_FOLDER.pending]: (state) => {
            state.isProcess = true
            state.message = ""
        },
        [UPLOAD_TAR_FOLDER.fulfilled]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload.message
            state.listTarFolderPath = payload.data

        },
        [UPLOAD_TAR_FOLDER.rejected]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload?.message
        },
        [UNTAR_SINGLE_FILE.pending]: (state, { meta }) => {
            state.uploadAllProcess = true
            state.isProcess = true
            state.listTarFolderPath = state.listTarFolderPath.map((item) => {
                if (item.path === meta.arg) {
                    return {
                        ...item,
                        UploadStatus: true,
                        fileLength: null
                    }
                }
                return {
                    ...item
                }
            })
        },
        [UNTAR_SINGLE_FILE.fulfilled]: (state, { payload }) => {
            state.isProcess = false
            state.uploadAllProcess = false
            state.message = ""
            state.listTarFolderPath = state.listTarFolderPath.map((item) => {
                if (item.path === payload.path) {
                    return {
                        ...item,
                        progress: true,
                        fileLength: payload.fileLength,
                        message: payload.message,
                        filename: payload.filename
                    }
                }
                return {
                    ...item
                }
            })
        },
        [UNTAR_SINGLE_FILE.rejected]: (state, { error }) => {
            state.isProcess = false
            state.message = error?.message
            state.listTarFolderPath = state.listTarFolderPath.map((item) => {
                if (item.path) {
                    return {
                        ...item,
                        progress: false,
                        UploadStatus: false,
                        message: error?.message
                    }
                }
                return {
                    ...item
                }
            })
        }
    }
})


export const { clearTarPathList, UpdateFileProgress, handleRemovePath } = AddRecorder.actions

export default AddRecorder.reducer

