export type API_User = {
  fullName: string;
  email: string;
  phone: string;
  emailActivated: boolean;
  type: string;
};

export type API_SuccessfullRegister = {
  user: API_User;
  Otp: {
    keyVal: string;
  };
};
export type API_SuccessfullLogin = {
  user: API_User;
  access_token: string;
};
