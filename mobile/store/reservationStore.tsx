import { create } from "zustand";
import { BookField , getAllUserReservations } from "~/api/reservation.api";
import { ReservationType } from "~/types/types";


interface ReservationState {
    isLoading: boolean;
    error: string | null;
    userReservations: ReservationType[] | null;
    bookIt: (bookingData:ReservationType)=> Promise<void>;
    getUserReservations: (id: string)=> Promise<void>
  }
  
const ReservationStore = create<ReservationState>((set)=>({

    isLoading: false,
    error: null,
    userReservations: null,

  
    bookIt: async (data)=>{

        set({isLoading:true , error:null}); 
        try {
            await BookField(data);
            set({isLoading:false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },

    getUserReservations: async (id)=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await getAllUserReservations(id);
            set({isLoading:false , userReservations:res})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },


}))


export default ReservationStore