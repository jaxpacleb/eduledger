import { SquarePen, MessageSquareWarning } from 'lucide-react'
import { useState } from 'react'

function Header() {
    return (
        <header className="flex items-center justify-between w-full pb-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <SquarePen
                    strokeWidth={1.5}
                    className='w-7 h-7 sm:w-8 sm:h-8 text-gray-700'
                />
                <h2 className='text-base sm:text-lg text-gray-900 font-bold tracking-tight'>
                    GRADE EDITOR
                </h2>
            </div>
        </header>
    )
}

function SubjectCard({ subject, grade, onChange }) {
    return (
        <div className="flex items-center justify-between py-3.5 px-3">
            <span className="text-sm sm:text-base font-medium text-gray-800">
                {subject}
            </span>
            <input
                type="number"
                min="0"
                max="100"
                value={grade}
                onChange={(e) => onChange(e.target.value)}
                className="w-16 h-10 px-2 text-center font-bold text-gray-900 bg-white rounded-lg border border-gray-300 shadow-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all"
            />
        </div>
    )
}

function FeedBackContainer() {
    const [feedback, setFeedback] = useState('')
    const maxCharCount = 200

    return (
        <section className='flex flex-col gap-2.5 p-4 rounded-xl bg-gray-100 border border-gray-200 text-gray-800'>
            <header className='space-y-1'>
                <div className='flex items-center gap-2 text-orange-600 font-semibold text-sm sm:text-base'>
                    <MessageSquareWarning strokeWidth={2} className='w-5 h-5' />
                    <h3>Notice to Admin</h3>
                </div>
                <p className='text-xs sm:text-sm text-gray-600'>
                    Profile details can't be edited here. Tell the admin what needs correcting.
                </p>
            </header>
            <textarea
                rows={2}
                maxLength={maxCharCount}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your note here..."
                className='w-full p-2.5 text-sm bg-white rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400 outline-none resize-none'
            />
            <span className='self-end text-xs text-gray-500 font-mono'>
                {feedback.length}/{maxCharCount}
            </span>
        </section>
    )
}

export function GradeEditorPanel({ studentData, onClose }) {
    const [quartersList, setQuartersList] = useState(studentData?.quarters || [])
    const [selectedQuarterId, setSelectedQuarterId] = useState(studentData?.quarters?.[0]?.quarterId || '')

    const currentQuarter = quartersList.find((q) => q.quarterId === selectedQuarterId) || quartersList[0]

    const handleGradeChange = (subjectIndexToUpdate, newValue) => {
        const parsedValue = newValue === '' ? '' : Number(newValue)
        const updatedQuarters = quartersList.map((q) => {
            if (q.quarterId !== selectedQuarterId) return q

            const updatedSubjects = q.subjects.map((item, index) => {
                if (index === subjectIndexToUpdate) {
                    return { ...item, grade: parsedValue }
                }
                return item
            })

            return { ...q, subjects: updatedSubjects }
        })

        setQuartersList(updatedQuarters)
    }

    function getComputedAverage(subjectArr) {
        if (!subjectArr || subjectArr.length === 0) return 0
        const total = subjectArr.reduce((acc, curr) => acc + (Number(curr.grade) || 0), 0)
        return (total / subjectArr.length).toFixed(2)
    }

    return (
        <main className='flex flex-col w-full h-full bg-white sm:rounded-2xl overflow-hidden'>
            {/* TOP HEADER (FIXED) */}
            <div className='p-4 sm:p-6 pb-2 shrink-0'>
                <Header />
            </div>

            {/* SCROLLABLE BODY SA MOBILE AT DESKTOP */}
            <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-5'>
                {/* SELECT & GRADES CONTAINER */}
                <section className='bg-gray-50 border border-gray-200 rounded-xl p-4'>
                    <div className='flex items-center justify-between gap-3 pb-3 border-b border-gray-200'>
                        <label htmlFor='quarterSelect' className='text-sm sm:text-base font-semibold text-gray-800'>
                            Select Quarter:
                        </label>
                        <select
                            id='quarterSelect'
                            value={selectedQuarterId}
                            onChange={(e) => setSelectedQuarterId(e.target.value)}
                            className='border border-gray-300 text-sm text-black py-3 px-3 font-semibold py-1.5 rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            {quartersList.map((item) => (
                                <option key={item.quarterId} value={item.quarterId}>
                                    {item.quarterName.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* SUBJECT LIST */}
                    <div className='divide-y divide-gray-200'>
                        {currentQuarter?.subjects?.map((sub, idx) => (
                            <SubjectCard
                                key={sub.subject + idx}
                                subject={sub.subject}
                                grade={sub.grade}
                                onChange={(val) => handleGradeChange(idx, val)}
                            />
                        ))}
                    </div>

                    {/* AVERAGE */}
                    <div className='flex justify-between items-center pt-4 mt-2 border-t border-gray-300'>
                        <span className='text-gray-900 font-bold text-base sm:text-lg'>
                            General Average:
                        </span>
                        <span className='text-green-700 font-black text-lg sm:text-xl'>
                            {getComputedAverage(currentQuarter?.subjects)}
                        </span>
                    </div>
                </section>

                {/* FEEDBACK CONTAINER */}
                <FeedBackContainer />
            </div>

            {/* BOTTOM BUTTON BAR (FIXED SA ILALIM) */}
            <footer className='shrink-0 grid grid-cols-2 gap-2.5 p-4 sm:p-6 border-t border-gray-200 bg-white'>
                <button
                    type="button"
                    className='col-span-2 py-3 px-4 font-semibold text-sm sm:text-base text-white bg-green-700 hover:bg-green-800 active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer'
                >
                    Request Change
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-4 font-semibold text-sm sm:text-base text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] rounded-xl shadow-sm transition-all cursor-pointer"
                >
                    CLOSE
                </button>

                <button
                    type="button"
                    className='py-2.5 px-4 font-semibold text-sm sm:text-base text-white bg-orange-600 hover:bg-orange-700 active:scale-[0.99] rounded-xl shadow-sm transition-all cursor-pointer'
                >
                    REVERT
                </button>
            </footer>
        </main>
    )
}