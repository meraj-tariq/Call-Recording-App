

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ActivityTableContainer from './TableContainer'

const ActivityLogs = () => {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.AuthUserSlice)

    useEffect(() => {
        if (userData === null) {
            navigate("/login")
        }
    }, [])

    useEffect(() => {
        if (userData?.user_type === "1") { // admin
            navigate("/activitylogs")
        }
    }, [])

    useEffect(() => {
        if (userData?.user_type === "2") { //user
            navigate("/home")
        }
    }, [])

    return (
        <div className='app-user-list'>
            <ActivityTableContainer />
        </div>
    )
}
export default ActivityLogs