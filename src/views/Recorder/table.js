/* eslint-disable no-mixed-operators */
/* eslint-disable multiline-ternary */
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Col, Row, Input, Label } from 'reactstrap'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Flatpickr from 'react-flatpickr'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Utils

import { ChevronDown, Pause, Play } from 'react-feather'
// import { columns } from './columns'
import { useDispatch, useSelector } from 'react-redux'
import { GET_All_RECORDINGS, PLAY_AUDIO_FILE, selectRecording } from './store'
import { GetTimeAndDate, gTime } from '../../utility/Utils'
import moment from 'moment/moment'


// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm, handleInumFilter, searchInum, handleDateAndTime }) => {
    const [Picker, setPicker] = useState('')

    // const addHours = (numOfHours, date) => {
    //     date.setTime(new Date(date).getTime() + numOfHours * 60 * 60 * 1000)

    //     return date
    // }
    const handleDateFilter = (selectedDates) => {
        setPicker(selectedDates)
        handleDateAndTime(selectedDates)
    }

    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50  mb-75'>
            <Row className='mt-1 mb-1'>


                <Col lg='4' md='6' >
                    <Label className='form-label fw-bold fs-5' for='inum'>
                        Inum:
                    </Label>
                    <Input
                        id='search-invoice'
                        // className='ms-50 w-100'
                        type='number'
                        placeholder='Type call id here...'
                        value={searchInum}
                        onChange={e => {
                            e.preventDefault()
                            handleInumFilter(e.target.value.trim())
                        }}
                    />
                </Col>
                <Col lg='4' md='6'>
                    <Label className='form-label fw-bold fs-5' for='call_id'>
                        Call id:
                    </Label>
                    <Input
                        id='search-invoice'
                        className='fw-bold'
                        // className='ms-50 w-100'
                        type='number'
                        placeholder='Type call id here...'
                        value={searchTerm}
                        onChange={e => {
                            e.preventDefault()
                            handleFilter(e.target.value.trim())
                        }}

                    />
                </Col>
                <Col lg='4' md='6' >
                    <Label className='form-label fw-bold fs-5' for='date'>
                        Select Date and Time:
                    </Label>

                    <div class="flatpickr">
                        <Flatpickr
                            className='form-control'
                            id='date'
                            value={Picker}
                            placeholder={"Select date and time"}

                            options={{
                                mode: 'range',
                                enableTime: true,
                                dateFormat: "Y-m-d h:i K",
                                // altInput: true,
                                // dateFormat: "Y-m-d H:i:S",
                                // dateFormat: "Y-m-d\\Z",
                                // wrap: true,
                                // dateFormat: "YYYY-MM-DD HH:MM",
                                maxDate: "today",
                                // mode: 'range',
                                enableTime: true
                                // time_24hr: false

                                // dateFormat: 'Y-m-d H:i K',
                                // altFormat: "D, F j \\a\\t h:i K",

                            }}
                            onClose={(selectedDates, dateStr, instance) => {
                                handleDateFilter(selectedDates, dateStr, instance)
                                setPicker(selectedDates)
                            }
                            }
                            onChange={(selectedDates, dateStr, instance) => handleDateFilter(selectedDates, dateStr, instance)}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page' className='fw-bold'>Show</label>
                        <Input
                            className='mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{ width: '5rem' }}
                        >
                            <option value='10'>10</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </Input>
                        {/* <label htmlFor='rows-per-page'>Entries</label> */}
                    </div>
                </Col>
                {/* <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0 fw-bold' htmlFor='search-invoice' >
                            Search:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100'
                            type='text'
                            placeholder='Type call id here...'
                            value={searchTerm}
                            onChange={e => {
                                e.preventDefault()
                                handleFilter(e.target.value.trim())
                            }}
                        />
                    </div>
                </Col> */}
            </Row>
        </div>
    )
}

function RecorderTable() {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(0)
    const [searchTerm, setSearchTerm] = useState("") // call id
    const [searchInum, setSearhInum] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [startDateTime, setStartDateTime] = useState("")
    const [endDateTime, setEndDateTime] = useState("")
    const store = useSelector(state => state.recordingSlice)
    const columns = [
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
            cell: row => {
                const ttt = moment(row.starttime).format('DD-MM-YYYY h:mm A')
                return (
                    <span className='fw-bold'>{ttt}</span>

                    // <span className='fw-bold'>{GetTimeAndDate(row.starttime)}</span>
                )
            }
        },
        {
            name: 'End Time',
            sortable: false,
            minWidth: '168px',
            sortField: 'endtime',
            selector: row => row.endtime,
            cell: row => {
                const ttt = moment(row.endtime).format('DD-MM-YYYY h:mm A')
                return (
                    <span className='fw-bold'>{ttt}</span>)
            }
        },
        {
            name: 'Duration',
            sortable: false,
            minWidth: '109px',
            sortField: 'duration',
            selector: row => row.duration,
            cell: row => {
                return (<span className='fw-bold'>{row.duration && gTime(row.duration)}</span>)
            }
        },
        {
            name: 'Action',
            minWidth: '10px',
            selector: row => row,
            cell: (row) => {
                const isPlay = store?.selectedFile?.inum === row?.inum
                return (
                    !isPlay ? <Play size={20} className='me-50' onClick={() => {
                        dispatch(PLAY_AUDIO_FILE(row))
                        dispatch(selectRecording(row))
                    }}></Play>
                        : <Pause />
                )
            }
        }
    ]

    const getColumns = () => {
        return columns
    }

    useEffect(() => {
        getColumns()
    }, [store.selectedFile])

    // ** Get data on mount
    useEffect(() => {
        // dispatch(getAllData())
        dispatch(
            GET_All_RECORDINGS({
                inum: searchInum.trim(),
                q: searchTerm.trim(),
                page: currentPage,
                perPage: rowsPerPage,
                startDateTime,
                endDateTime
            })
        )
    }, [dispatch])

    // ** Function in get data on filter date and time change 
    const handleDateAndTime = (selectedDates) => {

        if (selectedDates[0]) {
            const date_1 = new Date(selectedDates[0]).toUTCString()
            const addTime1 = new Date(date_1)?.setTime(new Date(date_1).getTime() + 5 * 60 * 60 * 1000)
            const startDate = new Date(addTime1)?.toISOString()
            setStartDateTime(startDate.split('Z')[0])
        }

        if (selectedDates[1]) {
            const date_2 = new Date(selectedDates[1]).toUTCString()
            const addTime2 = new Date(date_2)?.setTime(new Date(date_2).getTime() + 5 * 60 * 60 * 1000)
            const endDate = new Date(addTime2)?.toISOString()
            setEndDateTime(endDate.split('Z')[0])
        }

        dispatch(
            GET_All_RECORDINGS({
                inum: searchInum.trim(),
                q: searchTerm.trim(),
                page: currentPage,
                perPage: rowsPerPage,
                startDateTime,
                endDateTime
            })
        )
    }

    // ** Function in get data on search query change cal id
    const handleFilter = val => {
        setSearchTerm(val)
        dispatch(
            GET_All_RECORDINGS({
                inum: searchInum.trim(),
                q: val.trim(),
                page: currentPage,
                perPage: rowsPerPage,
                startDateTime,
                endDateTime
            })
        )
    }

    // ** Function in get data on search query change inum
    const handleInumFilter = val => {
        setSearhInum(val)
        dispatch(
            GET_All_RECORDINGS({
                inum: val.trim(),
                q: searchTerm.trim(),
                page: currentPage,
                perPage: rowsPerPage,
                startDateTime,
                endDateTime
            })
        )
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        dispatch(
            GET_All_RECORDINGS({
                inum: searchInum.trim(),
                q: searchTerm.trim(),
                perPage: value,
                page: currentPage,
                startDateTime,
                endDateTime
            })
        )
        setRowsPerPage(value)
    }

    // ** Function in get data on page change
    const handlePagination = page => {
        dispatch(
            GET_All_RECORDINGS({
                inum: searchInum.trim(),
                q: searchTerm.trim(),
                perPage: rowsPerPage,
                page: page.selected,
                startDateTime,
                endDateTime
            })
        )
        setCurrentPage(page.selected)
    }
    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(store.total / rowsPerPage))

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
            />
        )
    }

    // ** Table data to render
    const dataToRender = () => {
      
        return store?.recorderList.slice(0, rowsPerPage)
    }

    return (
        <Fragment>
            {/********************  Table Data ********************/}
            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        pagination
                        striped
                        // responsive
                        noDataComponent={<div className='fw-bold fs-3 m-2 text-decoration-underline'>Search to find call records</div>}
                        paginationServer
                        columns={getColumns()}
                        // onSort={handleSort}
                        paginationComponent={CustomPagination}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                store={store}
                                searchTerm={searchTerm}
                                searchInum={searchInum}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                                handleInumFilter={handleInumFilter}
                                handleDateAndTime={handleDateAndTime}
                            // toggleSidebar={toggleSidebar}
                            />
                        }
                    />
                </div>
            </Card>

        </Fragment>

    )
}

export default RecorderTable

