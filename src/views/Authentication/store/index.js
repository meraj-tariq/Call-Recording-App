import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { Base_URL } from '../../../utility/Utils'
import { AUDIO_ACTIVITY } from '../../Recorder/store'

export const LOGIN = createAsyncThunk('authUser/login', async (data, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.post(`${Base_URL}/api/user/login`, data
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        const first_name = data.email?.split('@')[0]
        const name = first_name[0].toUpperCase() + first_name.slice(1)
        dispatch(AUDIO_ACTIVITY({ message: `Successfully logged in`, type: "1", user: name }))
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})

export const LOGOUT = createAsyncThunk('authUser/logout', async (data, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios.post(`${Base_URL}/api/user/logout`, data
            // { headers: { "Access-Control-Allow-Origin": "*" } }
        )
        dispatch(AUDIO_ACTIVITY({ message: `Successfully logged out`, type: "1", user: data.first_name + data.last_name }))
        return response.data
    } catch (e) {
        return rejectWithValue(e.response.data)
    }
})


export const AuthUserSlice = createSlice({
    name: 'authUser',
    initialState: {
        isProcess: false,
        message: "",
        userData: null
    },
    reducers: {
        handleLogin: () => {
            // localStorage.setItem('userData', JSON.stringify(action.payload))
        },
        handleLogout: state => {
            state.userData = null
            localStorage.removeItem('userData')
            state.message = ""
        }
    },

    extraReducers: {
        [LOGIN.pending]: (state) => {
            state.isProcess = true
            state.message = ""
        },
        [LOGIN.fulfilled]: (state, { payload }) => {
            if (payload?.status) {
                state.isProcess = false
                state.message = ""
                state.userData = payload.data
                localStorage.setItem('userData', JSON.stringify(payload.data))
            }
        },
        [LOGIN.rejected]: (state, { payload }) => {
            state.isProcess = false
            state.message = payload?.message
        },
        [LOGOUT.pending]: () => {
            // state.isProcess = true
        },
        [LOGOUT.fulfilled]: (state) => {
            state.userData = null
            localStorage.removeItem('userData')
            state.isProcess = false
        },
        [LOGOUT.rejected]: () => {
            // state.isProcess = false
            // state.message = payload?.message
        }
    }

})


export const { handleLogin, handleLogout } = AuthUserSlice.actions

export default AuthUserSlice.reducer