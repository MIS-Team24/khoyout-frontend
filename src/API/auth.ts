export type API_User = {
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
};

export type API_SuccessfullAuth = {
  user: API_User;
  otp: {
    keyVal: string;
  };
};
