import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { Col, Row } from 'reactstrap'
// ** Custom Components
// import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
// import { User, UserPlus, UserCheck } from 'react-feather'
import TableContaineer from './TableContainer'

function UserList() {
    const navigation = useNavigate()
    const { userData } = useSelector(state => state.AuthUserSlice)

    useEffect(() => {
        if (userData === null) {
            navigation("/login")
        }
    }, [])

    useEffect(() => {
        if (userData?.user_type === "2") {
            navigation("/home")
        }
    }, [])
    
    return (
        <div className='app-user-list'>
            {/* <Row>
                <Col lg='4' sm='6'>
                    <StatsHorizontal
                        color='primary'
                        statTitle='Total Users'
                        icon={<User size={20} />}
                        renderStats={<h3 className='fw-bolder mb-75'>21,459</h3>}
                    />
                </Col>
                <Col lg='4' sm='6'>
                    <StatsHorizontal
                        color='success'
                        statTitle='Active Users'
                        icon={<UserCheck size={20} />}
                        renderStats={<h3 className='fw-bolder mb-75'>19,860</h3>}
                    />
                </Col>
                <Col lg='4' sm='6'>
                    <StatsHorizontal
                        color='danger'
                        statTitle='Deactive Users'
                        icon={<UserPlus size={20} />}
                        renderStats={<h3 className='fw-bolder mb-75'>4,567</h3>}
                    />
                </Col>
            </Row> */}
            <TableContaineer />
        </div>
    )
}

export default UserList
