import { HistoryState, Link, useNavigate } from "@tanstack/react-router";
import { Mail, UserRound, Lock, EyeOff, Eye } from "lucide-react";
import { register } from "@/API/auth/register/register";
import { useMutation } from "@tanstack/react-query";
import { sideImg, mainLogo } from "@/assets";
import {
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { API_SuccessfullRegister } from "@/API/types/auth/auth";
import { LoadingState } from "@/components/custom";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { UserType } from "@/API/response_enums";

type UserDate = {
  Otp: {
    keyVal: string;
  };
} & API_SuccessfullRegister;

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address (user@xyz.com).",
    }),
    userType: z.nativeEnum(UserType),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  interface state extends HistoryState {
    from: string;
  }

  const handleSuccessfulLogin = (
    data: AxiosResponse<API_SuccessfullRegister>,
  ) => {
    const userData: UserDate = data.data as API_SuccessfullRegister;
    toast.success("Successful Sign Up");
    navigate({
      to: "/otp",
      from: "/register",
      state: {
        from: "/register",
        email: userData.user.email,
        keyVal: userData.Otp.keyVal,
      } as state,
    });
    form.reset();
  };

  const registrationMutation = useMutation({
    mutationFn: register,
    onSuccess: handleSuccessfulLogin,
    onError: () => {
      toast.error("Registration Failed");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registrationMutation.mutate(values);
  }

  return (
    <section className="flex h-screen">
      <div className="flex h-full w-full flex-col gap-y-14 py-5 pt-44 md:w-[60%] md:items-start md:justify-normal md:pt-0">
        <img
          src={mainLogo}
          alt="main-logo"
          className="ml-5 mt-5 hidden h-[6rem] w-[10rem] cursor-pointer object-cover md:block"
          onClick={() => navigate({ to: "/" })}
        />
        <div className="mx-auto flex w-[23rem] flex-col items-center justify-between">
          <div className="space-y-5 py-3 text-center lg:space-y-0">
            <h1 className="text-[2.25rem] font-medium leading-none text-[#1F1F29] lg:text-[2.5rem] lg:leading-normal">
              Sign Up
            </h1>
            <p className="text-base font-normal leading-[1.17188rem] text-secondary lg:text-xl lg:leading-8">
              Step into the world of fashion with just a Sign Up - Khoyout
              awaits!
            </p>
          </div>
          <div className="w-full pt-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-[1.5rem]"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center justify-center gap-x-0.5 rounded-[0.25rem] px-2.5 py-1 ring-2 ring-[#B1B1B1] focus-within:ring-primary">
                          <UserRound size={24} className="text-secondary" />
                          <Input
                            autoComplete="name"
                            placeholder="Full Name"
                            className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center justify-center gap-x-0.5 rounded-[0.25rem] px-2.5 py-1 ring-2 ring-[#B1B1B1] focus-within:ring-primary">
                          <Mail size={24} className="text-secondary" />
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center justify-center gap-x-0.5 rounded-[0.25rem] px-2.5 py-1 ring-2 ring-[#B1B1B1] focus-within:ring-primary">
                          <Lock size={24} className="text-secondary" />
                          <Input
                            type={showPassword.password ? "text" : "password"}
                            placeholder="Password"
                            className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            {...field}
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center justify-center gap-x-0.5 rounded-[0.25rem] px-2.5 py-1 ring-2 ring-[#B1B1B1] focus-within:ring-primary">
                          <Lock size={24} className="text-secondary" />
                          <Input
                            type={
                              showPassword.confirmPassword ? "text" : "password"
                            }
                            placeholder="Confirm Password"
                            className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            {...field}
                          />
                          <div className="cursor-pointer">
                            {showPassword.confirmPassword ? (
                              <EyeOff
                                size={24}
                                className="text-secondary"
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    confirmPassword: false,
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
                                    confirmPassword: true,
                                  })
                                }
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem className="mx-auto w-[23rem] space-y-0 pb-6 text-center">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-[3.5rem] w-full rounded-[0.5rem] border-[#B1B1B1] bg-transparent text-base transition hover:border-primary focus:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0">
                            <SelectValue placeholder="Select a User Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded">
                          {(
                            Object.keys(UserType) as Array<
                              keyof typeof UserType
                            >
                          ).map((el) => (
                            <SelectItem key={el} value={UserType[el]}>
                              {UserType[el]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className={cn(
                    "!my-0 !mt-[1.75rem] w-full rounded-2xl py-6 text-2xl font-medium",
                    registrationMutation.isPending &&
                      "cursor-not-allowed bg-primary/80",
                  )}
                  type="submit"
                  disabled={registrationMutation.isPending}
                >
                  {registrationMutation.isPending ? (
                    <>
                      <LoadingState />{" "}
                      <span className="text-xl">Signing Up...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <p className="mt-5 w-full space-x-1 text-center text-secondary">
            <span>Already have an account?</span>
            {/* to="/login"  */}
            <Link to="/login" className="font-semibold text-primary">
              Log In
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden h-full w-[40%] md:block">
        <img
          src={sideImg}
          alt="side-img"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
