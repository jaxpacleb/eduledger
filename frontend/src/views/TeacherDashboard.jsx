
import { roles } from "../MockData/roles"
import { useState } from 'react'
import * as Icons from 'lucide-react'
import DashboardHeader from "../components/DashboardHeader.jsx";
import * as Progress from '@radix-ui/react-progress'

// function SyncPage() {
//     return (

//     )
// }

// function RequestsPage() {
//     return (

//     )
// }

// function AuditPage() {
//     return (

//     )
// }


function WarningContainer() {
    return (
        <div className='border border-yellow-700 rounded-xl flex col-span-2 gap-3 box-border py-3 px-3 bg-yellow-100/20'>
            <Icons.TriangleAlert strokeWidth={1.5} className=' shrink-0 w-6 h-6  text-yellow-800' />
            <p className='text-yellow-800 text-sm'>
                <span className='font-semibold text-yellow-800'>Admin Notice: </span>
                Reading of Forms scheduled in 3 days. Please finalize all quarter marks.
                <span className='font-semibold text-yellow-800 m-1'>
                    2 students flagged with missing remediation grades.
                </span>
            </p>
        </div>
    )
}


function InformationalContainer() {
    return (
        <div className='border border-slate-400 rounded-xl flex col-span-2 gap-3 box-border py-3 px-3'>
            <Icons.Info strokeWidth={1.5} className='shrink-0 w-6 h-6 text-blue-800' />
            <p className='text-slate-600 text-sm'><span className='font-semibold text-black'>Role permission:</span> Grades can only be edited by the designated Class Adviser. Once locked, unlock requests must be approved by the Registrar.</p>
        </div>
    )
}

function Button({ label, iconName, customStyle }) {
    const Icon = Icons[iconName]
    return (
        <button className={`${customStyle} 
        px-3 py-3 border border-black rounded-xl flex justify-center 
        gap-3 items-center text-black`}>
            <Icon strokeWidth={1.5} className='w-6 h-6 shrink-0' />
            {label}
        </button>
    )
}

function GradesPage() {
    return (
        <>
            <WarningContainer />
            <InformationalContainer />

            <Button label='Save Draft' iconName='Save' />
            <Button label='Validate Formula Errors' iconName='Check' />
            <Button label='Scan SF10 (OCR)' customStyle='col-span-2' iconName='ScanLine' />
            <Button label='Submit to Registrar & Lock' customStyle='col-span-2 bg-green-700 text-white border-none' iconName='Lock' />

            {/*    */}

            <section className='col-span-2'>
                <header className='flex  justify-between'>
                    <h1 className='text-black text-xl font-semibold '>Grade Encoding</h1>

                    <section className='flex gap-2'>
                        <h1 className='box-border py-0.5 px-3 text-sm text-sm border border-red-700 text-red-800 bg-red-100/20 rounded-full'>1 invalid</h1>
                        <h1 className='box-border py-0.5 px-3 text-sm border border-yellow-700 text-yellow-800 bg-yellow-100/20 rounded-full'>6 incomplete</h1>
                    </section>
                </header>
                <input type="text" className='w-full border text-black border-slate-400 p-3 rounded-md bg-white' placeholder='Search student name or LRN...' />
                <section className='flex gap-3'>
                    <div className='box-border  rounded-full px-4 py-0.5 text-black border border-slate-400'>All (45)</div>
                    <div className='box-border rounded-full px-4 py-0.5 text-black border border-slate-400'>Needs Attention (6)</div>
                </section>

                <section className='min-h-60 overflow-y-auto'>

                </section>
            </section>
        </>
    )
}


function CustomProgressBar({ onCompleted, onTotal }) {
    const value = Math.round((onCompleted / onTotal) * 100)

    return (
        <div className='w-full box-border  gap-2 px-6 py-5 flex flex-col  bg-white rounded-md shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)]'>
            <div className='flex justify-between'>
                <div className="flex flex-col">
                    <p className='text-black font-semibold'>Adviser Submission:</p>
                    <p className='text-black text-sm'> {onCompleted}/{onTotal} Students Encoded</p>
                </div>
                <p className='text-black text-xl self-center'>{value}%</p>
            </div>
            <Progress.Root
                className='relative h-3 w-full overflow-hidden rounded-full bg-gray-300'
                value={value}
            >
                <Progress.Indicator
                    className={`h-full w-full bg-orange-500  transition-transform duration-500 ease-out`}
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            </Progress.Root>
        </div>
    )
}

//Continue the cards tomorrow!!!
function Card({ fullName, lrn, purpose }) {
    const isDisabled = true;
    const disabledButtonStyle = 'text-slate-300 border border-slate-300 cursor-not-allowed';

    return (
        <div className='flex-1 flex flex-col justify-between bg-white p-4 text-slate-600 rounded-xl shadow-sm '>
            <header>
                <h1 className='text-black font-semibold'>
                    {`LRN: ${lrn} • ${purpose}`}
                </h1>
                <p className='text-sm text-slate-500'>{fullName}</p>
            </header>

            <footer className='flex justify-between items-center'>
                <span className='border border-orange-300 text-orange-800 py-1 px-4 text-xs font-medium rounded-full bg-orange-200/20'>
                    Awaiting Adviser Sign-off
                </span>

                <button
                    type='button'
                    disabled={isDisabled}
                    className={`${isDisabled ? disabledButtonStyle : ''} text-sm gap-2 rounded-md py-1 px-3 flex items-center`}
                >
                    <Icons.PenLine strokeWidth={1.5} className='w-5 h-5 shrink-0' />
                    Sign off
                </button>
            </footer>
        </div>
    );
}

function SearchField() {
    return (
        <main className=' col-span-2 '>
            <section className='relative box-border flex items-center'>
                <Icons.Search strokeWidth={1.5} className='absolute left-3 text-black' />
                <input type="text" className='border border-black bg-card-white pl-12 py-2.5 text-black rounded-md w-full' placeholder='Search 12-digit LRN or Full Name' />
            </section>
        </main>
    )
}

function RequestPage() {

    const sample = [
        { name: 'Castillo, Paolo Gabriel', lrn: 109009876619, purpose: 'College Transferee Request' },
        { name: 'Garcia, Sofia Isabel', lrn: 109024691423, purpose: 'CHED Scholarship Application' },
        { name: 'Manalo, Bianca Louise', lrn: 109040740794, purpose: 'Transfer-Out to Private School' },
        { name: 'Manalo, Bianca Louise', lrn: 109040740794, purpose: 'Transfer-Out to Private School' },
        { name: 'Manalo, Bianca Louise', lrn: 109040740794, purpose: 'Transfer-Out to Private School' },
        { name: 'Manalo, Bianca Louise', lrn: 109040740794, purpose: 'Transfer-Out to Private School' },
        { name: 'Manalo, Bianca Louise', lrn: 109040740794, purpose: 'Transfer-Out to Private School' },
    ]
    return (
        <main className='relative  col-span-2 p-4'>
            <header className='sticky top-20 z-10 grid grid-cols-[1fr_auto_auto] p-3 gap-3 items-center bg-container-gray'>
                <section>
                    <h1 className='text-black font-semibold'>Quick Request Feed</h1>
                    <p className='text-slate-600 text-sm'>SF10 requests from the Registrar</p>
                </section>

                <span className='self-center w-fit text-black border border-orange-500 rounded-full px-4 text-sm py-1 text-orange-900 bg-orange-300/20'>
                    3 waiting
                </span >
                <SearchField />
            </header>

            <section className='h-full overflow-y-auto flex flex-col gap-4 py-2'>
                {sample.map((prop) => (
                    <Card
                        key={prop.lrn}
                        fullName={prop.name}
                        lrn={prop.lrn}
                        purpose={prop.purpose}
                    />
                ))}
            </section>
        </main>
    )
}

function SyncPage() {
    const completed = 42;
    const total = 45;

    return (
        <main className='col-span-2'>
            <section>
                <h1 className='text-black font-semibold'>Registrar Sync & Document Queue</h1>
                <p className='text-slate-600 text-sm'>Live status shared with the Registrar's office</p>
            </section>

            <CustomProgressBar onCompleted={completed} onTotal={total} />

            <section className='bg-white'>
                <h1 className='text-slate-600 text-sm'>SF10 ISSUANCE PRE-CLEARANCE CHECKLIST</h1>
            </section>
        </main>
    )
}

export default function TeacherDashboard() {
    const { name, role } = roles[1]
    const [activePage, setActivePage] = useState('Grades');

    function setPageView(pageView) {
        setActivePage(pageView)
    }

    const navItems = [
        { id: 1, label: 'Grades', icon: 'House' },
        { id: 2, label: 'Sync', icon: 'RefreshCw' },
        { id: 3, label: 'Requests', icon: 'File' }
    ]

    return (
        <main className='relative '>
            <DashboardHeader
                name={name}
                role={role}
                onSetPage={setPageView}
                onActivePage={activePage}
                navItems={navItems}
            />
            <section className='relative grid gap-x-4 gap-y-4 grid-cols-2 pt-0 pb-4 box-border lg:flex  lg:flex-col'>
                {activePage == 'Grades' && <GradesPage />}
                {activePage == 'Sync' && <SyncPage />}
                {activePage == 'Requests' && <RequestPage />}
            </section>
        </main >


    )
}