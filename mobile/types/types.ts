


export interface LoginType {

    email: string ,
    password: string,
}

export interface RegisterType {

    userName: string,
    email: string,
    password: string
}

export type StartType = {

    id: string,
    profilePic: string,
    location: string
    phoneNumber: string
}


export interface UserType {
      _id?:string ,
      userName?:string,
      email?: string ,
      password?: string,
      phoneNumber?:string,
      location?:string,
      role?:string,
      profilePic?:string,
      isActive?:boolean,
      team?:any,
      status?:string,
      hasTeam?:boolean
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
 

      
      export interface FieldType {
        _id?: string;
        name: string;
        description: string;
        location: string;
        price: string;
        fieldManager: ManagerType;
        size: string;
        lightsAvailable: boolean;
        IsAvailable: boolean;
        status: string;
        photo: string | null;
        ratings?: rating;
        availability?: Availability[];
      }
      
 
    export interface rating {
     userId: string ,
     rating: string ,
     comment: string,
    }

    export interface AvailabilitySlot {
        startTime: string;
        endTime: string;
        isBooked: boolean;
      }
      
    export interface Availability {
        date: string;
        slots: AvailabilitySlot[];
      }


      export interface ReservationType {
        _id?:string;
        userId: string;
        fieldId: string;
        date: Date;
        startTime: string;
      }

      export interface TeamType {
        _id?:string,
        name: string ,
        logo:string,
        teamColor: string,
        captain:any,
        members?: {
          _id: string;
          name: string;
          avatar: string;
          role: string;
        }[];
        location:string,
        formation?:string,
       }