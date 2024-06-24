export type users = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
    secretPin?: string,
    imageName?: string,
}

export type UsersInfo = {
    id?: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    isStudent: boolean,
    title: string,
    terms: boolean

}

export type sessionType ={
  userId: string;
  email: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  imageUrl?: string;
  imageId?: string;
  role: string;
  status: string;
  firstname: string;
  lastname: string
  expiryTime: string
}

export type errorType = {
    code: string;
    config: any;
    message: string;
    name: string;
    request: {};
    response: {
      data: {
        message: string;
        error?: string;
      };
      status: number;
      statusText: string;
    };
  };

  
export type notification = {
    _id: string,
    userId: string,
    message: string,
    read: boolean,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
    
}

export type ToastState = {
  message: string;
  variant: string;
  show: boolean;
  setShow: (show: boolean) => void;
  setMessage: (message: string) => void;
  setVariant: (variant: string) => void;
};

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  // password: string;
  role: string;
  imageName?: string;
  // secretPin: string;
}

export interface Notification {
  userId: string;
  message: string;
  read: boolean;
  timestamp: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    _id: string;
    imageName?: string;
  };
}


export type PostgresUser = 
  {
   created_at: string,
   email: string,
   firstname: string,
   id: string,
   initials: null,
   lastname: string,
   password: string,
   updated_at: string
  }
 ;



 export type UserResponseProps = {
  data: {
    message: string;
    session: {
      userId: string;
      email: string;
      isstudent: boolean;
      isLoggedIn: boolean;
      firstname: string;
      lastname: string;
      isAdmin: boolean;
      role: string;
      status: string;
      expiryTime: string;
    };
  };
};


export  type UserImageProps = {
  message: string
  isSucess: boolean
  imageUrl: string
}