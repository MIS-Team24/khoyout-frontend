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
} from "@/components/ui";
import { toast } from "@/components/ui/use-toast";
import { mainLogo, SideImg } from "@/assets";
import { useNavigate } from "@tanstack/react-router";
import { LoadingState } from "@/components/customUi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface state extends HistoryState {
  from: string;
}

const FormSchema = z.object({
  pin: z.string().min(4),
});

export default function OTP() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.users.user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const selected = useRouterState({
    select: (state) => state.location.state as state,
  });

  function comingfromRegister() {
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
    if (comingfromRegister()) {
      return verifyEmail({
        // TODO: Replace with actual email
        email: user?.user.email,
        keyVal: user?.otp.keyVal,
        code: data.pin,
      });
    } else {
      return validateOTP({
        // TODO: Replace with actual email
        email: user?.user.email,
        keyVal: user?.otp.keyVal,
        code: data.pin,
      });
    }
  }

  const otpMutaiton = useMutation({
    mutationFn: OTPFn,
    onSuccess: () => {
      if (comingfromRegister()) {
        comingfromRegister();
        toast({
          title: "Regsiter Successful",
          description: "You have successfully Registered.",
          variant: "default",
        });
        setTimeout(() => navigate({ to: "/" }), 1000);
      } else {
        navigate({ to: "/reset-password" });
      }
    },
    onError: (data: Error) => {
      const AxiosData = data as AxiosError;
      const responseData = AxiosData.response?.data as SystemAPIError;

      if (responseData) {
        toast({
          title: comingfromRegister()
            ? "Registration Failed"
            : "OTP Verification Failed",
          description: responseData.error
            ? responseData.error
            : "Unknown Error.",
          variant: "destructive",
        });
      } else {
        toast({
          title: comingfromRegister()
            ? "Registration Failed"
            : "OTP Verification Failed",
          description: "Unexpected Error, please contact the site owner.",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    otpMutaiton.mutate(data);
  }

  const sendOtpMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      toast({
        title: "OTP Sent",
        description: "OTP has been sent to your email.",
        variant: "default",
      });
    },
    onError: (data: Error) => {
      const AxiosData = data as AxiosError;
      const responseData = AxiosData.response?.data as SystemAPIError;

      if (responseData) {
        toast({
          title: "OTP Sending Failed",
          description: responseData.error
            ? responseData.error
            : "Unknown Error.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "OTP Sending Failed",
          description: "Unexpected Error, please contact the site owner.",
          variant: "destructive",
        });
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
            <p className="text-base font-normal leading-[1.17188rem] text-secondary lg:text-xl lg:leading-8">
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
                    <FormItem className="flex w-full flex-col items-center justify-center">
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="h-[3.3125rem] w-[4.625rem] !rounded-[0.5rem] bg-[#F3EBF1] text-[#1F1F29] ring-primary"
                            />
                            <InputOTPSeparator className="text-transparent" />
                            <InputOTPSlot
                              index={1}
                              className="h-[3.3125rem] w-[4.625rem] !rounded-[0.5rem] bg-[#F3EBF1] text-[#1F1F29] ring-primary"
                            />
                            <InputOTPSeparator className="text-transparent" />
                            <InputOTPSlot
                              index={2}
                              className="h-[3.3125rem] w-[4.625rem] !rounded-[0.5rem] bg-[#F3EBF1] text-[#1F1F29] ring-primary"
                            />
                            <InputOTPSeparator className="text-transparent" />
                            <InputOTPSlot
                              index={3}
                              className="h-[3.3125rem] w-[4.625rem] !rounded-[0.5rem] bg-[#F3EBF1] text-[#1F1F29] ring-primary"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  className="!my-0 !mt-[1.75rem] w-full rounded-2xl bg-primary py-6 text-2xl font-medium"
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
              onClick={() => sendOtpMutation.mutate()}
              disabled={sendOtpMutation.isPending}
            >
              Resend Code
            </Button>
          </p>
        </div>
      </div>
      <div className="hidden h-full w-[40%] md:block">
        <img
          src={SideImg}
          alt="side-img"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
