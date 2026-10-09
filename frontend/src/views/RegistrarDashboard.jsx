import DashboardHeader from "../components/DashboardHeader"
import { roles } from "../MockData/roles"
import * as Icons from "lucide-react"
import { useState } from "react"
import { seniorHighStructure } from '../MockData/classes'

function ProfileCard({ name, role, visibility }) {
    return (
        <div className={`${visibility} overflow-hidden rounded-md lg:rounded-xl shadow-[0_0_6.6px_1px_rgba(0,0,0,0.20)] box-border col-span-2 lg:gap-12 `} >
            <div className='flex box-border py-3 px-6   bg-[#007F8A] gap-5 lg:items-center'>
                <div className='self-center'>
                    <Icons.UserCheck
                        strokeWidth={1.1}
                        className='w-8 h-8 text-white'
                    />
                </div>
                <div className='self-center text-white'>
                    <h6>{name}</h6>
                    <h6>{role}</h6>
                </div>
            </div>
        </div>
    )
}


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

function SearchField() {
    return (
        <main className=' col-span-2 '>
            <section className='relative box-border flex items-center'>
                <Icons.Search strokeWidth={1.5} className='absolute left-3 text-black' />
                <input type="text" className='border border-black bg-card-white pl-12 py-3 text-black rounded-md w-full' placeholder='Search 12-digit LRN or Full Name' />
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
            <div className='flex flex-col gap-6'>
                <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
                <Card name='Castillo, Paolo Gabriel' lrn={109009876619} />
            </div>
        </section>
    )
}

function HomePage({ users }) {
    return (
        <>
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
        </>
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
export function RegistrarDashboard() {
    const { name, role } = roles[0]
    const [activePage, setActivePage] = useState('Home');

    const users = [
        { name: 'Adviser M. Lacson', action: 'submit' },
        { name: 'Registrar', action: 'released' },
        { name: 'Registrar', action: 'verified' }
    ]

    function setPageView(pageView) {
        setActivePage(pageView)
    }

    return (
        <main className='w-full'>
            <DashboardHeader name={name} role={role} onSetPage={setPageView} onActivePage={activePage}/>

            <section className='grid gap-x-4 gap-y-4 grid-cols-2 py-4 px-4 box-border lg:flex  lg:flex-col'>
                <ProfileCard name={name} role={role} visibility='block lg:hidden' />
                <SearchField />
                {activePage == 'Home' && <HomePage users={users} />}
                {activePage == 'Queue' && <QueuePage />}
                {activePage == 'Grades' && <GradesPage />}
                {activePage == 'Audit' && <AuditPage users={users} />}

            </section>


        </main >
    )
}