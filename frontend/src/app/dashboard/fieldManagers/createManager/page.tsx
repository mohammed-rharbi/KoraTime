'use client'
import React, { useState } from "react";
import MainLayout from "@/components/mainLayout";
import { motion } from "framer-motion";
import FieldRulsCard from "@/components/dashboard/fields/fieldRulsCard";
import { useRouter } from "next/navigation";
import { FootballSpinner } from "@/components/ui/spinner";
import { ManagerType } from "../../../../../lib/types";
import useManagerStore from "../../../../../store/managerStore";


const CreateFieldPage = () => {
  const [formData, setFormData] = useState<ManagerType>({
    userName: '',
    email: '',
    password: '',
    location: '',
    phoneNumber:'',
  });

  const {isLoading , error , AddManager }=useManagerStore()
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      await AddManager(formData)
      if(!error){
        router.push('/dashboard/fields/fieldManagers')
      }

    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  if(isLoading){
    return <FootballSpinner/>
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Create Field Manager
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Register a new field manager with access credentials
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 lg:col-span-2"
            onSubmit={handleSubmit}
          >
            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold">Manager Details</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Full Name *</label>
                    <input
                      name="userName"
                      type="text"
                      required
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Password *</label>
                    <input
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium">Location *</label>
                    <input
                      name="location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="City, Country"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Phone Number *</label>
                    <input
                      name="phoneNumber"
                      type="text"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                      placeholder="City, Country"
                    />
                  </div>

                </div>

              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                disabled={loading}
                className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? <FootballSpinner /> : 'Create Manager'}
              </motion.button>
            </div>
          </motion.form>

          <FieldRulsCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateFieldPage;