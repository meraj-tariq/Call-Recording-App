// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
// import navigation from '@src/navigation/vertical'
import DashboardNav from '@src/navigation/vertical/dashboard'
import UserNav from '@src/navigation/vertical/user'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const VerticalLayout = props => {
  const [menuData, setMenuData] = useState([])
  const { userData } = useSelector(state => state.AuthUserSlice)

  // ** For ServerSide navigation
  useEffect(() => {
    if (userData?.user_type === "1") {
      setMenuData(DashboardNav)
    } else {
      setMenuData(UserNav)
    }
    // axios.get(URL).then(response => setMenuData(response.data))
  }, [])

  return (
    <Layout menuData={menuData} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
