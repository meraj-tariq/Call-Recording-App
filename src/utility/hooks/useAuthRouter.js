//** React Imports
import React from 'react'
// import { useEffect, useCallback } from 'react'

// ** Store Imports
import { useSelector } from 'react-redux'

export const useAuthRouter = () => {
    // ** Hooks
    const { userData } = useSelector(state => state.AuthUserSlice)
    return { userData }
}
