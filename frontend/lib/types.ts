


export interface UserType {
   id:string ,
   email: string ,
   password: string,
   role:string
  }

  export interface ManagerType {
    _id?:string ,
    userName:string,
    email: string ,
    password: string,
    phoneNumber:string,
    location:string,
    role?:string,
    profilePic?:string,
    isActive?:boolean,
   }

   
  export interface PlayerType {
   _id?:string ,
   userName:string,
   email: string ,
   password: string,
   phoneNumber:string,
   location:string,
   role?:string,
   profilePic?:string,
   isActive?:boolean,
   team:any,
   status:string
  }


export interface LoginType {
    user: UserType ,
    token: string,
   }
   

   export interface FieldType {
    _id?: string,
    name: string,
    description: string,
    location: string,
    fieldManger?: string,  
    price: string,
    size: string,
    lightsAvailable: boolean,
    IsAvailable: boolean,
    status: string,
    photo: string | null,
    ratings?: rating,
    availability?:any

   }

   interface rating {
    userId: string ,
    rating: string ,
    comment: string,
   }


   export interface TeamType {
    _id?:string,
    name: string ,
    logo:string,
    teamColor: string,
    captain:any,
    members?:[],
    location:string,
    formation?:string,
   }
   