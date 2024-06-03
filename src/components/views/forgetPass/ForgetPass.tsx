import {
  Input,
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui";
import { Mail } from "lucide-react";
import { sideImg, mainLogo } from "@/assets";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "@/API/auth/OTP/OTP";
import { LoadingState } from "@/components/custom";
import { cn } from "@/lib/utils";
import { HistoryState } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface state extends HistoryState {
  from: string;
}

export default function ForgetPass() {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address (user@abc.com).",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgetPassMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      toast.success("Successfully Sent OTP Code to your Email");
      navigate({
        to: "/otp",
        state: {
          from: "/forget-password",
          email: form.getValues("email"),
          keyVal: data.data?.Otp.keyVal,
        } as state,
      });
    },

    onError: (error) => {
      toast.error(error.message ?? "An error occurred while sending OTP code");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgetPassMutation.mutate(values.email);
  }

  return (
    <div className="flex h-screen">
      <div className="flex h-full w-full flex-col gap-y-14  py-5 pt-32 md:w-[60%] md:items-start md:justify-normal md:pt-0">
        <img
          src={mainLogo}
          alt="main-logo"
          className="ml-5 mt-5 hidden h-[6rem] w-[10rem] cursor-pointer object-cover md:block"
          onClick={() => navigate({ to: "/" })}
        />
        <div className="mx-auto w-[23rem]">
          <div className="">
            <h1 className="text-center text-[2rem] font-medium leading-normal md:text-[2.5rem]">
              Forget Password?
            </h1>
            <p className="text-center  text-[0.9375rem] text-base font-normal leading-[1.17188rem] tracking-[0.00625rem] text-secondary lg:text-xl lg:leading-8 ">
              Please enter your email to send you a verification code to be able
              to reset your password
            </p>
          </div>
          <div className="w-full pt-16">
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
                        <div className="flex items-center justify-center gap-x-0.5 rounded-[0.25rem] px-2.5 py-1 ring-2 ring-[#B1B1B1] focus-within:ring-primary">
                          <Mail size={24} className="text-secondary" />
                          <Input
                            autoComplete="email"
                            type="email"
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
                <div className="flex items-center justify-center gap-x-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="flex h-[3.6rem] w-[10.75rem] items-center justify-center gap-2 rounded-2xl border-primary text-2xl text-primary hover:text-primary"
                    onClick={() => navigate({ to: "/" })}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      "flex h-[3.6rem] w-[10.75rem] items-center justify-center gap-2 rounded-2xl text-2xl",
                      forgetPassMutation.isPending &&
                        "cursor-not-allowed bg-primary/80",
                    )}
                    disabled={forgetPassMutation.isPending}
                  >
                    {forgetPassMutation.isPending ? (
                      <>
                        <LoadingState />
                        <span>Sending</span>
                      </>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="hidden h-full w-[40%] md:block">
        <img
          src={sideImg}
          alt="side-image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
