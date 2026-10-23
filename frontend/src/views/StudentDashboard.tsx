import * as Icons from 'lucide-react';
import { UserCheck, BadgeCheck } from 'lucide-react';
import { useState } from 'react'
import { roles } from '../MockData/roles'
import DashboardHeader from '../components/DashboardHeader';

type gradeReleaseStatusProps = {
    containerTitle: string;
    containerBtnInfo: string;
}

function GradeReleaseStatusContainer({ containerTitle, containerBtnInfo }: gradeReleaseStatusProps) {

    return (
        <div className='rounded-xl bg-card-white px-7 py-8 shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] my-6'>
            <header className='flex justify-between'>
                <h1 className='text-black font-semibold'>{containerTitle}</h1>
                <button className='text-blue-600 font-semibold'>{containerBtnInfo}</button>
            </header>
            <section className='flex flex-col gap-4 mt-5'>
                <ProcessContent
                    containerGradeStatus='InProgress'
                    textTitle='Teachers encode grades'
                    textDescription='Subject grades are entered and checked.'
                />
                <ProcessContent
                    containerGradeStatus='Queued'
                    textTitle='Adviser submits & locks'
                    textDescription={`R. Navarro finalizes the section's grades.`} />
                <ProcessContent
                    containerGradeStatus='Queued'
                    textTitle='Registrar audit'
                    textDescription='Reading of Forms audit by the Registrar.'
                />
                <ProcessContent
                    containerGradeStatus='Queued'
                    textTitle='Final approval'
                    textDescription='Grades are released to you.'
                />
            </section>
        </div>
    )
}

type SF10RequestProps = {
    containerTitle: string;
    containerBtnInfo: string;
}

function SF10RequestContainer({ containerTitle, containerBtnInfo }: SF10RequestProps) {
    return (
        <div className='rounded-xl bg-card-white px-7 py-8 shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] my-6'>
            <header className='flex justify-between'>
                <h1 className='text-black font-semibold'>{containerTitle}</h1>
                <button className='text-blue-600 font-semibold'>{containerBtnInfo}</button>
            </header>
            <section className='flex justify-between items-center'>
                <h1 className='text-black text-sm font-semibold '>College Transferee Request</h1>
                <span className='text-black text-sm self-center shrink-0 text-orange-700 border border-orange-700 rounded-full bg-orange-100 py-1 px-2 my-3'>Pending Verification</span>
            </section>
            <section className='flex flex-col gap-4 mt-4'>
                <ProcessContent
                    containerGradeStatus='InProgress'
                    textTitle='Request submitted'
                    textDescription={`Received by the Registrar's office`}
                />
                <ProcessContent
                    containerGradeStatus='Queued'
                    textTitle='Adviser sign-off'
                    textDescription={`Waiting for your adviser to finalize grades`}
                />
                <ProcessContent
                    containerGradeStatus='Queued'
                    textTitle='Registrar prepares SF10'
                    textDescription={`Starts after adviser sign-off`}
                />
                <ProcessContent
                    containerGradeStatus='Queued'
                    textTitle='Released'
                    textDescription='Pending release'
                />
            </section>
        </div>
    )
}

type processStatus = 'Completed' | 'InProgress' | 'Queued';

type processProps = {
    containerGradeStatus: processStatus;
    textTitle: string;
    textDescription: string;
}

function ProcessContent({ textTitle, containerGradeStatus, textDescription, }: processProps) {
    const isCompleted = containerGradeStatus === 'Completed'
    const Icon = isCompleted ? Icons.CircleCheck : Icons.CircleDot
    let statusStyle: string = ''

    switch (containerGradeStatus) {
        case 'Completed':
            statusStyle = 'text-emerald-500 bg-emerald-100/70'
            break;
        case 'InProgress':
            statusStyle = 'text-yellow-500 bg-yellow-100/70'
            break;
        case 'Queued':
            statusStyle = 'text-slate-500 bg-slate-100/70'
            break;
    }

    return (
        <section className='flex gap-3'>
            <Icon strokeWidth={1} className={`size-7 ${statusStyle} rounded-full self-center`} />
            <div>
                <h3 className='text-black font-semibold'>{textTitle}</h3>
                <p className='text-slate-600/80 text-sm'>{textDescription}</p>
            </div>
        </section>
    )
}

type studentCardProps = {
    cardTitle: string;
    cardState: string | number;
    cardInfo: string;
}

function StudentCard({ cardTitle, cardState, cardInfo }: studentCardProps) {
    return (
        <div className='bg-white rounded-md py-4 px-5 shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)]'>
            <h1 className='text-slate-500/80 font-semibold'>{cardTitle}</h1>
            <h3 className='text-black font-semibold text-xl my-1'>{cardState}</h3>
            <p className='text-slate-600/60 text-sm'>{cardInfo}</p>
        </div>
    )
}

function StudentGradesPage({ }) {
    return (
        <div>
            <header>
                <h1 className='text-black font-semibold'>My Grades</h1>
                <p className='text-slate-600/60 text-sm'>Grade 12 - STEM Diamond · S.Y. 2026-2027</p>
            </header>

            <section className='bg-card-white rounded-xl p-5 gap-3 flex'>
                <Icons.Lock className='self-start shrink-0 size-10 p-2 rounded-full text-orange-500 bg-orange-100/70 self-center' />
                <div>
                    <h1 className='text-black font-semibold'>Your report card is not available yet</h1>
                    <p className='text-slate-600/70 text-sm'>Grades are shown only after your adviser submits and locks them and the Registrar gives final approval.
                        This keeps unchecked grades from being shown.</p>
                </div>
            </section>
        </div>
    )
}

function StudentUpdatesPage({ }) {
    return (
        <div>
            <header>
                <h1 className='text-black font-semibold'>Updates</h1>
                <p className='text-slate-600/60 text-sm'>About your records and your class</p>
            </header>

            <section className='bg-card-white rounded-xl p-6 gap-3 flex my-6'>
                <Icons.Info className='self-start shrink-0 size-10 p-2 rounded-full text-orange-500 bg-orange-100/70 self-center' />
                <div>
                    <h1 className='text-black font-semibold'>Teachers encode grades</h1>
                    <p className='text-slate-600/70 text-sm'>Your grades will appear here once the Registrar gives final approval.</p>
                </div>
            </section>
        </div>
    )
}

type requirement = 'Required' | 'Optional'

type documentProps = {
    docs: string;
    requirement: requirement;
}

function Documents({ docs, requirement, }: documentProps) {
    const isRequired = requirement === 'Required'
    return (
        <main className='flex justify-between border items-center border-slate-400 rounded-md px-4 py-1.5'>
            <div className='flex flex-col'>
                <span className={`${isRequired ? 'text-red-700' : 'text-slate-600/80'} text-sm`}>{requirement}</span>
                <h1 className='text-black font-semibold shrink-0'>{docs}</h1>
            </div>

            <button className='text-black flex shrink-0 gap-2 rounded-md border border-slate-400 px-3 py-1.5 text-black'>
                <Icons.Paperclip className='size-5' />
                <span className='text-sm font-medium'>Attach</span>
            </button>
        </main>
    )
}

function StudentRequestPage({ }) {
    return (
        <div className='flex flex-col gap-7'>
            <div className='flex flex-col gap-4 bg-card-white rounded-xl shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] px-5 py-6'>
                <header className='flex flex-col gap-1'>
                    <h1 className='text-black font-semibold'>Request your SF10</h1>
                    <p className='text-slate-600/90 text-sm'>Processing takes 3 to 4 working days after your adviser signs off. Your request goes straight to the Registrar's queue.</p>
                </header>

                <section className='flex flex-col gap-3'>
                    <div className='flex gap-4'>
                        <div className='flex flex-col grow'>
                            <label htmlFor='' className='text-slate-600/70'>Purpose</label>
                            <select name='' id='' className='text-black border border-slate-400 rounded-md p-1.5 outline-none'>
                                <option value=''>College Enrollment</option>
                                <option value=''>Scholarship Application</option>
                                <option value=''>Employment</option>
                                <option value=''>Transfer to Another School</option>
                                <option value=''>Other</option>
                            </select>
                        </div>

                        <div className='flex flex-col grow'>
                            <label htmlFor='' className='text-slate-600/70'>Requested by</label>
                            <select name='' id='' className='text-black border border-slate-400 rounded-md p-1.5 outline-none'>
                                <option value=''>Self</option>
                                <option value=''>Parent</option>
                                <option value=''>Guardian</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor='suc' className='text-slate-600/70'>Send SF10 to (school, SUC or office)</label>
                        <input type='text' id='suc' className='w-full rounded-md py-2 px-4 border border-slate-400 text-slate-600' placeholder='e.g. University of Northern Philippines' />
                    </div>
                </section>

                <section>
                    <h1 className='text-slate-600/70 font-semibold'>DOCUMENTS</h1>
                    <div className='flex flex-col gap-3'>
                        <Documents docs='PSA Birth Certificate' requirement='Required' />
                        <Documents docs='JHS SF10' requirement='Required' />
                        <Documents docs='Valid ID' requirement='Optional' />
                        <button className='w-full flex justify-center gap-2 items-center bg-green-800/80 rounded-md py-4 mt-1'>
                            <Icons.Send strokeWidth={1.5} className='size-6' />
                            <span className='font-semibold'> Submit Request</span>
                        </button>
                    </div>
                </section>
            </div>

            <div className='flex flex-col gap-4 bg-card-white rounded-xl shadow-[0px_3px_10px_-3px_rgba(0,0,0,0.40)] px-5 py-6'>
                <header className='flex justify-between items-center'>
                    <h1 className='text-black font-semibold'>My requests</h1>
                    <span className='text-orange-700/90 bg-orange-100/60 border border-orange-300 py-1 px-3 rounded-full text-xs'>1 in progress</span>
                </header>

                <section className='border border-slate-400 rounded-xl px-5 py-6'>
                    <div className='flex items-center'>
                        <h1 className='text-black font-semibold'>College Transferee Request</h1>
                        <span className='shrink-0 text-orange-700/90 bg-orange-100/60 border border-orange-300 py-1 px-3 rounded-full text-xs'>Pending Verification</span>
                    </div>

                    <div className='flex flex-col gap-2 mt-3'>
                        <ProcessContent containerGradeStatus='Completed' textTitle='Request submitted' textDescription={`Received by the Registrar's office`} />
                        <ProcessContent containerGradeStatus='InProgress' textTitle='Adviser sign-off' textDescription='Waiting for your adviser to finalize grades' />
                        <ProcessContent containerGradeStatus='Queued' textTitle='Registrar prepares SF10' textDescription='Starts after adviser sign-off' />
                        <ProcessContent containerGradeStatus='Queued' textTitle='Released' textDescription='Pending release' />
                    </div>
                </section>
            </div>
        </div>
    )
}

function StudentHomePage() {
    return (
        <div>
            <section className='grid grid-cols-2 gap-4'>
                <StudentCard cardTitle='General Average' cardState='Locked' cardInfo='Visible after release' />
                <StudentCard cardTitle='Quarters graded' cardState='—' cardInfo='Hidden until release' />
                <StudentCard cardTitle='Subjects' cardState={8} cardInfo='STEM curriculum' />
                <StudentCard cardTitle='SF10 requests' cardState={1} cardInfo='1 in progress' />
            </section>

            <GradeReleaseStatusContainer containerTitle='Grade release status' containerBtnInfo='Details' />
            <SF10RequestContainer containerTitle='My SF10 request' containerBtnInfo='Track' />
        </div>
    )
}

export default function StudentDashboard() {
    const { name, role } = roles[2]
    const [activePage, setActivePage] = useState('Home');

    const navItems = [
        { id: 1, label: 'Home', icon: 'House' },
        { id: 2, label: 'Grades', icon: 'Check' },
        { id: 3, label: 'Request', icon: 'Send' },
        { id: 4, label: 'Updates', icon: 'Info' }
    ]

    function setPageView(pageView: string) {
        setActivePage(pageView)
    }

    return (
        <main className='w-full'>
            <DashboardHeader
                name={name}
                role={role}
                onSetPage={setPageView}
                onActivePage={activePage}
                navItems={navItems}
                lrn={109004938351}
            />

            <section className='p-5'>
                {activePage == 'Home' && <StudentHomePage />}
                {activePage == 'Grades' && <StudentGradesPage />}
                {activePage == 'Request' && <StudentRequestPage />}
                {activePage == 'Updates' && <StudentUpdatesPage />}
            </section>



        </main>
    )
}