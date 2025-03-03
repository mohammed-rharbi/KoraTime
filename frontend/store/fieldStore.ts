import { create } from "zustand";
import { createField , getAllFields } from "@/api/fieldApi";
import { FieldType } from "../lib/types";




interface FieldState {
    fields: FieldType[] | null;
    field: FieldType |null;
    isLoading: boolean;
    error: string | null;
    createField: (fieldData:FieldType) => Promise<void>;
    getFields: ()=> Promise<void>;
  }
  
const useFieldStore = create<FieldState>((set)=>({

    fields: null,
    field: null,
    isLoading: false,
    error: null,
    role: null,


    createField: async (fieldData: FieldType)=>{

        set({isLoading:true , error:null });

        try{

            const res = await createField(fieldData);  
            set({field: res.newField , isLoading:false})
                        
        }catch(err){
            set({error:(err as Error).message , isLoading:false})
        }
    },

    getFields: async ()=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await getAllFields();
            set({fields: res.data , isLoading:false})
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        }
    },

}))


export default useFieldStore