import { useState } from 'react'
import { Bell, User, UserCheck, ShieldCheck, Sun, Menu } from 'lucide-react'
import * as Icons from 'lucide-react'

function Logo() {
    return (
        <aside className='flex gap-3 lg:gap-5'>
            <section className='box-border px-1.5 py-1.5 self-center  rounded-[6px] bg-icon-color lg:border-[3px] lg:p-2 lg:bg-text lg:bg-icon-color lg:rounded-[10px]'>
                <ShieldCheck
                    strokeWidth={1.5}
                    className='lg:w-12 lg:h-12 w-6 h-6 text-white'
                />
            </section>

            <section className='text-black lg:text-lg text-sm self-center'>
                <h1 className='font-bold text-sm'>EDULEDGER</h1>
                <h1 className='text-xs'>Heart of Mary High School, Inc.</h1>
            </section>
        </aside>
    )
}

function HeaderIcons() {
    return (

        <div className='flex  gap-4 lg:gap-8'>
            <Sun
                strokeWidth={1.5}
                className='text-black lg:w-8 lg:h-8 w-6.5 h-6.5 self-center'
            />

            <Bell
                strokeWidth={1.5}
                className='text-black lg:w-8 lg:h-8 w-6.5 h-6.5 self-center'
            />

            <User
                strokeWidth={1.5}
                className='text-black lg:w-8 lg:h-8 w-6.5 h-6.5 self-center'

            />
        </div>
    )
}

function ProfileCard({ name, role, visibility }) {
    return (
        <div className={`lg:flex lg:gap-12`}>
            <div className={`${visibility} lg:py-2.5 lg:px-6 lg:rounded-xl lg:bg-[#007F8A] lg:flex lg:gap-5 lg:justify-content-center lg:items-center`}>
                <div>
                    <UserCheck
                        size={30}
                        strokeWidth={1.1}
                        className='text-white'
                    />
                </div>
                <div className='text-white'>
                    <h6>{name}</h6>
                    <h6>{role}</h6>
                </div>
            </div>
        </div>
    )
}

function Button({ iconName, label, changePage, isSelected }) {
    const Icon = Icons[iconName]
    return (
        <button
            type="button"
            onClick={changePage}
            className={`${isSelected ? 'text-green-700' : ''} flex flex-col items-center justify-center text-gray-700 hover:text-black transition`}
        >
            <Icon strokeWidth={1.5} className="w-6 h-6" />
            <span className="text-xs font-medium mt-1">{label}</span>
        </button>
    )
}

function SlidingNavbar({ onToggleMode, onSetPage, onActivePage  }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-md shrink-0"
                aria-label="Open Menu"
            >
                <Menu strokeWidth={1.5} className='w-6 h-6' />
            </button>

            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            />

            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div>
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <span className="font-bold text-lg text-gray-800">Menu</span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 text-gray-500 hover:text-black rounded"
                        >
                            ✕
                        </button>
                    </div>

                    <nav className="flex flex-col gap-2 mt-4">
                        {/* fixed bottom-0 left-0 right-0 z-50 flex items-center justify-evenly bg-white border-t border-gray-200 py-3 */}
                        <Button changePage={() => onSetPage('Home')} isSelected={onActivePage == 'Home'} label='Home' iconName='House' />
                        <Button changePage={() =>onSetPage('Queue')} isSelected={onActivePage == 'Queue'} label='Queue' iconName='Logs' />
                        <Button changePage={() =>onSetPage('Grades')} isSelected={onActivePage == 'Grades'} label='Grades' iconName='SquareCheckBig' />
                        <Button changePage={() =>onSetPage('Audit')} isSelected={onActivePage == 'Audit'} label='Audit' iconName='Clock' />
                    </nav>
                </div>

                {/* Footer Link / Logout */}
                <button
                    onClick={onToggleMode}
                    className="w-full py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-semibold"
                >
                    Logout
                </button>
            </aside>
        </div>

    )
}

export default function DashboardHeader({ name, role, toggleMode, onSetPage, onActivePage }) {
    return (
        <header className='gap-3 items-center justify-between box-border border-t-2 border-gray-300 py-3 px-5 flex lg:py-5 shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.25)] lg:px-22 bg-card-white'>

            <div className='flex items-center gap-3 sm:gap-4'>
                <SlidingNavbar onSetPage={onSetPage} onActivePage={onActivePage}/>
                <Logo onToggleMode={toggleMode} />
            </div>

            <div className='flex items-center gap-3 sm:gap-6 lg:gap-10 shrink-0'>
                <ProfileCard name={name} role={role} visibility='hidden lg:block' />
                <HeaderIcons />
            </div>
        </header>
    )
}