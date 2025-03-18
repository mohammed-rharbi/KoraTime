import { create } from "zustand";
import { createField , getAllFields , updateField , deleteField , getField } from "@/api/fieldApi";
import { FieldType } from "../lib/types";




interface FieldState {
    fields: FieldType[] | null;
    field: FieldType |null;
    isLoading: boolean;
    error: string | null;
    createField: (fieldData:FieldType) => Promise<void>;
    getFields: ()=> Promise<void>;
    updateField: (id: string ,  data:any)=> Promise<void>;
    deleteField: (id: string)=> Promise<void>;
    getOneField: (id: string)=> Promise<void>;
  }
  
const useFieldStore = create<FieldState>((set)=>({

    fields: null,
    field: null,
    isLoading: false,
    error: null,


    createField: async (fieldData) => {
        set({ isLoading: true, error: null });
        try {
          const res = await createField(fieldData);
          set(state => ({
            fields: state.fields ? [...state.fields, res.newField] : [res.newField],
            field: res.newField,
            isLoading: false
          }));
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
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

    updateField: async (id , data)=>{

        set({isLoading:true , error:null}); 
        try {
            const res = await updateField(id , data);
            
        } catch (err){
            set({error:(err as Error).message , isLoading:false})            
        } finally{
            set({isLoading:false})
        }
    },


    deleteField: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await deleteField(id);
          set(state => ({
            fields: state.fields?.filter(f => f._id !== id) || null,
            field: state.field?._id === id ? null : state.field,
            isLoading: false
          }));
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
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