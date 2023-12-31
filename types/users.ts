export type users = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role?: string,
    secretPin?: string,
    imageName?: string,
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
      };
      status: number;
      statusText: string;
    };
  };