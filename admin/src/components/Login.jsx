import React, { useState, useEffect } from 'react'
import axios from "axios"
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDemo, setIsDemo] = useState(false);
    const navigate=useNavigate()
    // Add useEffect to check for URL parameters
    useEffect(() => {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get('email');
        const passwordParam = params.get('password');
        const demoParam = params.get('demo');
        
        // If parameters exist, set them in the form
        if (emailParam) {
            setEmail(emailParam);
        }
        
        if (passwordParam) {
            setPassword(passwordParam);
        }
        
        if (demoParam === 'true') {
            setIsDemo(true);
            toast.info("Admin credentials auto-filled. Click Login to continue.");
        }
        
        // Clean up the URL to hide the credentials
        if (emailParam || passwordParam) {
            // Create a new URL without query parameters
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }, []);
    
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            
            if (response.data.success) {
                setToken(response.data.token);
                toast.success("Admin login successful!");
                navigate('/');
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    
    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type="email" 
                            placeholder='your@email.com' 
                            required
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type="password" 
                            placeholder='Enter Password' 
                            required
                        />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors' type='submit'>
                        Login
                    </button>
                </form>
                
                {/* Show demo message if this is a demo login */}
                {isDemo && (
                    <div className='mt-4 p-2 bg-blue-50 text-blue-700 text-sm rounded-md'>
                        <p className='text-center'>
                           
                            Click the Login button to continue.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Login