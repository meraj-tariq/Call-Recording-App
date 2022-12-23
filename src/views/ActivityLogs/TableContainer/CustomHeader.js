
import React from "react"
import { Col, Input, Label, Row } from "reactstrap"
// ** Utils
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page' className="fw-bold">Show</label>
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
                        <label htmlFor='rows-per-page' className="fw-bold">Entries</label>
                    </div>
                </Col>

                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0 fw-bold' htmlFor='search-invoice' >
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
export default CustomHeader