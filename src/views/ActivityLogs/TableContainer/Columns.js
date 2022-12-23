import moment from 'moment/moment'
import { Link } from 'react-router-dom'

export const Columns = [

    {
        name: "name",
        sortable: true,
        minWidth: '300px',
        sortField: 'user',
        selector: row => row.user,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                <div className='d-flex flex-column'>
                    <Link
                        to={`#`}
                        className='user_name text-truncate text-body'
                    >
                        <span className='fw-bolder'>{row.user}</span>
                    </Link>
                </div>
            </div>
        )

    },
    {
        name: "message",
        sortable: true,
        minWidth: '300px',
        sortField: 'message',
        selector: row => row.message,
        cell: row => (
            <Link
                to={`#`}
                className='user_name text-truncate text-body'
            >
                <span className='fw-bolder'>{row.message}</span>
            </Link>
        )

    },
    {
        name: "created Date",
        sortable: true,
        minWidth: '300px',
        sortField: 'createdAt',
        selector: row => row.createdAt,
        cell: row => {
            // const aaa = new Date(row.createdAt).toString()
            const ttt = moment(row.createdAt).format('DD-MM-YYYY h:mm A')
            return (
                <Link
                    to={`#`}
                    className='user_name text-truncate text-body'
                >
                    <span className='fw-bolder'>{ttt}</span>
                </Link>
            )
        }
    },
    {
        name: "log Type",
        sortable: true,
        minWidth: '300px',
        sortField: 'message',
        selector: row => row.logType,
        cell: row => (
            <Link
                to={`#`}
                className='user_name text-truncate text-body'
            >
                <span className='fw-bolder'>{row.logType === "1" ? "Login - Logout" : "Audio"}</span>
            </Link>
        )
    }


]