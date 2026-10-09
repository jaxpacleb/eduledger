import { ShieldCheck } from "lucide-react"
import * as Icons from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import LoginPresenter from "../presenter/LoginPresenter";
import { user_account1, user_account2, user_account3 } from "../MockData/account";


function LoginButton({ onSubmit }) {
    return (
        <button onClick={onSubmit} className='cursor-pointer bg-[#4F48B2] text text-white  px-3 py-2 rounded-md my-2'>
            LOGIN
        </button>
    )
}

function Field({ iconName, label, fieldType, linkingId, onSetUsername, onSetPassword }) {
    const Icon = Icons[iconName]

    return (
        <div className='flex flex-col my-3'>
            <label htmlFor={linkingId} className='mb-2 text-md text-black'>
                {label}
            </label>

            <div className='relative flex items-center'>
                <div className='absolute left-3 inset-y-0 flex items-center pointer-events-none text-gray-500'>
                    {Icon && <Icon size={20} strokeWidth={1.5} />}
                </div>


                <input
                    onChange={fieldType !== 'password' ? onSetUsername : onSetPassword}
                    type={fieldType}
                    id={linkingId}
                    placeholder={`Enter your ${fieldType !== 'password' ? 'username' : 'password'}`}
                    className='w-full outline-none shadow-[0_0_2px_1.5px_rgba(0,0,0,0.25)] rounded-xl lg:text-md py-1.5 pl-10 pr-3 bg-[#EDEDED]'
                />
            </div>
        </div>
    )
}


export default function Form() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [text, setText] = useState('')

    // async function submitCredentials() {
    //     LoginPresenter.login(username, password, navigate)

    // }

    function login() {
        const admin_username = user_account1.username.toLowerCase();
        const admin_password = user_account1.password.toLowerCase();

        const teacher_username = user_account2.username.toLowerCase();
        const teacher_password = user_account2.password.toLowerCase();

        const student_username = user_account3.username.toLowerCase();
        const student_password = user_account3.password.toLowerCase();



        if (admin_username === username.toLowerCase() && admin_password === password.toLowerCase()) {
            navigate('/registrar-dashboard')
        } else if (teacher_username === username.toLowerCase() && teacher_password === password.toLowerCase()) {
            navigate('/teacher-dashboard')
        } else if (student_username === username.toLowerCase() && student_password === password.toLowerCase()) {
            navigate('/student-dashboard')
        } else {
            setText('Invalid Credentials!')
        }
    }
    return (
        <div className='min-h-screen min-w-screen w-full flex flex-col'>
            <main className='flex justify-center mx-12 flex-1 items-center'>
                <div className='lg:bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.20)] rounded-xl px-8 py-8 w-100 text-black'>
                    <h1 className='tracking-widest text-[1.5rem] font-semibold '>LOGIN</h1>
                    <form onSubmit={(e) => e.preventDefault()} className='text-black flex flex-col py-3'>
                        <Field label='Username:' onSetUsername={(e) => setUsername(e.target.value)} iconName='User' fieldType='text' linkingId='text' />
                        <Field label='Password:' onSetPassword={(e) => setPassword(e.target.value)} iconName='Lock' fieldType='password' linkingId='password' />
                        <LoginButton onSubmit={login} />
                    </form>
                    <h2 className='text-black'>{text}</h2>
                </div>
            </main>
        </div>
    )
}