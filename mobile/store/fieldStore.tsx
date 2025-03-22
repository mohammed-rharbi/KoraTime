import { create } from "zustand";
import { FieldType } from "~/types/types";
import { getField , getAllFields } from "~/api/fieldApi";



interface FieldState {
    fields: FieldType[] | null;
    field: FieldType |null;
    isLoading: boolean;
    error: string | null;
    getFields: ()=> Promise<void>;
    refresh: ()=> Promise<void>;
    getOneField: (id: string)=> Promise<void>;
  }
  
const useFieldStore = create<FieldState>((set)=>({

    fields: null,
    field: null,
    isLoading: false,
    error: null,

    
    getFields: async ()=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await getAllFields();
            set({fields: res , isLoading:false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },

    refresh: async ()=>{

        set({isLoading:true , error:null}); 

         try {
            const res = (await getAllFields()).sort(() => Math.random() - 0.5);
            
            set({fields: res , isLoading: false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }

    },

  
    getOneField: async (id)=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await getField(id);
            set({field:res , isLoading:false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },


}))


export default useFieldStore