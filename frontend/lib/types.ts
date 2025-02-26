


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
   
  