import React, { Fragment, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Label, Row, Input } from 'reactstrap'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Utils
import { selectThemeColors } from '@utils'
import Select from 'react-select'

import { ChevronDown } from 'react-feather'
import { columns } from './columns'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_USER } from '../store'

const roleOptions = [
    { value: '', label: 'Select Role' },
    { value: '1', label: 'Admin' },
    { value: '2', label: 'User' }
]

const statusOptions = [
    { value: '', label: 'Select Status', number: "" },
    { value: 'active', label: 'Active', number: 1 },
    { value: 'inactive', label: 'Inactive', number: 2 }
]

// ** Table Header
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {

    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page' className='fw-bold'>Show</label>
                        <Input
                            className='mx-50 fw-bold'
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
                        <label htmlFor='rows-per-page' className='fw-bold'>Entries</label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0 fw-bold' htmlFor='search-invoice'>
                            Search:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100 fw-bold'
                            type='text'
                            value={searchTerm}
                            onChange={e => {
                                e.preventDefault()
                                handleFilter(e.target.value)
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

function TableContaineer() {
    const dispatch = useDispatch()
    const [currentRole, setCurrentRole] = useState({ value: '', label: 'Select Role' })
    const [currentStatus, setCurrentStatus] = useState({ value: '', label: 'Select Status', number: "" })
    const [currentPage, setCurrentPage] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const store = useSelector(state => state.dashboardSlice)

    // ** Get data on mount
    useEffect(() => {
        // dispatch(getAllData())
        dispatch(
            GET_ALL_USER({
                q: searchTerm,
                page: currentPage,
                perPage: rowsPerPage,
                status: currentStatus.number,
                user_type: currentRole.value
            })
        )
    }, [dispatch])

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        console.log(val)
        dispatch(
            GET_ALL_USER({
                q: val,
                page: currentPage,
                perPage: rowsPerPage,
                status: currentStatus.number,
                user_type: currentRole.value

            })
        )
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        console.log(typeof value, "value", value)
        dispatch(
            GET_ALL_USER({
                q: searchTerm,
                perPage: value,
                page: currentPage,
                status: currentStatus.number,
                user_type: currentRole.value
            })
        )
        setRowsPerPage(value)
    }

    // ** Function in get data on page change
    const handlePagination = page => {
        console.log(page)
        dispatch(
            GET_ALL_USER({
                q: searchTerm,
                perPage: rowsPerPage,
                page: page.selected,
                status: currentStatus.number,
                user_type: currentRole.value
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
        // const filters = {
        //     q: searchTerm,
        //     perPage: rowsPerPage,
        //     page: currentPage,
        //     status: currentStatus.number
        // }

        // const isFiltered = Object.keys(filters).some(function (k) {
        //     return filters[k]?.length > 0
        // })

        // if (store.allData.length > 0) {
        //     return store.allData
        // } else if (store.allData.length === 0 && isFiltered) {
        //     return []
        // } else {
        //     return store.allData.slice(0, rowsPerPage)
        // }
        return store.allData.slice(0, rowsPerPage)
    }

    return (
        <Fragment>
            <Card>
                <CardBody style={{ padding: "1rem 2rem" }}>
                    <Row>
                        <Col md='3'>
                            <CardHeader>
                                <CardTitle tag='h4'>Filters Options</CardTitle>
                            </CardHeader>
                        </Col>
                        <Col md='4'>
                            <Label for='role-select' tag='h2'>Role</Label>
                            <Select
                                isClearable={false}
                                value={currentRole}
                                options={roleOptions}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                onChange={data => {
                                    setCurrentRole(data)
                                    dispatch(
                                        GET_ALL_USER({
                                            q: searchTerm,
                                            page: currentPage,
                                            perPage: rowsPerPage,
                                            status: currentStatus.number,
                                            user_type: data.value


                                        })
                                    )
                                }}
                            />
                        </Col>
                        <Col md='4'>
                            <Label for='role-select' tag='h2'>Status</Label>
                            <Select
                                isClearable={false}
                                value={currentStatus}
                                options={statusOptions}
                                className='react-select'
                                classNamePrefix='select'
                                theme={selectThemeColors}
                                onChange={(data) => {
                                    setCurrentStatus(data)
                                    dispatch(
                                        GET_ALL_USER({
                                            q: searchTerm,
                                            page: currentPage,
                                            perPage: rowsPerPage,
                                            status: data.number,
                                            user_type: currentRole.value

                                        })
                                    )
                                }}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {/********************  Table Data ********************/}

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        // onSort={handleSort}
                        paginationComponent={CustomPagination}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        data={dataToRender()}
                        subHeaderComponent={
                            <CustomHeader
                                store={store}
                                searchTerm={searchTerm}
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                            // toggleSidebar={toggleSidebar}
                            />
                        }
                    />
                </div>
            </Card>

        </Fragment>

    )
}

export default TableContaineer
