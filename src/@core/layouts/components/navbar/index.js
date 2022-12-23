// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'

// ** Third Party Components
import { Sun, Moon, Menu } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink } from 'reactstrap'
import { useSelector } from 'react-redux'

const ThemeNavbar = props => {
  const { userData } = useSelector(state => state.AuthUserSlice)

  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' color='#7367f0' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' color='#7367f0' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      {userData !== null && <><div className='bookmark-wrapper d-flex align-items-center'>
        <ul className='navbar-nav d-xl-none'>
          <NavItem className='mobile-menu me-auto'>
            <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
              <Menu className='ficon' />
            </NavLink>
          </NavItem>
        </ul>
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div><NavbarUser skin={skin} setSkin={setSkin} /></>
      }
    </Fragment>
  )
}

export default ThemeNavbar
