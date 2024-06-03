import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Input,
  Checkbox,
} from "@/components/ui";
import { mainLogo, sideImg } from "@/assets";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { API_LoginBody, login } from "@/API/auth/login/login";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { API_SuccessfullLogin } from "@/API/types/auth/auth";
import { stateSetNewAuthUser } from "@/store/features/user";
import { useDispatch } from "react-redux";
import { LoadingState } from "@/components/custom";

const formSchema = z.object({
  email: z.string().email({
    message: "Ensure that you are entering the correct email address.",
  }),
  password: z.string().min(8, {
    message: "Verify that the password is entered correctly",
  }),
  rememberMe: z.boolean().default(false).optional(),
});

export default function LoginHomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data: AxiosResponse<API_SuccessfullLogin>) => {
      const userData = data.data as API_SuccessfullLogin;
      dispatch(
        stateSetNewAuthUser({
          user: {
            user: {
              fullName: userData.user.fullName,
              email: userData.user.email,
              phone: userData.user.phone,
              emailActivated: userData.user.emailActivated,
            },
            access_token: userData.access_token,
          },
        }),
      );
      navigate({ from: "/login", to: "/" });
      toast.success("Login In Successful! Redirecting to Home Page.");
    },
    onError: () => {
      toast.error("Login Failed");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values as API_LoginBody);
  }

  return (
    <div className="flex h-screen place-items-center lg:place-items-start">
      <div className="mx-auto w-11/12 py-12 lg:w-3/5 lg:py-0">
        <img
          src={mainLogo}
          alt="main-logo"
          className="ml-5 mt-5 hidden h-[6rem] w-[10rem] cursor-pointer object-cover md:block"
          onClick={() => navigate({ to: "/" })}
        />
        <div className="flex place-items-center justify-center">
          <div className="flex w-[23rem] flex-col gap-16 text-center">
            <div>
              <p className="mb-4 text-[2.5rem] font-medium">Log In</p>
              <span className="text-lg text-secondary">
                Welcome Back to Khoyout! Please enter you email and password
              </span>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex h-12 items-center justify-center gap-x-0.5 rounded border border-input px-3 py-3 focus-within:border-primary">
                          <Mail size={24} className="text-secondary" />
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex h-12 items-center justify-center gap-x-0.5 rounded border border-input px-3 py-3 focus-within:border-primary">
                          <Lock size={24} className="text-secondary" />
                          <Input
                            type={showPassword.password ? "text" : "password"}
                            placeholder="Enter your email password"
                            {...field}
                            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                          <div className="cursor-pointer">
                            {showPassword.password ? (
                              <EyeOff
                                size={24}
                                className="text-secondary"
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    password: false,
                                  })
                                }
                              />
                            ) : (
                              <Eye
                                size={24}
                                className="text-secondary"
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    password: true,
                                  })
                                }
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex place-items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="terms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="terms"
                              className="text-sm leading-none text-secondary peer-disabled:cursor-not-allowed"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link
                            to="/forget-password"
                            className="text-xs text-primary"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button
                    type="submit"
                    className="h-14 w-full rounded-2xl text-2xl"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        {" "}
                        <LoadingState /> Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </Button>
                  <p className="mt-6 text-base font-normal text-secondary">
                    Don’t have an account?{" "}
                    <Link to="/register" className="font-semibold text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="hidden w-2/5 lg:block">
        <img
          src={sideImg}
          alt="sideImage"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

//   async () => {
//       const keyVal = await sendOTP(userData.user.email ?? email);
//       console.log("keyVal");
//       console.log(keyVal);

//       toast.success("Login In Successful! Redirecting to OTP Page.");
//       setTimeout(() => {
//         navigate({
//           from: "/login",
//           to: "/otp",
//           state: {
//             from: "/login",
//             email: userData.user.email,
//             keyVal: keyVal.data.keyVal,
//           } as state,
//         });
//       }, 1000);
//       console.log("emailActivated");
//       console.log(emailActivated);
//       console.log("email");
//       console.log(email);
//     };
