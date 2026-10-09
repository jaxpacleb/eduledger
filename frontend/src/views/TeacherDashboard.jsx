
import { roles } from "../MockData/roles"
import { filterSem, filterStudent } from "../MockData/filter";
import { GradeEditorPanel } from "./GradeEditorPanel.jsx";
import { studentRecords } from "../MockData/students.js";
import { UserCheck, SquareText, Search, CircleCheck, FileClock } from "lucide-react"
import * as Icons from 'lucide-react'
import { SquarePen } from 'lucide-react'
import { useState } from "react";
import TeacherDashboardHeader from '../components/DashboardHeader.jsx'
import Card from "../components/Card.jsx";
export function Button({
    label,
    iconName,
    bgColor,
    fontColor,
    borderStyle,
    onEdit,
    data
}) {
    const Icon = Icons[iconName];


    return (
        <button
            onClick={() => onEdit(data)}
            className={`lg:hover:cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg ${borderStyle} text-sm font-medium ${bgColor} ${fontColor}`}
        >
            {Icon && <Icon size={20} strokeWidth={1.5} />}
            <span className=''>{label}</span>
        </button>
    );
}



function Filter({ linkingId, label, options }) {
    return (
        <div className='flex gap-2 flex-col grow lg:flex-row lg:border-none lg:gap-7'>
            <label htmlFor={linkingId} className='text-black text-sm lg:self-center'>{label}</label>
            <select id={linkingId} className='rounded-md cursor-pointer py-3 px-3 text-white text-sm bg-[#007F8A] lg:shadow-md lg:shadow-xl/30'>
                {options.map((item, index) => (<option key={index} value={item.value}>{item.value}</option>))}
            </select>
        </div>
    )
}

function Table({ onEdit, visibility }) {

    function getStatusColor(status) {


        let color = '';

        switch (status.toLowerCase()) {
            case 'Verified and Locked'.toLowerCase():
                color = 'lg:text-[#0BA948]'
                break;

            case 'Needs Admin Seal'.toLowerCase():
                color = 'lg:text-[#F97316]'
                break;
        }
        return color;
    }

    function setIcon(status) {
        const verifiedLabel = 'Verified and Locked'

        const IconComponent = status.toLowerCase() === verifiedLabel.toLowerCase() ? CircleCheck : FileClock
        const isCircle = IconComponent === CircleCheck

        return <IconComponent
            size={20}
            fill={isCircle ? '#0BA948' : 'none'}
            color={isCircle ? 'white' : '#F97316'}
            strokeWidth={1.5}
        />
    }

    return (
        <div className={`${visibility} w-full overflow-x-auto mt-6`}>
            <table className='table-fixed w-full lg:text-black'>
                <thead>
                    <tr className='text-sm font-semibold  border-b border-slate-200'>
                        <th className='lg:px-3 lg:w-1/7 lg:py-3 lg:text-left'>LRN</th>
                        <th className='lg:w-1/7 lg:px-3 lg:py-3 lg:text-left'>STUDENT</th>
                        <th className='lg:w-1/7 lg:px-3 lg:py-3 lg:text-left'>TRACK AND STRAND</th>
                        <th className='lg:w-1/7 lg:px-3 lg:py-3 lg:text-left'>GENERAL AVERAGE</th>
                        <th className='lg:w-1/7 lg:px-3 lg:py-3 lg:text-left'>DATABASE STATUS</th>
                        <th className='lg:w-1/7 lg:px-3 lg:py-3 lg:text-left'>OFFICIAL SEAL STATUS</th>
                        <th className='lg:w-1/7 lg:px-3 lg:py-3 lg:text-center'>ACTION</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-slate-100 text-sm'>

                    {studentRecords.map(record => (
                        <tr className='hover:bg-slate-50/50 lg:transition-colors'>
                            <td className='lg:px-3 lg:py-3'>{record.lrn}</td>
                            <td className='lg:px-3 lg:py-3 '>{record.student}</td>
                            <td className='lg:px-3 lg:py-3 '>{record.trackAndStrand}</td>
                            <td className='lg:px-3 lg:py-3 '>{record.generalAverage}</td>
                            <td className='lg:px-3 lg:py-3 '>{record.databaseStatus}</td>
                            <td className={`lg:px-3 lg:py-3 lg:font-medium lg:text-sm ${getStatusColor(record.officialSealStatus)}`}>
                                <div className="flex items-center gap-2 whitespace-nowrap">
                                    {setIcon(record.officialSealStatus)}
                                    <span>{record.officialSealStatus}</span>
                                </div>
                            </td>

                            <td className='px-3 py-3 text-center'>
                                <div className='flex justify-center items-center'>
                                    <Button label='Edit' onEdit={onEdit} data={record} iconName='SquarePen' status={record.officialSealStatus} bgColor='lg:bg-[#0BA948]' fontColor='text-white' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody >
            </table>
        </div>
    );
}
function StudentCard({ onEdit, studentData, visibility }) {

    return (
        <main className={`${visibility} divide-y-2 divide-gray-400 box-border px-4 py-4 rounded-md border border-gray-400`}>
            <section className='flex flex-col'>
                <span className='text-black'>{studentData.student}</span>
                <span className='text-black'>LRN {studentData.lrn}</span>
                <span className='text-black'>{studentData.trackAndStrand}</span>
            </section>

            <section className='grid grid-cols-2 gap-2  box-border'>
                <span className='text-black'>Database: <span className='text-green-400'>{studentData.databaseStatus}</span></span>
                <span className='text-black text-green-700'>{studentData.officialSealStatus}</span>
                <button onClick={() => onEdit(studentData)} className='flex gap-3 align-center justify-center box-border  bg-gray-700 px-2 py-3 col-span-2 rounded-md'>
                    <span>
                        <SquarePen
                            strokeWidth={0.7}
                            className='w-7 h-7'
                        />
                    </span>
                    <span className='font-normal text-md self-center'>EDIT</span>
                </button>
            </section>
        </main>
    )
}

export function ListContainer({ onEdit }) {
    return (
        <main className='col-span-2 '>
            {/* 1. KULUNGAN: May flex flex-col at max-h-[85vh] para may hangganan ang taas */}
            <div className='py-3 px-4 flex flex-col max-h-[85vh] lg:py-5 lg:px-12 shadow-[0_0_6.6px_1px_rgba(0,0,0,0.20)] overflow-hidden w-full rounded-md bg-card-white'>

                {/* 2. NAKA-LOCK SA TAAS (shrink-0): Header, Search, at Filters */}
                <div className='shrink-0 flex flex-col gap-4 lg:gap-2 pb-4'>
                    <header className='flex w-full gap-3 lg:gap-5 border-b-2 lg:border-b-3 pb-3 border-b-[#7A7A7A]'>
                        <div className='self-center'>
                            <SquareText
                                strokeWidth={1.5}
                                className='lg:w-10 lg:h-10 w-8 h-8 text-[#7A7A7A]'
                            />
                        </div>
                        <h1 className='text-black text-md font-semibold lg:text-md self-center'>
                            ADVISORY CLASS RECORD & GRADE MANAGEMENT
                        </h1>
                    </header>

                    {/* SEARCH FIELD AT FILTERS */}
                    <section className='flex flex-col lg:gap-20 gap-3 lg:flex-row lg:my-3'>
                        {/* SEARCH FIELD */}
                        <div className="relative flex gap-3 items-center w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <Search
                                    strokeWidth={2}
                                    className="w-6 h-6 text-[#646464]"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Search by LRN, Name, or Grade Level"
                                className="w-full pl-12 py-3 text-black box-border text-sm bg-[#EDEDED] border border-[#7A7A7A] rounded-md lg:rounded-xl outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* FILTERS */}
                        <div className='box-border gap-5 flex flex-row lg:gap-8'>
                            <Filter linkingId='term' label='Term:' options={filterSem} />
                            <Filter linkingId='filter' label='Filter:' options={filterStudent} />
                        </div>
                    </section>
                </div>

                {/* 3. DITO ANG SCROLLBAR: flex-1 at overflow-y-auto */}
                <div className='flex-1 overflow-y-auto pr-1 space-y-3'>
                    {studentRecords.map(record => (
                        <StudentCard
                            key={record.lrn || record.id}
                            onEdit={onEdit}
                            studentData={record}
                            visibility='block lg:hidden'
                        />
                    ))}

                    <Table onEdit={onEdit} visibility='hidden lg:block' />
                </div>

            </div>
        </main>
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



function GradeEditorModal({ onClose, selectedStudent }) {
    return (
        (
            <div
                className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 sm:p-4'
                onClick={onClose}
            >
                <div
                    role='dialog'
                    aria-modal='true'
                    aria-label={`Edit grades for ${selectedStudent.student}`}
                    /* 
                       Mobile: w-full h-full (sagad sa buong screen, walang tapyas)
                       Desktop (sm:): max-w-2xl h-auto max-h-[90vh] rounded-2xl
                    */
                    className='w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl flex flex-col bg-white overflow-hidden shadow-2xl'
                    onClick={event => event.stopPropagation()}
                >
                    <GradeEditorPanel onClose={onClose} studentData={selectedStudent} />
                </div>
            </div>
        )
    )
}

export default function TeacherDashboard() {

    const [selectedStudent, setSelectedStudent] = useState(null);

    const { name, role } = roles[1]

    function handleEdit(student) {
        setSelectedStudent(student)
    }

    function onClose() {
        setSelectedStudent(null)
    }

    return (
        <div className='w-full'>
            <TeacherDashboardHeader name={name} role={role} />
            {/* lg: flex-col  lg:flex lg:gap-14  lg:py-5  */}
            <div className='grid gap-x-4 gap-y-4 grid-cols-1 py-4 px-4 box-border lg:flex  lg:flex-col'>
                <ProfileCard name={name} role={role} visibility='block lg:hidden' />
                <div className='grid grid-cols-2 gap-x-4 gap-y-4 lg:flex lg:justify-evenly col-span-2'>
                    <Card title='TOTAL STUDENTS' value={studentRecords.length} iconName='UsersRound' textColor='text-[#008B98]' fontSize='text-[1.3rem]' iconColor='bg-[#008B98]' />
                    <Card title='VERIFIED OFFICIAL RECORDS' value={3} iconName='Check' textColor='text-[#10B981]' fontSize='text-[1.3rem]' iconColor='bg-[#10B981]' />
                    <Card title='MODIFIED GRADES' value={1} iconName='SquarePen' textColor='text-[#4F48B2]' fontSize='text-[1.3rem]' iconColor='bg-[#4F48B2]' />
                    <Card title='PENDING ADMIN SEAL' value={1} iconName='Flag' textColor='text-[#F97316]' fontSize='text-[1.3rem]' iconColor='bg-[#F97316]' />
                </div>
                <ListContainer onEdit={handleEdit} />
            </div>

            {selectedStudent && <GradeEditorModal onClose={onClose} selectedStudent={selectedStudent} />}
        </div>
    )
}