import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Label, Row, Input } from 'reactstrap'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Utils
// import { selectThemeColors } from '@utils'
// import Select from 'react-select'

import { ChevronDown } from 'react-feather'
import CustomHeader from './CustomHeader'
import { useDispatch, useSelector } from 'react-redux'
import { Columns } from './Columns'
import { GET_AUDIO_ACTIVITY } from '../store'


// const roleOptions = [
//     { value: '', label: 'Select logs' },
//     { value: '1', label: 'All Login and Logout logs' },
//     { value: '2', label: 'All Audio logs' }
// ]

const ActivityTableContainer = () => {
    const dispatch = useDispatch()

    // const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select logs' })
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const store = useSelector(state => state.ActivityLogSlice)


    // ** Get data on mount
    useEffect(() => {
        // dispatch(getAllData())
        dispatch(
            GET_AUDIO_ACTIVITY({
                q: searchTerm,
                page: currentPage,
                perPage: rowsPerPage
            })
        )
    }, [dispatch])

    const dataToRender = () => {

        return store.allTypeData?.slice(0, rowsPerPage)

    }
    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        dispatch(
            GET_AUDIO_ACTIVITY({
                q: val,
                page: currentPage,
                perPage: rowsPerPage

            })
        )
    }
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        dispatch(
            GET_AUDIO_ACTIVITY({
                q: searchTerm,
                perPage: value,
                page: currentPage
            })
        )
        setRowsPerPage(value)
    }
    const handlePagination = page => {
        dispatch(
            GET_AUDIO_ACTIVITY({
                q: searchTerm,
                perPage: rowsPerPage,
                page: page.selected
            })
        )
        setCurrentPage(page.selected)
    }
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
    return (
        <Fragment>
            {/* <Card>
                <CardBody style={{ padding: "1rem 2rem" }}>
                    <Row>
                        <Col md='3'>
                            <CardHeader>
                                <CardTitle tag='h4'>Filters Options</CardTitle>
                            </CardHeader>
                        </Col>
                        <Col md='4'>
                            <Label for='role-select' tag='h2'>Activity Logs</Label>
                            <Select
                                isClearable={false}
                                value={currentRole}
                                options={roleOptions}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                onChange={data => {
                                    setCurrentRole(data)
                                    // useDispatch(
                                    //     GET_ALL_USER({
                                    //         q: searchTerm,
                                    //         page: currentPage,
                                    //         perPage: rowsPerPage,
                                    //         status: currentStatus.number,
                                    //         user_type: data.value
                                    //     })
                                    // )
                                }}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card> */}

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        pagination
                        responsive
                        paginationServer
                        columns={Columns}
                        paginationComponent={CustomPagination}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                            />
                        }
                    />
                </div>
            </Card>
        </Fragment>

    )
}

export default ActivityTableContainer
