import { SystemAPIError } from "@/API/APIError";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { HistoryState } from "@tanstack/react-router";
import { useRouterState } from "@tanstack/react-router";
import { verifyEmail } from "@/API/register/register";
import { validateOTP, sendOTP } from "@/API/OTP/OTP";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  FormMessage,
} from "@/components/ui";
import toast from "react-hot-toast";
import { mainLogo, sideImg } from "@/assets";
import { useNavigate } from "@tanstack/react-router";
import { LoadingState } from "@/components/custom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";

interface state extends HistoryState {
  from: string;
  email: string;
  keyVal: string;
}

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Please enter a valid OTP code.",
  }),
});

export default function OTP() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const selected = useRouterState({
    select: (state) => state.location.state as state,
  });

  function comingFromRoute() {
    if (selected) {
      if (selected.from === "/register") {
        return true;
      } else if (selected.from === "/forget-password") {
        return false;
      }
    }
    return false;
  }

  function OTPFn(data: z.infer<typeof FormSchema>) {
    if (comingFromRoute()) {
      return verifyEmail({
        email: selected?.email ?? "",
        keyVal: selected?.keyVal ?? "",
        code: data.pin,
      });
    } else {
      return validateOTP({
        email: selected?.email ?? "",
        keyVal: selected?.keyVal ?? "",
        code: data.pin,
      });
    }
  }

  const otpMutaiton = useMutation({
    mutationFn: OTPFn,
    onSuccess: () => {
      if (comingFromRoute()) {
        comingFromRoute();
        toast.success("Awesome! Successfully Verified");
        // setTimeout(() => navigate({ to: "/login" }), 1000);
      } else {
        // navigate({ to: "/reset-password" });
        console.log("reset password");
      }
    },
    onError: (data: Error) => {
      const AxiosData = data as AxiosError;
      const responseData = AxiosData.response?.data as SystemAPIError;
      if (responseData) {
        let error = "";
        comingFromRoute()
          ? (error = "Registration Failed")
          : (error = "OTP Verification Failed");
        toast.error(error);
      }
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    otpMutaiton.mutate(data);
  }

  const sendOtpMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      toast.success("OTP has been sent to your email.");
    },
    onError: (data: Error) => {
      const AxiosData = data as AxiosError;
      const responseData = AxiosData.response?.data as SystemAPIError;
      if (responseData) {
        toast.error("OTP Sending Failed");
      }
    },
  });

  return (
    <section className="flex h-screen">
      <div className="flex h-full w-full flex-col gap-y-28 py-5 pt-44 md:w-[60%] md:items-start md:justify-normal md:pt-0">
        <img
          src={mainLogo}
          alt="main-logo"
          className="ml-5 mt-5 hidden h-[6rem] w-[10rem] cursor-pointer object-cover md:block"
          onClick={() => navigate({ to: "/" })}
        />
        <div className="mx-auto flex w-[26rem] flex-col items-center justify-between">
          <div className="space-y-5 py-3 text-center lg:space-y-0">
            <h1 className="text-[2.25rem] font-medium leading-none text-[#1F1F29] lg:text-[2.5rem] lg:leading-normal">
              Enter Verification Code
            </h1>
            <p
              className={cn(
                "text-base font-normal leading-[1.17188rem] lg:text-xl lg:leading-8",
                otpMutaiton.isError ? "text-red-500" : "text-secondary",
              )}
            >
              Please check your Email, we have sent you a verification code that
              will allow you to reset password
            </p>
          </div>
          <div className="w-full pt-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="flex w-full items-center justify-center">
                            {Array.from({ length: 4 })
                              .fill(0)
                              .map((_, index) => (
                                <div className="flex" key={index}>
                                  <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className={cn(
                                      "h-[3.3125rem] w-[4.625rem] !rounded-[0.5rem] bg-[#F3EBF1] text-[1.5rem] font-normal leading-10",
                                      otpMutaiton.isError
                                        ? "text-red-500 ring-red-500"
                                        : "text-[#1F1F29] ring-primary",
                                    )}
                                  />
                                  {index < 3 && (
                                    <InputOTPSeparator className="text-transparent" />
                                  )}
                                </div>
                              ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage className="ml-4" />
                    </FormItem>
                  )}
                />
                <Button
                  className={cn(
                    "!my-0 !mt-[1.75rem] w-full rounded-2xl py-6 text-2xl font-medium",
                    otpMutaiton.isPending && "cursor-not-allowed bg-primary/80",
                  )}
                  type="submit"
                  disabled={otpMutaiton.isPending}
                >
                  {otpMutaiton.isPending ? (
                    <>
                      <LoadingState />{" "}
                      <span className="text-xl">Verifying...</span>
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <p className="mt-2 w-full space-x-1 text-center text-secondary">
            <span>Didn’t receive OTP code?</span>
            <Button
              variant="link"
              className="p-0 font-semibold text-primary hover:no-underline"
              onClick={() => sendOtpMutation.mutate(user?.user?.email ?? "")}
              disabled={sendOtpMutation.isPending}
            >
              Resend Code
            </Button>
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
