import React from "react";
import MainLayout from "@/components/mainLayout";
import FieldUtilization from "@/components/dashboard/panel/fieldUtilization";
import RecentActivities from "@/components/dashboard/panel/recentActivities";
import UpcomingReservations from "@/components/dashboard/panel/upcomingReservations";


export default function Dashboard() {
  return (

      <MainLayout>

     
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         

        <UpcomingReservations/>


        <FieldUtilization/>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
        <RecentActivities/>

        </div>

      </MainLayout>

);
}