'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function StartForm() {

  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const userId = localStorage.getItem('userId') as string

  const handleNext = () => {
    if (step === 1 && !phoneNumber) {
      setError('Please enter your phone number.');
      return;
    }
    setStep(step + 1);
    setError('');
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async () => {
    if (!profilePic) {
      setError('Please upload a profile picture.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('profilPic', profilePic);
    formData.append('id', userId );
    formData.append('phoneNumber', phoneNumber);

    try {
      const response = await axios.put('http://localhost:3003/auth/start', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || 201) {
        router.push('../space');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-green-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-900">KoraTime</h1>
        <p className="text-gray-600">Complete your profile to get started!</p>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {step === 1 && (
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <div className="mt-6 flex justify-end">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Profile Picture
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setProfilePic(e.target.files[0]);
              }
            }}
            required
          />
          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Step {step} of 2
        </p>
      </div>
    </div>
  );
}