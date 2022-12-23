/* eslint-disable multiline-ternary */
import { Play, Pause } from "react-feather"
// ** Store & Actions
import { store } from '@store/store'
import { GetTimeAndDate, gTime } from "../../utility/Utils"
import { PLAY_AUDIO_FILE, selectRecording } from "./store"
// import { getUser, deleteUser } from '../store'

export const columns = [
    {
        name: 'INUM',
        sortable: true,
        minWidth: '170px',
        sortField: 'inum',
        selector: row => row.inum,
        cell: row => <span className='fw-bold'>{row.inum}</span>
    },
    {
        name: 'Call Id',
        sortable: false,
        minWidth: '170px',
        sortField: 'core_callid',
        selector: row => row.core_callid,
        cell: row => <span className='fw-bold'>{row.core_callid}</span>
    },
    {
        name: 'Agent Name',
        sortable: false,
        minWidth: '199px',
        sortField: 'agentname',
        selector: row => row.agentname,
        cell: row => <span className='fw-bold'>{row.agentname}</span>
    },
    {
        name: 'Agent ID',
        sortable: false,
        minWidth: '6px',
        sortField: 'agentLoginId',
        selector: row => row.agentLoginId,
        cell: row => <span className='fw-bold'>{row.agentLoginId}</span>
    },

    {
        name: 'Start Time',
        sortable: false,
        minWidth: '158px',
        sortField: 'starttime',
        selector: row => row.starttime,
        cell: row => <span className='fw-bold'>{GetTimeAndDate(row.starttime)}</span>
    },
    {
        name: 'End Time',
        sortable: false,
        minWidth: '168px',
        sortField: 'endtime',
        selector: row => row.endtime,
        cell: row => <span className='fw-bold'>{GetTimeAndDate(row.endtime)}</span>
    },
    {
        name: 'Duration',
        sortable: false,
        minWidth: '109px',
        sortField: 'duration',
        selector: row => row.duration,
        cell: row => <span className='fw-bold'>{row.duration && gTime(row.duration)}</span>
    },
    {
        name: 'Action',
        minWidth: '10px',
        selector: row => row,
        
        cell: (row) => {
            const isPlay = store?.getState()?.recordingSlice.selectedFile?.inum === row.inum
            console.log(isPlay)
            return (
                isPlay ?
                    <Pause size={20} className='me-50' />
                    :
                    <Play size={20} className='me-50' onClick={() => {
                        // store.dispatch(PLAY_AUDIO_FILE({ path: row.path, id: row.inum, user_id: store?.getState()?.AuthUserSlice?.userData?.user_id }))
                        store.dispatch(PLAY_AUDIO_FILE(row))
                        store.dispatch(selectRecording(row))
                        console.log(row, store?.getState()?.recordingSlice.selectedFile)
                    }}></Play>
            )
        }
    }
]

/* <Play size={20} className='me-50' onClick={() => {
    // store.dispatch(PLAY_AUDIO_FILE({ path: row.path, id: row.inum, user_id: store?.getState()?.AuthUserSlice?.userData?.user_id }))
    store.dispatch(PLAY_AUDIO_FILE(row))
    store.dispatch(selectRecording(row))
    console.log(row, store?.getState()?.recordingSlice.selectedFile)
}}></Play> */