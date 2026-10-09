
    function StudentCard({ students }) {
        return (
            students.map(prop =>
                <div className='border-2 border-[#09D6B1] rounded-md text-black flex justify-between py-3 px-3 gap-2'>
                    <span>{prop.name}</span>
                    <span>{prop.grade}</span>
                </div>)
        )
    }

function StudentListContainer({ students }) {
    return (
        <section className='h-56 w-full rounded-xl overflow-y-auto flex flex-col gap-5 border-2 py-3 px-5 border-black'>
            <StudentCard students={students}  />        
        </section>
    )
}

export default function Sample() {
    const studentsArr = [
        { name: 'John Doe', grade: 82 },
        { name: 'Jane Doe', grade: 89 },
        { name: 'San Pedro', grade: 90 },
        { name: 'San Pedro', grade: 90 },
        { name: 'San Pedro', grade: 90 },
    ]
    return (
        <div className='min-h-screen w-full flex justify-center items-center'>
            <main className='bg-card-white w-80 rounded-md py-6 px-6'>
                <h1 className='text-black font-medium justify-self-center my-3'>STUDENT LIST</h1>
                <StudentListContainer students={studentsArr} />
            </main>
        </div>
    )
}