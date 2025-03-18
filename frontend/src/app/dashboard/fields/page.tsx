'use client'
import React, { useEffect } from "react";
import MainLayout from "@/components/mainLayout";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircleIcon, ChartBarIcon} from "@heroicons/react/24/outline";
import FieldCard from "@/components/dashboard/fields/fieldCard";
import { redirect } from "next/navigation";
import useFieldStore from "../../../../store/fieldStore";



const Fields = () => {


  const {getFields , fields , isLoading }= useFieldStore()


  const stats = [
    { title: "Total Fields", value: fields?.length, trend: "+12%", color: "bg-indigo-500" },
    { title: "Active Bookings", value: "86", trend: "+24%", color: "bg-emerald-500" },
    { title: "Weekly Revenue", value: "$4,230", trend: "+18%", color: "bg-amber-500" },
  ];


  useEffect(()=>{

    getFields()

  },[getFields])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="p-8 bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen dark:from-gray-900 dark:to-gray-800">

        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 p-8 text-white shadow-2xl">
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              <div className="f lex items-center gap-4">

                <div>
                  <h1 className="text-4xl font-bold">Field Management</h1>
                  <p className="mt-2 text-white/90">Optimize your football facilities with real-time control</p>
                </div>

              </div>
            </motion.div>
          </div>
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30" />
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-xl p-6 shadow-lg dark:bg-gray-800"
            >
              <div className={`absolute top-0 right-0 h-full w-1 ${stat.color}`} />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm">
                  ↗ {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>


        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder=" "
                className="w-full peer rounded-xl bg-white/70 backdrop-blur-lg px-4 py-3 shadow-sm border-0 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800/70 dark:ring-gray-700"
              />
              <label className="absolute top-3 left-4 text-gray-400 transition-all peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 -translate-y-6 text-sm">
                Search fields...
              </label>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] dark:bg-gray-800/70">
              <ChartBarIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          <motion.button 
            onClick={()=> redirect('/dashboard/fields/createField')}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>New Field</span>
          </motion.button>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {fields?.map((field) => (


                <FieldCard key={field._id} field={field} />

            ))}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
};

export default Fields;