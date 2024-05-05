export type API_User = {
  name: string;
  email: string;
  emailActivated: boolean;
};

export type API_SuccessfullAuth = {
  user: API_User;
  access_token: string;
};
