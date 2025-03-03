"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../../store/authStore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, isLoading, error, token , role } = useAuthStore();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();


    await login(email, password)
    if (role === 'admin') {

      router.push("../dashboard");
    }else{
      router.push("/auth/login");

    }

  };

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-green-600">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">KoraTime</h1>
        <p className="text-gray-300">Welcome! Please login</p>
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleLogin}>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">Email</label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-600 transition-colors"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">Password</label>
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-green-300 focus:outline-none focus:border-green-600 transition-colors"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
