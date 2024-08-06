'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {}

const Login = (props: Props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // Perform login logic here
        // Example: if login is successful, set a cookie and redirect to the dashboard
        document.cookie = 'token=your-token-here'; // Set a dummy token
        router.push('/dashboard');
    };

    return (
        <div>
            <h1>Login</h1>
        </div>
    )
}

export default Login