// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'
import { Archive, Edit2, FileText, MoreVertical, Settings, Slack, Trash2 } from 'react-feather'
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { DELETE_USER, UPDATE_USER_STATUS } from '../store'

// ** Store & Actions
import { store } from '@store/store'

// ** Renders Role Columns
const renderRole = row => {
    const roleObj = {
        2: {
            class: 'text-warning',
            icon: Settings
        },
        1: {
            class: 'text-danger',
            icon: Slack
        }
    }

    const Icon = roleObj[row.user_type] ? roleObj[row.user_type].icon : Edit2

    return (
        <span className='text-truncate text-capitalize align-middle'>
            <Icon size={18} className={`${roleObj[row.user_type] ? roleObj[row.user_type].class : ''} me-50`} />
            {row.user_type === "1" ? "Admin" : "User"}
        </span>
    )
}

const statusObj = {
    1: 'light-success',
    2: 'light-secondary'
}
// ** Renders Client Columns
const renderClient = row => {
    return (
        <Avatar
            initials
            className='me-1'
            color={'light-primary'}
            content={row.first_name}
        />
    )
}
export const columns = [
    {
        name: 'User',
        sortable: true,
        minWidth: '300px',
        sortField: 'first_name',
        selector: row => row.first_name,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                {renderClient(row)}
                <div className='d-flex flex-column'>
                    <Link
                        to={`#`}
                        className='user_name text-truncate text-body'
                    // onClick={() => store.dispatch(getUser(row.id))}
                    >
                        <span className='fw-bolder'>{row.first_name}</span>
                    </Link>
                    <small className='text-truncate text-muted mb-0'>{row.email}</small>
                </div>
            </div>
        )
    },
    {
        name: 'Role',
        sortable: true,
        minWidth: '172px',
        sortField: 'user_type',
        selector: row => row.user_type,
        cell: row => renderRole(row)
    },
    {
        name: 'Status',
        minWidth: '138px',
        sortable: true,
        sortField: 'status',
        selector: row => row.status,
        cell: row => (
            <Badge className='text-capitalize' color={statusObj[row.status]} pill>
                {row.status === 1 ? "Active" : "Inactive"}
            </Badge>
        )
    },
    {
        name: 'Actions',
        minWidth: '100px',
        cell: row => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer' />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag={Link}
                            className='w-100'
                            to={`#`}
                            onClick={() => store.dispatch(UPDATE_USER_STATUS({ user_id: row.user_id, status: row.status === 1 ? 2 : 1 }))}
                        >
                            <FileText size={14} className='me-50' />
                            <span className='align-middle'>{row.status === 1 ? "Inactive" : "Active"}</span>
                        </DropdownItem>
                        {/* <DropdownItem tag='a'
                            href='#' className='w-100'
                            onClick={e => e.preventDefault()}>
                            <Archive size={14} className='me-50' />
                            <span className='align-middle'>Edit</span>
                        </DropdownItem> */}
                        <DropdownItem
                            tag='a'
                            href='/'
                            className='w-100'
                            onClick={e => {
                                e.preventDefault()
                                store.dispatch(DELETE_USER(row.user_id))
                            }}
                        >
                            <Trash2 size={14} className='me-50' />
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
]