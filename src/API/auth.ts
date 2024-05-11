export type API_User = {
  fullName: string;
  email: string;
  phone: string;
  emailActivated: boolean;
};

export type API_SuccessfullRegister = {
  user: API_User;
  Otp: {
    keyVal: string;
  };
};
