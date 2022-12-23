/* eslint-disable prefer-template */
// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '../../../../views/Authentication/store'
import { clearState } from '../../../../views/Recorder/store'

const UserDropdown = () => {
  const { userData } = useSelector(state => state.AuthUserSlice)
  const dispatch = useDispatch()
  const logOutHandle = () => {
    dispatch(LOGOUT(userData))
    dispatch(clearState())
  }
  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{userData?.first_name + " " + userData?.last_name}</span>
          <span className='user-status'>{userData?.user_type === "1" ? "Admin" : "User"}</span>
        </div>
        <Avatar img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/login' onClick={() => logOutHandle()}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
