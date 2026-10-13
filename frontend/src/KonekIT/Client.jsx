import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import * as Icons from 'lucide-react'

function Profile() {
    return (
        <div>

        </div>
    )
}



function Button({ label, customStyle = '', onClick }) {
    return (
        <button onClick={onClick} className={`${customStyle} rounded-md py-2 px-4`}>{label}</button>
    )
}

function Card({ firstName, lastName, picture }) {

    return (
        <div className='min-h-24 w-full bg-white text-black flex shadow-[0_0_4px_2px_rgba(0,0,0,0.20)] justify-between items-center gap-4 px-8 rounded-xl shadow-[0_0_10px_10px_rgba(0, 0, 0, 0.25)'>
            <section className='flex gap-5'>
                <div className='size-14 lg:size-16 bg-slate-400 rounded-full overflow-hidden  outline-2 outline-slate-800'>
                    <img src={picture} alt={picture} className='shrink-0' />
                </div>
                <h2 className='text-black text-sm self-center'>{`${firstName.toUpperCase()} ${lastName.toUpperCase()}`}</h2>
            </section>

            <section className='flex gap-5'>
                <Button label='Add friend' customStyle='bg-blue-800 text-white' />
                <Button label='Remove' customStyle='bg-slate-400/50 text-black' />
            </section>
        </div>
    )
}



export default function ClientSide() {
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [profiles, setProfiles] = useState([])


    const fetchData = async (pageNumber) => {
        setIsLoading(true)
        try {
            const res = await axios.get('https://17wqdt99-8000.asse.devtunnels.ms/', {
                params: {
                    page: pageNumber
                }
            })
            const { profiles } = res.data
            console.log(profiles)
            setProfiles(prev => [...prev, profiles])
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(1);
    }, [])
    
    const nextPage = (page) => {
        setPage(page)
        fetchData(page)
    }

    return (
        <div className='relative bg-slate-200 p-5  w-screen h-screen flex flex-col'>
            <section className='max-h-screen overflow-y-auto border-2 py-8 px-10 border-black flex flex-col gap-6 rounded-xl overflow-hidden'>
                {profiles.map(field =>
                    <Card firstName={field.first_name} lastName={field.last_name} gender={field.gender} picture={field.picture} />
                )}

                {isLoading && (
                    <div className='m-auto flex items-center justify-center gap-4'>
                        <div className='flex'>
                            <Icons.Loader className='animate-spin text-black ' />
                            <h1 className='text-black'>Loading Data...</h1>
                        </div>
                    </div>
                )}
            </section>
            <footer className='h-20 py-3 px-8 flex justify-center my-6 gap-20  rounded-md'>
                <Button label='PREV' onClick={() => nextPage(page - 1)} customStyle='px-6 w-1/2 text-xl bg-orange-700 rounded-md py-1 text-black border bg-white' />
                <Button label='NEXT' onClick={() => nextPage(page + 1)} customStyle='px-6 w-1/2 text-xl bg-orange-700 rounded-md py-1 text-black border bg-white' />
            </footer>

            {/* FIX THIS LATER */}

        </div>
    )
}