import * as Icons from 'lucide-react';
import { UserCheck, BadgeCheck } from 'lucide-react';
import { useState } from 'react'
import { roles } from '../MockData/roles'
import DashboardHeader from '../components/DashboardHeader';


export default function StudentDashboard() {
    const { name, role } = roles[2]
    const [activePage, setActivePage] = useState('Home');

    const navItems = [
        { id: 1, label: 'Home', icon: 'House' },
        { id: 2, label: 'Grades', icon: 'Check' },
        { id: 3, label: 'Requests', icon: 'Send' },
        { id: 4, label: 'Updates', icon: 'Info' }
    ]

    function setPageView(pageView) {
        setActivePage(pageView)
    }

    

    return (
        <main className='w-full'>
            {/* name,
            role,
            onSetPage,
            onActivePage,
            navItems */}
            <DashboardHeader
                name={name}
                role={role}
                onSetPage={setPageView}
                onActivePage={activePage}
                navItems={navItems}
                lrn={109004938351}
            />



        </main>
    )
}