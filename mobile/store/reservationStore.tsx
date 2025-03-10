import { create } from "zustand";
import { BookField } from "~/api/reservation.api";
import { ReservationType } from "~/types/types";


interface FieldState {
    isLoading: boolean;
    error: string | null;
    bookIt: (bookingData:ReservationType)=> Promise<void>;
  }
  
const ReservationStore = create<FieldState>((set)=>({

    isLoading: false,
    error: null,

  
    bookIt: async (data)=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await BookField(data);
            set({isLoading:false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },


}))


export default ReservationStore