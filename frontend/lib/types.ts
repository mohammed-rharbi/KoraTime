


export interface UserType {
   id:string ,
   email: string ,
   password: string,
   role:string
  }

export interface LoginType {
    user: UserType ,
    token: string,
   }
   
  

   export interface FieldType {
    _id: string,
    name: string,
    description: string,
    location: string,
    fieldManger: string,  
    price: string,
    size: string,
    lightsAvailable: boolean,
    IsAvailable: boolean,
    status: string,
    photo: string | null,

   }