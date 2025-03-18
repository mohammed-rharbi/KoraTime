'use client'
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/mainLayout";
import { motion } from "framer-motion";
import { PhotoIcon, CurrencyDollarIcon, MapPinIcon, UserGroupIcon, SunIcon, CheckCircleIcon, ShieldCheckIcon} from "@heroicons/react/24/outline";
import FieldRulsCard from "@/components/dashboard/fields/fieldRulsCard";
import useFieldStore from "../../../../../store/fieldStore";
import { FieldType } from "../../../../../lib/types";
import { uploadImageToBackend } from "../../../../../lib/Minio";
import { useRouter, useParams } from "next/navigation";
import useManagerStore from "../../../../../store/managerStore";
import Image from "next/image";

const EditFieldPage = () => {
  const { id: fieldId } = useParams();
  const {getManagers, fieldManagers} = useManagerStore();
  const [uploading, setUploading] = useState(false);
  const {  error, field, createField, getOneField, updateField } = useFieldStore();
  const router = useRouter();

  const [formData, setFormData] = useState<FieldType>({
    name: '',
    description: '',
    size: '',
    price: '',
    fieldManger: '',
    location: '',
    status: 'available',
    lightsAvailable: true,
    IsAvailable: true,
    photo: '',
  });

  useEffect(() => {
    getManagers();
    if (fieldId) {
      getOneField(fieldId as string);
    }
  }, [fieldId, getManagers, getOneField]);

  useEffect(() => {
    if (fieldId && field) {
      setFormData({
        name: field.name,
        description: field.description,
        size: field.size,
        price: field.price,
        fieldManger: field.fieldManger,
        location: field.location,
        status: field.status,
        lightsAvailable: field.lightsAvailable,
        IsAvailable: field.IsAvailable,
        photo: field.photo,
      });
    }
  }, [field, fieldId]);

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = async (event) => {
          const dataUrl = event.target?.result as string;
          const imageUrl = await uploadImageToBackend(dataUrl);
          setFormData(prev => ({ ...prev, photo: imageUrl }));
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Image upload failed:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price) {
      console.error('Missing required fields');
      return;
    }
  
    const submissionData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      size: formData.size,
      location: formData.location,
      status: formData.status,
      lightsAvailable: formData.lightsAvailable,
      IsAvailable: formData.IsAvailable,
      fieldManger: formData.fieldManger,
      photo: formData.photo,
    };

    try {
      if (fieldId) {
        await updateField(fieldId as string, submissionData);
      } else {
        await createField(submissionData);
      }
      
      if (!error) {
        router.push('/dashboard/fields');
      }
    } catch (error) {
      console.error('Error saving field:', error);
    }
  };



  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {fieldId ? 'Edit Field' : 'Create New Field'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {fieldId ? 'Update your football field details' : 'Set up your football field with detailed specifications'}
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

                          <h2 className="mb-6 text-xl font-semibold">Basic Information</h2>
                          <div className="space-y-4">
                            <div>
                              <label className="mb-2 block text-sm font-medium">Field Name *</label>
                              <input
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                placeholder="Enter field name"
                              />
                            </div>
            
                            <div>
                              <label className="mb-2 block text-sm font-medium">Description *</label>
                              <textarea
                                name="description"
                                rows={4}
                                required
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full rounded-lg border bg-gray-50 px-4 py-3 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                placeholder="Describe your field..."
                              />
                            </div>
                          </div>
                        </div>
            
                
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                          <h2 className="mb-6 text-xl font-semibold">Field Managers</h2>
                   
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50">
                                <UserGroupIcon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Field Manager *</label>
                                <select
                                  name="fieldManger"
                                  required
                                  value={formData.fieldManger}
                                  onChange={handleInputChange}
                                  className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                >
                                  <option value="">Select Manager</option>
                                  {fieldManagers?.map((manager) => (
                                    <option key={manager._id} value={manager._id}>
                                      {manager.userName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                        </div>
            
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                          <h2 className="mb-6 text-xl font-semibold">Specifications</h2>
                          <div className="grid gap-4 sm:grid-cols-2">
            
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
                                <UserGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Field Size *</label>
                                <select 
                                  name="size"
                                  required
                                  value={formData.size}
                                  onChange={handleInputChange}
                                  className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                >
                                  <option value="5v5">5v5</option>
                                  <option value="7v7">7v7</option>
                                  <option value="11v11">11v11</option>
                                </select>
                              </div>
                            </div>
            
            
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                                <CurrencyDollarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Price *</label>
                                <input
                                  name="price"
                                  type="text"
                                  required
                                  value={formData.price}
                                  onChange={handleInputChange}
                                  className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                  placeholder="Enter price"
                                />
                              </div>
                            </div>
            
            
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
                                <MapPinIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Location</label>
                                <input
                                  name="location"
                                  type="text"
                                  value={formData.location}
                                  onChange={handleInputChange}
                                  className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                  placeholder="Enter address"
                                />
                              </div>
                            </div>
            
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                                <ShieldCheckIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Status</label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  className="w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700"
                                >
                                  <option value="available">Available</option>
                                  <option value="closed">Closed</option>
                                  <option value="under maintenance">Under Maintenance</option>
                                </select>
                              </div>
                            </div>
            
            
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
                                <SunIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Lights Available</label>
                                <input
                                  name="lightsAvailable"
                                  type="checkbox"
                                  checked={formData.lightsAvailable}
                                  onChange={handleInputChange}
                                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                              </div>
                            </div>
            
            
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
                                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                              </div>
                              <div className="flex-1">
                                <label className="mb-1 block text-sm font-medium">Is Available</label>
                                <input
                                  name="isAvailable"
                                  type="checkbox"
                                  checked={formData.IsAvailable}
                                  onChange={handleInputChange}
                                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
            
            
                        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h2 className="mb-6 text-xl font-semibold">Field Images</h2>
                          <div className="flex flex-wrap gap-4">
                            <label className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-indigo-500 hover:bg-indigo-50 dark:border-gray-600 dark:bg-gray-700">
                              {formData.photo ? (
                                <Image 
                                  src={formData.photo} 
                                  alt="Field preview" 
                                  className="h-full w-full rounded-lg object-cover"
                                />
                              ) : (
                                <PhotoIcon className="h-8 w-8 text-gray-400" />
                              )}
                              <input 
                                name="photo"
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleImagePick}
                                disabled={uploading}
                              />
                              {uploading && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                                </div>
                              )}
                            </label>
                          </div>
                        </div>


            <div className="flex gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700">
                {fieldId ? 'Update Field' : 'Publish Field'}
              </motion.button>
            </div>
          </motion.form>

          <FieldRulsCard />
        </div>
      </div>
    </MainLayout>
  );
};

export default EditFieldPage;