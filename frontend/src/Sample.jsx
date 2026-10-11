
import { useRef } from 'react'

export default function UseRefSample() {
    const myRef = useRef(null)



    return (
        <div className='flex flex-col gap-4 w-100 h-100 justify-center items-center'>
            <h1 ref={myRef} className='text-black'>Hindi pa na-submit</h1>
            <button onClick={() => {
            myRef.current.innerText = 'Nasubmit na';
            }} className='text-black border border-black px-5 rounded-full py-1'>Submit</button>
        </div>

    )
}