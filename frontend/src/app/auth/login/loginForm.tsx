"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {

      const response = await axios.post('http://localhost:3003/auth/login', {email: email , password: password});

        localStorage.setItem('token', response.data.token);

        if(response.status === 200 || 201){

            router.push('../space')
        }

        
    }catch(err) {
      console.log(err);
      setError('invalide infromations');
    }
  };

  return (
    <>

    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-green-900">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-900">KoraTime</h1>
        <p className="text-gray-600">Welcome! Please login</p>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
          type="submit"
        >
          Log In
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-green-700 hover:text-green-900 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
      </div>
      
    </>
  );
}