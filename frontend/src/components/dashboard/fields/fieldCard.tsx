import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, PencilSquareIcon, TrashIcon, ChartBarIcon, ArrowsPointingOutIcon, EllipsisVerticalIcon,} from '@heroicons/react/24/outline';
import { FieldType } from '../../../../lib/types';
import useFieldStore from '../../../../store/fieldStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface FieldCardProps {
  field: FieldType;
}

export default function FieldCard({ field }: FieldCardProps) {


  const {deleteField} = useFieldStore()

  const router = useRouter()

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this field?");
    if (!isConfirmed) return;
  
    try {
      await deleteField(id);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <motion.div
      key={field._id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden dark:bg-gray-800/70"
    >
      <div className="relative h-60">

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />


        <Image className="h-full w-full bg-gray-100 animate-pulse"
         src={field.photo as string}
          alt={field.name} />


        <div className="absolute top-4 right-4">
          <button className="p-2 rounded-lg bg-gray-600 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <EllipsisVerticalIcon className="h-5 w-5 text-white" />
          </button>
        </div>


        <div className="absolute bottom-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              field.status === 'available'
                ? 'bg-green-100 text-green-800'
                : field.status === 'closed'
                ? 'bg-red-100 text-red-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {field.status}
          </span>
        </div>
      </div>


      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{field.name}</h3>
          <div className="flex items-center gap-1">
            <StarIcon className="h-5 w-5 text-amber-400" />
            <span className="font-medium">
              {field.ratings?.rating || '0'} 
            </span>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="flex items-center gap-2">
            <ArrowsPointingOutIcon className="h-5 w-5 text-gray-400" />
            {field.size}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">${field.price}</span>/hour
          </div>
          <div className="flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                field.IsAvailable ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            ></span>
            {field.IsAvailable ? 'Available' : 'Not available'}
          </div>
        </div>


        <div className="flex gap-2 border-t pt-4 dark:border-gray-700">
          
          <motion.button
            onClick={()=> router.push(`/dashboard/fields/${field._id}`)}
            whileHover={{ scale: 1.05 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
            <PencilSquareIcon className="h-4 w-4" />
            Edit
          </motion.button>

          <motion.button
            onClick={()=> handleDelete(field._id as string)}
            whileHover={{ scale: 1.05 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 dark:bg-red-900/30 dark:text-red-500"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}