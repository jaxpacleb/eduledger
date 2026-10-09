import * as Icons from 'lucide-react';
import { UserCheck, BadgeCheck } from 'lucide-react';
import { roles } from '../MockData/roles'
import StudentDashboardHeader from '../components/DashboardHeader'
import Card from '../components/Card'






function Button({ levels, currentLevel }) {

    const currentStatus = 'bg-white text-green-900 font-semibold'
    const currLevel = parseInt(currentLevel)

    function compare(level) {
        return currLevel === level;
    }

    return (
        <div className='flex gap-5 my-3'>
            {
                levels.map((level, index) =>
                (<button key={index} className={`cursor-pointer  text-sm ${compare(level) ? currentStatus : 'border'} rounded-md border border-gray-600 text-black px-3.5 py-1.5`}>
                    Grade {`${level}`}
                </button>))
            }
        </div>
    )
}

function GradeLevelSelectorContainer({ levels, label, currentLevel }) {
    return (
        <div className='my-5'>
            <span className='text-black font-semibold'>{label}</span>
            <Button levels={levels} currentLevel={currentLevel} />
        </div>
    )
}

function Header({ iconName, title }) {
    const Icon = Icons[iconName]

    return (
        <header className={`flex lg:py-1 lg:pb-4 lg:gap-5`}>
            <div>
                <Icon
                    strokeWidth={1.5}
                    className='w-8 h-8 text-gray-600' />
            </div>
            <h2 className='text-black  text-sm self-center font-medium'>{title}</h2>
        </header>
    )
}
function ProfileCard({ name, role, visibility }) {
    return (
        <div className={`${visibility} overflow-hidden rounded-md lg:rounded-xl shadow-[0_0_6.6px_1px_rgba(0,0,0,0.20)] box-border col-span-2 lg:gap-12 `} >
            <div className='flex box-border py-3 px-6   bg-[#007F8A] gap-5 lg:items-center'>
                <div className='self-center'>
                    <UserCheck
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

export default function StudentDashboard() {
    const highSchool = {
        label: ['Junior High School', 'Senior High School'],
        jhs: [7, 8, 9, 10],
        shs: [11, 12]
    }

    const { name, role } = roles[2]

    return (
        <main className='h-screen w-full flex flex-col'>
            <StudentDashboardHeader name={name} role={role} />

            <section className='grid gap-x-4 gap-y-4 w-full grid-cols-1 py-4 px-4 box-border'>
                <ProfileCard name={name} role={role} visibility='block lg:hidden' />
                <section className='grid grid-cols-2 gap-x-4 gap-y-4 lg:flex lg:justify-evenly col-span-2 lg:col-span-1'>
                    <Card title='OVERALL GRADE AVERAGE' value={91.80} iconName='TrendingUp' textColor='text-[#008B98]' fontSize='text-[1rem]' iconColor='bg-[#008B98]' />
                    <Card title='COMPUTED SCHOOL YEARS' value={`${parseInt(5)} Years Completed`} iconName='History' textColor='text-[#2F5FCB]' fontSize='text-[1rem]' iconColor='bg-[#2F5FCB]' />
                    <Card title='CURRENT STATUS' value={`GRADE ${parseInt(12)}`} iconName='GraduationCap' textColor='text-[#4F48B2]' fontSize='text-[0.9rem]' iconColor='bg-[#4F48B2]' />
                    <Card title='DOCUMENT AUTHENTICITY' value='OFFICIALLY VERIFIED' iconName='BadgeCheck' textColor='text-[#10B981]' fontSize='text-[0.9rem]' iconColor='bg-[#10B981]' />
                </section>

                <section>
                    <Header iconName='SlidersHorizontal' title='ACADEMIC LEVEL' />
                    <div className='bg-card-white rounded-md'>
                        <GradeLevelSelectorContainer levels={highSchool.jhs} label='JUNIOR HIGH SCHOOL' currentLevel={9} />
                        <GradeLevelSelectorContainer levels={highSchool.shs} label='SENIOR HIGH SCHOOL' />
                    </div>

                    <section className=''>
                        <Header iconName='ShieldCheck' title='DOCUMENT VERIFICATION' />
                        <div className='p-4 bg-white rounded-md border-l-4 border-l-green-500 shadow-sm flex flex-col gap-3'>
                            {/* Row 1: Authenticity Status */}
                            <div className='flex justify-between items-center'>
                                <span className='text-sm font-medium text-gray-600'>Authenticity</span>
                                <div className='flex items-center gap-1.5 text-green-600 font-semibold text-sm'>
                                    <BadgeCheck className='w-5 h-5 text-green-600' strokeWidth={2} />
                                    <span>Genuine DepEd Copy</span>
                                </div>
                            </div>

                            {/* Row 2: Registrar Seal */}
                            <div className='flex justify-between items-center'>
                                <span className='text-sm font-medium text-gray-600'>Registrar Seal</span>
                                <span className='text-sm font-semibold text-gray-900'>Active &amp; Locked</span>
                            </div>

                            {/* Row 3: Verified Date */}
                            <div className='flex justify-between items-center'>
                                <span className='text-sm font-medium text-gray-600'>Verified On</span>
                                <span className='text-sm text-gray-700'>Sept 12, 2026</span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <Header iconName='FileSearchCorner' title='DOCUMENT VIEWER' />
                        <div className='w-full flex bg-card-white '>
                            <div>
                                <img src="/sf10.jpg" alt="" className='h-30 w-30' />
                            </div>

                            <div className='flex gap-3 flex-col justify-center'>
                                <header>
                                    <h1 className='text-black'>SF10</h1>
                                    <h1 className='text-black'>Grade 10 - Junior High School</h1>
                                </header>
                                <button className='rounded-md text-white bg-green-700'>DOWNLOAD SF10</button>
                                <button className='rounded-md text-white bg-indigo-700'>VIEW FULL SCREEN</button>
                            </div>
                        </div>
                    </section>
                </section>
            </section>



        </main>
    )
}