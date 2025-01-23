'use client'

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterForm() {
    
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const formdata = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3003/auth/register', formdata);

      if (response.status === 200 || 201) {
        router.push('/auth/start');
      }
    } catch (err) {
      console.log(err);
      setError('Invalid information.');
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-green-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-900">KoraTime</h1>
        <p className="text-gray-600">Join the ultimate football platform!</p>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="text-gray-700">
        <div className="mb-6 flex gap-5">
          <label className="text-gray-700 text-sm font-bold">
            First Name
            <input
              className="w-full mt-2 px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              minLength={2}
            />
          </label>

          <label className="text-gray-700 text-sm font-bold">
            Last Name
            <input
              className="w-full mt-2 px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              minLength={2}
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
          type="submit"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-green-700 hover:text-green-900 font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}