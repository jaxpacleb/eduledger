import DashboardHeader from "../components/DashboardHeader"
import { roles } from "../MockData/roles"
import * as Icons from "lucide-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { seniorHighStructure } from '../MockData/classes'
import { fieldValidator } from "../utils/fieldValidator"
import { UserAvatar } from "../utils/avatar"


function StatCard({ children, iconName, heading, value, iconBg }) {
    const Icon = Icons[iconName]
    return (
        <main className='bg-card-white shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] rounded-xl box-border px-3 py-3'>
            <section className='flex gap-4'>
                <Icon
                    strokeWidth={1.5}
                    className={`w-8 h-8 ${iconBg} shrink-0 self-center  bg-slate-100 p-1 rounded-md`} />
                <h1 className='text-black text-sm font-semibold text-gray-500 self-center'>{heading}</h1>
            </section>
            <h1 className='font-semibold text-xl text-black border-b border-slate-400 py-2'>{value}</h1>
            {children}
        </main>
    )
}

function SearchField({ placeholder }) {
    return (
        <main className='w-full col-span-2 '>
            <section className='relative box-border flex items-center'>
                <Icons.Search strokeWidth={1.5} className='absolute left-3 text-black' />
                <input type="text" className='border border-black bg-card-white pl-12 py-3 text-black rounded-md w-full' placeholder={placeholder} />
            </section>
        </main>
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

function Card({ name, lrn }) {
    return (
        <main className='rounded-xl shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] bg-card-white px-5 py-5 box-border'>
            <header className='flex items-start justify-between'>
                <section>
                    <h1 className='text-black text-md '>{name}</h1>
                    <h2 className='text-gray-500 text-sm'>LRN {lrn}</h2>
                </section>
                <span className='border border-orange-400 rounded-xl bg-red-200/30 py-1 px-3 text-sm text-black self-start'>Pending Verification</span>
            </header>

            <p className='text-black text-sm'>College Transferee Request - <span>STEM 12-Diamond</span></p>

            <section className='flex  justify-between gap-6 my-3'>
                <div className='flex flex-col'>
                    <h1 className='text-blue-400 bg-blue-200/30 rounded-xl py-1 px-3 border text-sm border-blue-400 self-start'>First Issue</h1>
                </div>

                <div className='flex flex-col'>
                    <div className='flex self-end gap-2'>
                        <Icons.Clock
                            strokeWidth={1.5}
                            className='text-black w-5 h-5 self-center'
                        />
                        <span className='text-black self-center text-sm self-center'>Day 3 of 4</span>
                    </div>
                    <div className='relative my-2 overflow-hidden rounded-full bg-slate-300/50 h-1.5 w-32'>
                        <div className='absolute h-full w-15 bg-orange-400'></div>
                    </div>
                </div>
            </section>
            <h1 className='text-black text-sm text-yellow-600 mb-4'>Advisers Grades not locked yet</h1>
            <section className='grid grid-cols-3 border-t-1 border-slate-400 pt-5'>
                <Button iconName='Paperclip' label='Attachments' />
                <Button iconName='Printer' label='Generate SF10' />
                <Button iconName='Send' label='Mark Released' />
            </section>
        </main>
    )
}

function Activity({ action, name }) {
    let Icon;
    let info;
    let iconStyle;
    switch (action) {
        case 'submit':
            Icon = Icons.Lock
            info = 'submitted & locked grades for TVL 11-B'
            iconStyle = 'border-green-600 text-green-600  bg-green-700/20'
            break;
        case 'released':
            Icon = Icons.Send
            info = 'released SF10 to Holy Angel University (LRN 109384756621)'
            iconStyle = 'border-blue-600 text-blue-600  bg-blue-700/20';
            break;
        case 'verified':
            Icon = Icons.FileCheck
            info = 'verified transferee transfer letter for LRN 101928374655'
            iconStyle = 'border-yellow-600 text-yellow-600  bg-yellow-700/20';
            break;
    }

    return (
        <div className='flex justify-between gap-3 py-4 px-5'>
            <Icon strokeWidth={1.5} className={`shrink-0 w-8 h-8 border rounded-lg p-2 self-center ${iconStyle}`} />
            <div>
                <p className='text-black text-sm'><span className='font-semibold'>{name}</span> {info}</p>
            </div>
        </div>
    )
}


function UrgentRequestList() {
    return (
        <section className="col-span-2">
            <h1 className='text-black font-semibold mb-3'>Urgent SF10 Requests</h1>
            <SearchField placeholder='Search 12-digit LRN or Full Name' />
            <div className='flex flex-col gap-6 max-h-72 min-h-100 overflow-y-auto'>
                <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
            </div>
        </section>
    )
}

function HomePage({ users }) {
    return (
        <div className='p-3'>
            <section className='grid grid-cols-2 gap-5'>
                <StatCard iconName='Users' heading='Total Enrolled Students' value='1,248' iconBg='text-gray-500'>
                    <section className='flex flex-col py-2'>
                        <div className='flex justify-between grow'>
                            <h1 className='text-gray-500'>Grade 11</h1>
                            <span className='text-black font-semibold'>642</span>
                        </div>

                        <div className='flex justify-between grow'>
                            <h1 className='text-gray-500'>Grade 12</h1>
                            <span className='text-black font-semibold'>606</span>
                        </div>
                    </section>
                </StatCard>
                <StatCard iconName='FileText' heading='Pending SF10 Requests' value={17} iconBg='text-[#D9AB23]'>
                    <section className='flex items-center text-xs  py-2'>
                        <Icons.Dot color='#D9AB23' strokeWidth={8} className='w-6 h-6 shrink-0' />
                        <span className='text-[#9C7814] font-semibold'>SLA: 3-4 Working</span>
                    </section>
                </StatCard>
                <StatCard iconName='SquareCheckBig' heading='Grade Encoding Compliance' value='88%' iconBg='text-[#27B816]'>
                    <section className='py-2'>
                        <div className='relative my-2 overflow-hidden rounded-full bg-slate-300/50 h-2 w-full'>
                            <div className='absolute h-full w-25 bg-green-700'></div>
                        </div>
                        <span className='text-gray-500 text-sm'>Submitted by advisers</span></section>
                </StatCard>
                <StatCard iconName='Repeat' heading='Active Transferees' value={37} iconBg='text-[#0DCEDE]'>
                    <section className='py-2'>
                        <div className='flex justify-between grow'>
                            <h1 className='text-gray-500 text-sm'>Transferred-In</h1>
                            <span className='text-black text-green-700 font-bold'>22</span>
                        </div>

                        <div className='flex justify-between grow'>
                            <h1 className='text-gray-500 text-sm'>Transferred-Out</h1>
                            <span className='text-red-700 font-bold'>15</span>
                        </div>
                    </section>
                </StatCard>
            </section>


            {/* HOME - WARNING SECTION */}
            <WarningContainer />

            {/* HOME - URGENT REQUEST LIST */}
            <UrgentRequestList />

            <section className='col-span-2 '>
                <h1 className='text-black font-semibold'>Recent Activity</h1>
                <section className='max-h-100 my-5 overflow-y-auto flex flex-col shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] rounded-md bg-card-white divide-y divide-slate-300'>
                    {users.map(prop =>
                        <Activity
                            name={prop.name}
                            action={prop.action}
                        />
                    )}
                </section>
            </section>
        </div>
    )
}

function QueuePageButton({ label, isActive = false, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all whitespace-nowrap ${isActive
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                }`}
        >
            {label}
        </button>
    );
}

function WarningContainer() {
    return (
        <div className='border border-red-700 rounded-xl flex col-span-2 gap-3 box-border py-3 px-3 bg-red-200/30'>
            <Icons.TriangleAlert strokeWidth={1.5} className='w-8 h-8 self-center text-red-800' />
            <p className='text-red-800 text-sm'><span className='font-semibold text-red-800'>1 section flagged</span> with missing final grades before Reading of Forms</p>
        </div>
    )
}


function SubjectCard({ track, submitCount, totalCount }) {
    return (
        <main className='flex justify-between shadow-[0_0_6.6px_1px_rgba(0,0,0,0.20)] bg-card-white rounded-xl px-5 py-3'>
            <section>
                <h1 className='text-black font-semibold'>{track}</h1>
                <p className='text-gray-500 text-sm'>{`${submitCount} of ${totalCount} submitted`}</p>
            </section>

            <Icons.ChevronDown strokeWidth={1.5} className='w-6 h-6 text-black self-center' />
        </main>
    )
}

function QueuePage() {
    return (

        <div className='col-span-2'>
            <SearchField placeholder='Search 12-digit LRN or Full Name' />
            <header className='flex items-center justify-between gap-6'>
                <div className='grow'>
                    <h1 className='text-black font-semibold'>SF10 Request & Issuance Queue</h1>
                    <p className='text-gray-500 text-sm'>6 of 6 requests</p>
                </div>

                <button className='flex items-center gap-2 px-4 py-2 bg-white border border-gray-400 rounded-md shadow-sm hover:bg-gray-50 transition shrink-0'>
                    <Icons.ScanLine strokeWidth={1.5} className='w-6 h-6 text-black' />
                    <span className='text-black text-sm'>
                        Scan SF10
                    </span>
                </button>
            </header>

            <section className="flex my-3 gap-2 text-sm overflow-x-auto no-scrollbar py-1">
                <QueuePageButton label="All" isActive={true} />
                <QueuePageButton label="Pending Verification" />
                <QueuePageButton label="Ready to Print" />
                <QueuePageButton label="Released" />
            </section>


            <section className="col-span-2">
                <h1 className=' text-black font-semibold '>Urgent SF10 Requests</h1>
                <div className='max-h-70 overflow-y-auto'>
                    <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                    <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                    <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                    <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                    <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                </div>
            </section>
        </div>
    )
}

function GradesPage() {
    return (
        <main className='flex flex-col gap-4 col-span-2'>
            <SearchField placeholder='Search 12-digit LRN or Full Name' />
            <section>
                <h1 className='text-black font-semibold'>Adviser Grade Submission Monitor</h1>
                <p className='text-gray-500 text-sm' >By Track / Strand · live from adviser dashboards</p>
            </section>

            <WarningContainer />
            <SubjectCard data={seniorHighStructure[0]} track='STEM' submitCount={3} totalCount={4} />
            <SubjectCard track='ABM' submitCount={1} totalCount={2} />
            <SubjectCard track='HUMSS' submitCount={1} totalCount={2} />
            <SubjectCard track='TVL' submitCount={2} totalCount={2} />
        </main>
    )
}

function AuditPage({ users }) {
    return (
        <main className='col-span-2'>
            <h1 className='text-black font-semibold'>Audit Trail & Verification Log</h1>
            <p className='text-gray-500 text-sm'>Shared by Adviser and Registrar</p>



            <section className='rounded-xl min-h-55  max-h-100 my-5 overflow-y-auto flex flex-col shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] rounded-md bg-card-white divide-y divide-slate-300'>
                {users.length == 0 ? (<span className='text-slate-500 m-auto'>NO ACTIONS HAVE MADE YET!</span>) : (
                    users.map(prop =>
                        <Activity
                            name={prop.name}
                            action={prop.action}
                        />
                    )
                )}
            </section>
        </main>
    )
}

// ACCOUNT CARD FOR INDIVIDUAL ADVISER
function AccountCard({ name, email = 'Unset', picture, isNewlyAdded, subject }) {

    const unSet = {
        style: 'text-red-900',
        isUnset: email == 'UNSET'
    }

    return (
        <div className='shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 divide-y-2 divide-slate-300 px-4 overflow-hidden'>
            {/* Header Section */}
            <header className='flex items-center py-4 px-3 '>
                {/* Profile Info */}
                <section className='flex items-center gap-5 min-w-0'>
                    <UserAvatar
                        fullName={name}
                        picture={picture}
                        showInitialsFallback={isNewlyAdded}
                    />

                    <div className='truncate'>
                        <h1 className='text-slate-900 font-semibold text-lg leading-tight truncate'>{name}</h1>
                        <p className={`${unSet.isUnset && unSet.style} text-slate-500 text-sm truncate`}>{email ? email : 'Email: Unset'}</p>
                        {/* FIX TOMORROW THE ADDING NEW ACCOUNT ERROR */}
                    </div>
                </section>
            </header>

            {/* Footer Section */}
            <footer className='py-3 bg-slate-50/50 flex justify-between'>
                {/* Status & Role Badges */}
                <section className='flex flex-col sm:flex-row items-start sm:items-center gap-1.5 shrink-0'>
                    <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200'>
                        Active
                    </span>
                    <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200'>
                        Adviser
                    </span>
                </section>
                <button
                    type='button'
                    className='text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 rounded-lg px-3 py-1.5 transition-colors shadow-sm'
                >
                    Reset Password
                </button>
            </footer>
        </div>
    );
}

function SlideUpPanel({ isOpen, onClose, title, children }) {
    return (
        <>
            {/* 1. Backdrop / Dimmed Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            />

            {/* 2. Sliding Panel */}
            <div
                className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl bg-white shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {/* Grab Handle */}
                <div className="flex justify-center pt-3 pb-1">
                    <div className="h-1.5 w-12 rounded-full bg-slate-300" />
                </div>

                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-3">
                    <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Panel Body  */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>
            </div>
        </>
    );
}

function SkeletonLoader() {
    return (
        <div className='shrink-0 bg-white/50 rounded-xl shadow-sm border border-slate-200 divide-y-2 divide-slate-300 px-4 overflow-hidden'>
            {/* Header Section */}
            <header className='flex items-center py-4 px-3 '>
                {/* Profile Info */}
                <section className='flex items-center gap-5 min-w-0'>
                    <img
                        className='shrink-0 size-12 rounded-full object-cover overflow-hidden bg-slate-300'
                    />
                    <div className='flex flex-col gap-2'>
                        <div className='w-40 h-4.5  rounded-full bg-slate-300 bg-slate-300'></div>
                        <div className={`w-30 h-3.5 rounded-full text-slate-300 bg-slate-300 text-sm truncate`}></div>
                    </div>
                </section>
            </header>

            {/* Footer Section */}
            <footer className='py-3 bg-slate-50/50 flex justify-between'>
                {/* Status & Role Badges */}
                <section className='flex flex-col sm:flex-row items-start sm:items-center gap-1.5 shrink-0'>
                    <span className='px-2.5 py-0.5 rounded-full text-xs bg-slate-100  text-slate-300 bg-slate-200  bg-slate-300'>
                        Active
                    </span>
                    <span className='px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-300 text-slate-300'>
                        Adviser
                    </span>
                </section>
                <button
                    type='button'
                    className='text-sm text-slate-300 font-medium bg-slate-300 bg-slate-300 border border-slate-300  rounded-lg px-3 py-1.5 '
                >
                    Reset Password
                </button>
            </footer>
        </div>
    )
}

function RegistrarForm({ onSetIsPanelOpen, onAccountCreated }) {
    const [errors, setErrors] = useState({})


    const [registrarData, setRegistrarData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        confirmPassword: ''
    })

    const insertRegistarRecord = async () => {
        const res = await axios.post(`https://17wqdt99-8000.asse.devtunnels.ms/accounts`, registrarData)
        console.log(res.data.data)
        onAccountCreated({
            name: {
                first: [registrarData.firstName, registrarData.middleName].filter(Boolean).join(' '),
                last: registrarData.lastName,
            },
            email: 'Unset',
            picture: null,
            isNewlyAdded: true,
        })
        onSetIsPanelOpen(false)
    }

    const handleRegistrarChange = (e) => {
        const { name, value } = e.target

        setRegistrarData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({
            ...prev,
            [name]: fieldValidator(name, value),
        }))
    }

    const handleRegistrarSubmit = (e) => {
        e.preventDefault()
        console.log('Adviser Form Data:', registrarData);
        insertRegistarRecord()
    }

    return (
        <div>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleRegistrarSubmit}>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                    <input
                        type="text"
                        name='firstName'
                        onChange={handleRegistrarChange}
                        value={registrarData.firstName}
                        className="w-full text-black rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                    {errors.firstName && (
                        <p className='text-red-800 font-semibold text-sm'>
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Middle Name</label>
                    <input
                        type="text"
                        name='middleName'
                        value={registrarData.middleName}
                        onChange={handleRegistrarChange}
                        className="w-full text-black rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                    {errors.middleName && (
                        <p className='text-red-800 font-semibold text-sm'>
                            {errors.middleName}
                        </p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                    <input
                        type="text"
                        name='lastName'
                        value={registrarData.lastName}
                        onChange={handleRegistrarChange}
                        className="w-full text-black rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                    {errors.lastName && (
                        <p className='text-red-800 font-semibold text-sm'>
                            {errors.lastName}
                        </p>)}
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                    <input
                        type="text"
                        name='username'
                        value={registrarData.username}
                        onChange={handleRegistrarChange}
                        className="w-full text-black rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                    {errors.username && (
                        <p className='text-red-800 font-semibold text-sm'>{errors.username}</p>
                    )}
                </div>



                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        type="text"
                        name="password"
                        // value={registrarData.password}
                        onChange={handleRegistrarChange}
                        className="w-full text-black rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                    {errors.username && (
                        <p className='text-red-800 font-semibold text-sm'>{errors.username}</p>)}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input
                        type="text"
                        name="confirmPassword"
                        value={registrarData.confirmPassword}
                        onChange={handleRegistrarChange}
                        className="w-full text-black rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                    />

                    {errors.username && (
                        <p className='text-red-800 font-semibold text-sm'>{errors.confirmPassword}</p>)}
                </div>


                <div className="flex justify-end gap-3 col-span-2 mt-4 pt-3 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => {
                            setRegistrarData({
                                firstName: '',
                                middleName: '',
                                lastName: '',
                                username: '',
                                password: '',
                                confirmPassword: ''
                            })
                            onSetIsPanelOpen(false)
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition"
                    >
                        Save Account
                    </button>
                </div>
            </form></div>
    )
}

function AdviserForm() {
    return (
        <div></div>
    )
}

function AccountPage({ accounts, onLoad, onLoadError, onAccountCreated }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Registrar')

    return (
        <div className=' flex flex-col h-full overflow-hidden '>

            {/* HEADER: Dikit agad sa DashboardHeader, hindi mag-i-scroll dahil sa shrink-0 */}
            <header className='shrink-0 flex flex-col bg-white px-6 py-3 gap-4 border-b border-gray-400'>
                <section className='flex items-center justify-between column'>
                    <div>
                        <h1 className='text-black font-semibold text-xl'>Account Manager</h1>
                        <p className='text-gray-500 text-sm'>Registrar, adviser and student sign-ins</p>
                    </div>

                    <button onClick={() => setIsPanelOpen(true)} className='flex items-center gap-2 px-4 py-2 bg-green-800 hover:bg-green-700 text-white rounded-md shadow-sm transition shrink-0'>
                        <Icons.UserPlus2 strokeWidth={1.5} className='w-5 h-5 text-white' />
                        <span className='text-sm font-semibold'>
                            Add account
                        </span>
                    </button>
                </section>
                <SearchField placeholder='Search Teacher/Adviser' />
            </header>

            {/* SCROLLABLE LIST */}
            <section className={`${onLoad && 'animate-pulse'} bg-slate-200 flex-1 overflow-y-auto max-h-screen py-5 px-4 flex flex-col gap-4`}>
                {onLoad ? <SkeletonLoader /> : accounts.map(field =>
                    <>
                        <AccountCard
                            name={[field.name.first, field.name.middle, field.name.last].filter(Boolean).join(' ')}
                            email={field.email}
                            picture={field.picture?.medium ?? field.picture}
                            isNewlyAdded={field.isNewlyAdded}
                        />
                    </>
                )}
            </section>

            <SlideUpPanel
                isOpen={isPanelOpen}
                onClose={() => setIsPanelOpen(false)}
                title="Add Account"
            >

                <nav className='flex gap-3'>
                    <button className={`${selectedRole == 'Registrar' ? 'bg-slate-800 text-white' : 'bg-white border border-black text-black'}   py-2 px-10 rounded-xl`} onClick={() => setSelectedRole('Registrar')}>Registrar</button>
                    <button className={`${selectedRole == 'Adviser' ? 'bg-slate-800 text-white' : 'bg-white border border-black text-black'}  border border-slate-800 py-2 px-10 rounded-xl`} onClick={() => setSelectedRole('Adviser')}>Adviser</button>
                </nav>

                {selectedRole == 'Registrar' ? <RegistrarForm onSetIsPanelOpen={setIsPanelOpen} onAccountCreated={onAccountCreated} /> : <AdviserForm />}
            </SlideUpPanel>
        </div>
    )
}

export function RegistrarDashboard() {
    const { name, role } = roles[0]
    const [activePage, setActivePage] = useState('Home');
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [accounts, setAccounts] = useState([])

    const users = [
        { name: 'Adviser M. Lacson', action: 'submit' },
        { name: 'Registrar', action: 'released' },
        { name: 'Registrar', action: 'verified' }
    ]

    const navItems = [
        { id: 1, label: 'Home', icon: 'House' },
        { id: 2, label: 'Queue', icon: 'Menu' },
        { id: 3, label: 'Grades', icon: 'Check' },
        { id: 4, label: 'Audit Log', icon: 'Clock' },
        { id: 5, label: 'Accounts', icon: 'User' }
    ]

    function setPageView(pageView) {
        setActivePage(pageView)
    }

    function addAccount(account) {
        setAccounts(currentAccounts => [account, ...currentAccounts])
    }

    const fetchData = async (pageNumber) => {
        try {
            setLoadError('')
            const res = await axios.get(`https://17wqdt99-8000.asse.devtunnels.ms/`)

            console.log(res.data.Message)
            setLoadError(res.data.Message)
        } catch (err) {
            console.error('Failed to load accounts:', err)
            setLoadError('Hindi ma-load ang accounts. Pakisuri ang network o API access.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(1);
    }, [])

    return (
        <main className='h-screen overflow-hidden flex flex-col bg-gray-50'>
            <DashboardHeader
                name={name}
                role={role}
                onSetPage={setPageView}
                onActivePage={activePage}
                navItems={navItems}
            />

            <div className='flex-1 overflow-hidden w-full'>
                {activePage == 'Home' && <HomePage users={users} />}
                {activePage == 'Queue' && <QueuePage />}
                {activePage == 'Grades' && <GradesPage />}
                {activePage == 'Audit Log' && <AuditPage users={users} />}
                {activePage == 'Accounts' && (
                    <AccountPage
                        accounts={accounts}
                        onLoad={isLoading}
                        onLoadError={loadError}
                        onAccountCreated={addAccount}
                    />
                )}
            </div>
        </main>
    )
}