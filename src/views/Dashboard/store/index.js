import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { Base_URL } from '../../../utility/Utils'

export const ADD_USER_API = createAsyncThunk('dashboard/addUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${Base_URL}/api/user/create`, data
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})
export const GET_ALL_USER = createAsyncThunk('dashboard/getAllUser', async ({ page, perPage, q, status, user_type }, { rejectWithValue }) => {
    console.log(page, perPage, q)
    try {
        const response = await axios.get(`${Base_URL}/api/user/getAllUser?page=${page}&size=${perPage}&title=${q}&status=${status}&user_type=${user_type}`
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        console.log("response", response)
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const UPDATE_USER_STATUS = createAsyncThunk('dashboard/updateUserStatus', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${Base_URL}/api/user/updateStatus`, data
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const DELETE_USER = createAsyncThunk('dashboard/deleteUser', async (user_id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${Base_URL}/api/user/deleteUser?id=${user_id}`
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        isProcess: false,
        message: "",
        data: [],
        total: 1, //  state.total = action.payload.totalPages
        params: {},
        allData: [],
        selectedUser: null
    },
    reducers: {},

    extraReducers: {
        [GET_ALL_USER.pending]: (state) => {
            state.isProcess = true
        },
        [GET_ALL_USER.fulfilled]: (state, { payload }) => {
            state.isProcess = false
            state.message = ""
            state.allData = payload.allData
            state.total = payload.totalItems
        },
        [GET_ALL_USER.rejected]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload?.message
        },
        [ADD_USER_API.pending]: (state) => {
            state.isProcess = true
        },
        [ADD_USER_API.fulfilled]: (state, { payload }) => {
            if (payload?.status) {
                state.isProcess = false
                state.message = ""
                // state.allServicesTypes = payload.data
            }
        },
        [ADD_USER_API.rejected]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload?.message
        },
        [UPDATE_USER_STATUS.fulfilled]: (state, { payload }) => {
            if (payload) {
                state.isProcess = false
                state.message = ""
                state.allData = state.allData.map((item) => {
                    if (item.user_id === payload.user_id) {
                        return { ...item, status: payload.status }
                    }
                    return {
                        ...item
                    }
                })
            }
        },
        [DELETE_USER.fulfilled]: (state, { payload }) => {
            if (payload) {
                state.isProcess = false
                state.message = ""
                state.allData = state.allData.filter((item => item.user_id !== payload.user_id))
                // state.allData = state.allData.map((item) => {
                //     if (item.user_id === payload.user_id) {
                //         return { ...item, status: payload.status }
                //     }
                //     return {
                //         ...item
                //     }
                // })
            }
        }
    }
})


export const { } = dashboardSlice.actions

export default dashboardSlice.reducer