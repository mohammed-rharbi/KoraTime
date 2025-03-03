
export const FootballSpinner = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative h-16 w-16">

          <div className="absolute h-full w-full animate-spin-football rounded-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]">

            <div className="absolute left-1/2 top-1/2 h-[3px] w-full -translate-x-1/2 -translate-y-1/2 bg-black"></div>
            <div className="absolute left-1/2 top-1/2 h-full w-[3px] -translate-x-1/2 -translate-y-1/2 bg-black"></div>
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black"></div>
          </div>
          
          <div className="absolute -bottom-4 left-1/2 h-2 w-8 -translate-x-1/2 animate-pulse-shadow rounded-full bg-gray-400 blur-sm"></div>
        </div>
        
        <span className="text-sm font-medium text-gray-600">Loading...</span>
      </div>
    );
  };