'use client'
import Image from "next/image";

export const FootballSpinner = () => {
  return (
    <div className="flex flex-col items-center mt-[20%] align-center  justify-center space-y-4">
      <div className="relative h-16 w-16">

        <div className="absolute h-full w-full animate-spin-football rounded-full">

          <Image
            src="/ball.png" 
            alt="Football"
            className="h-full w-full object-cover"
            height={100}
            width={100}
          />
        </div>


        <div className="absolute -bottom-4 left-1/2 h-2 w-8 -translate-x-1/2 animate-pulse-shadow rounded-full bg-gray-400 blur-sm"></div>
      </div>

     
     
      <span className="text-sm font-medium text-gray-600">Loading...</span>
    </div>
  );
};