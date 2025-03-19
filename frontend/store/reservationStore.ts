import { create } from "zustand";
import { ReservationType } from "../lib/types";
import { getReservations } from "@/api/reservationApi";


interface ReservationState {
    isLoading: boolean;
    error: string | null;
    reservations: ReservationType[] | null ;
    getAllReservations: ()=> Promise<void>
}
  

const useReservationStore = create<ReservationState>((set)=>({

    isLoading: false,
    error: null,
    reservations: null,


    getAllReservations: async ()=>{

        set({isLoading:true , error:null})

       try {
            const res = await getReservations()
            set({isLoading:false , reservations:res})
                
        } catch (err) {
            set({error:(err as Error).message , isLoading:false })
            
        }
    },
      
}))


export default useReservationStore