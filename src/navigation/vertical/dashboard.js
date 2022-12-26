import { Mail, Home, Activity, User, UserPlus, Speaker, CreditCard } from 'react-feather'

export default [
    {
        id: 'home',
        title: 'Record list',
        icon: <Home size={20} />,
        navLink: '/home'
    },
    {
        id: 'allUser',
        title: 'All User',
        icon: <User size={20} />,
        navLink: '/admin-portal'
    },
    {
        id: 'addUser',
        title: 'Add User',
        icon: <UserPlus size={20} />,
        navLink: '/add-user'
    },
    {
        id: 'activityLogs',
        title: 'Activity Logs',
        icon: <Activity size={20} />,
        navLink: '/activitylogs'
    },
    {
        id: 'ArcBilling',
        title: 'ACR Billing',
        icon: <CreditCard size={20} />,
        navLink: '/acrBilling'
    },
    {
        id: 'AddRecord',
        title: 'Add Records',
        icon: <Speaker size={20} />,
        navLink: '/addRecord'
    }

    // {
    //   id: 'secondPage',
    //   title: 'Second Page',
    //   icon: <Mail size={20} />,
    //   navLink: '/second-page'
    // }
]