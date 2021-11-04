import react from 'react'
import { useState } from 'react';
import { supabase } from './../utils/supabaseClient'

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true)

    const handleSignUp = async () => {
        try {
            const { user, session, error } = await supabase.auth.signUp({
                email,
                password,
            })

            if (error) throw error

            alert('Check your email to confirm sign up.')
        } catch(e) {
            alert(e.message)
        }
    }

    const handleSignIn = async () => {
        try {
            const { user, session, error } = await supabase.auth.signIn({
                email,
                password,
            })

            if (error) throw error

            alert('User logged.')
            console.log(user)
            console.log(session)
        } catch(e) {
            alert(e.message)
        }
    }

    const changeForm = () => {
        setIsSignUp(value => !value)
    }

    return (<div>
        <h1 className="text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
        <div className="sigin max-w-sm m-auto border border-gray-500 rounded p-4 mt-4">
            <div className="field">
                <label htmlFor="" className="text-gray-800 w-full block text-sm">Email</label>
                <input type="text" name="" className="p-1 border border-gray-500 w-full rounded" onChange={e => setEmail(e.target.value)} value={email}/>
            </div>
            <div className="field mt-3">
                <label htmlFor="" className="text-gray-800 w-full block text-sm">Password</label>
                <input type="password" name="" id="" className="p-1 border border-gray-500 w-full rounded"  onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            {
                isSignUp &&
                <button className="border p-2 w-full mt-5 rounded bg-black text-white" onClick={handleSignUp}>Sign Up</button>
            }

            {
                !isSignUp &&
                <button className="border p-2 w-full mt-5 rounded bg-black text-white" onClick={handleSignIn}>Sign In</button>
            }
            <a href="#" onClick={changeForm} className="text-center block text-blue-700 hover:text-blue-900">{isSignUp ? 'Do you already have an account? Sign In' : 'You are new? Sign Up'}</a>
        </div>
    </div>
    )
}