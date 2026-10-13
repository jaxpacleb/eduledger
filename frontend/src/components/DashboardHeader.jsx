import { useState } from 'react'
import { Bell, User, UserCheck, ShieldCheck, Sun, Menu } from 'lucide-react'
import * as Icons from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
                <h1 className='font-bold'>EDULEDGER</h1>
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

function ProfileCard({ name, role, visibility, lrn }) {
    return (
        <div
            className={`${visibility} shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.25)] my-4 py-4 box-border px-3 rounded-md flex items-center justify-evenly bg-[#007F8A] text-white lg:my-1 lg:rounded-xl lg:px-6 lg:py-2`}
        >
            <div className="shrink-0">
                <UserCheck size={30} strokeWidth={1.1} className="text-white" />
            </div>

            <div className="flex flex-col leading-tight">

                <p className="text-sm font-semibold">{name}</p>
                {typeof lrn === 'number' && <p className='text-sm text-white/80'>{`LRN: ${lrn}`}</p>}
                <p className="text-sm text-white/80">{role}</p>
            </div>
        </div>
    );
}

function FooterButton({ label, customBorder, customIcon, customFont }) {
    const Icon = Icons[customIcon]

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/')}
            className={`${customBorder} ${customFont} cursor-pointer text-sm rounded-md py-3 box-border gap-2 flex items-center justify-center text-gray-700 hover:text-black transition`}
        >
            <Icon strokeWidth={1.5} className='w-6 h-6' />
            {label}
        </button>
    )
}

function Button({ iconName, label, changePage, isSelected }) {
    const Icon = Icons[iconName]
    const selectedButton = 'text-green-700 bg-black text-white';
    return (
        <button
            type="button"
            onClick={changePage}
            className={`${isSelected ? selectedButton : 'text-slate-600'} cursor-pointer rounded-md py-3 px-3 box-border gap-4 flex items-center justify-start text-gray-700 hover:text-black transition`}
        >
            <Icon strokeWidth={1.5} className="w-6 h-6" />
            <span className="text-sm font-medium mt-1">{label}</span>
        </button>
    )
}

function SlidingNavbar({ onSetPage, onActivePage, user, navItems, lrn }) {
    const [isOpen, setIsOpen] = useState(false);

    const handlePageChange = (page) => {
        onSetPage(page);
        setIsOpen(false);
    };

    return (
        <div>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="shrink-0 cursor-pointer rounded-md p-2 text-gray-700 hover:bg-gray-100"
                aria-label="Open Menu"
            >
                <Menu strokeWidth={1.5} className="h-6 w-6" />
            </button>

            {/* Backdrop */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
                    }`}
            />

            {/* Drawer */}
            <aside
                className={` fixed top-0 left-0 z-50 flex h-full w-65 flex-col justify-between bg-white px-4 py-4 shadow-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div>
                    {/* NAV HEADER */}
                    <header className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <Logo />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded p-1 text-gray-500 hover:text-black cursor-pointer"
                            aria-label="Close Menu"
                        >
                            ✕
                        </button>
                    </header>

                    <ProfileCard role={user.role} name={user.name} lrn={lrn} visibility='block lg:hidden' />

                    {/* NAV BUTTONS */}
                    <nav className="mt-4 flex flex-col">
                        <h1 className='text-slate-600 my-3'>MENU</h1>
                        {navItems.map(item =>
                            <Button
                                changePage={() => handlePageChange(item.label)}
                                isSelected={onActivePage === item.label}
                                label={item.label}
                                iconName={item.icon}
                            />
                        )
                        }
                    </nav>
                </div>

                {/* NAV FOOTER */}
                <footer className=' flex flex-col gap-3 border-t-2 border-slate-400 pt-5'>
                    <FooterButton customBorder='border border-slate-700' customIcon='Sun' label='Light Mode' customFont='border border-slate-700' />
                    <FooterButton customBorder='border border-red-700' customIcon='LogOut' label='Logout' customFont='text-red-700' />
                </footer>
            </aside>
        </div>
    );
}

export default function DashboardHeader({
    name,
    role,
    onSetPage,
    onActivePage,
    lrn,
    navItems
}) {

    return (
        <header className="sticky top-0 z-20 h-20 flex items-center justify-between gap-3 border-t-2 border-gray-300 bg-card-white px-5 py-3 border-b border-gray-200 lg:px-20 lg:py-5">
            <div className="flex items-center gap-3 sm:gap-4">
                <SlidingNavbar
                    lrn={lrn}
                    user={{ name, role }}
                    onSetPage={onSetPage}
                    onActivePage={onActivePage}
                    navItems={navItems}
                />
                <Logo />
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:gap-6 lg:gap-10">
                <ProfileCard name={name} role={role} lrn={lrn} visibility="hidden lg:block" />
                <HeaderIcons />
            </div>
        </header>
    );
}