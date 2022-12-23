import { Col, Row } from "reactstrap"
import PlayerComponent from "./playerContainer"
import RecorderTable from "./table"
import '@styles/react/apps/app-users.scss'
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { userData } = useSelector(state => state.AuthUserSlice)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData === null) {
            navigate("/login")
        }
    }, [userData])


    useEffect(() => {
        if (userData?.user_type === "2" || userData?.user_type === "1") {
            navigate("/home")
        }
    }, [userData])

    return (
        <div className='app-user-list'>
            {userData && <Row>
                <Col md="12">
                    <PlayerComponent />
                    <RecorderTable />
                </Col>
            </Row>}
        </div>
    )
}

export default Home