// import React from "react";
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
import { forgetPass } from "@/API/forgetPass/forgetPass";
import { LoadingState } from "@/components/customUi";

export default function ForgetPass() {
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address (user@abc.com) ",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgetPassMutation = useMutation({
    mutationFn: forgetPass,
    onSuccess: () => {
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    forgetPassMutation.mutate(values);
  }

  return (
    <div className="flex h-screen">
      {/*Container*/}
      {/*Form Container */}
      <div className="flex h-full w-full flex-col gap-y-14  md:w-[60%] py-5 pt-32 md:items-start md:justify-normal md:pt-0">
        {/* Logo */}
        <img
          src={mainLogo}
          alt="main-logo"
          className="ml-5 mt-5 hidden h-[6rem] w-[10rem] cursor-pointer object-cover md:block"
          // onClick={() => navigate({ to: "/" })}
        />
        {/*Header */}
        <div className="mx-auto w-[23rem]">
          <div className="">
            <h1 className="md:text-[2.5rem] font-medium leading-normal text-center text-[2rem]">
              Forget Password?
            </h1>
            <p className="text-center  lg:text-xl text-base leading-[1.17188rem] font-normal lg:leading-8 tracking-[0.00625rem] text-[#6C6C6C] text-[0.9375rem] ">
              Please enter your email to send you a verification code to be able
              to reset your password
            </p>
          </div>
          {/*Input Form*/}
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
                        <div className="flex items-center justify-center gap-x-0.5 rounded-[0.25rem] px-2.5 py-1 ring-2 ring-[#B1B1B1] focus-within:ring-[#8C236C]">
                          <Mail size={24} className="text-[#6C6C6C]" />
                          <Input
                            autoComplete="email"
                            type="email"
                            placeholder="Email"
                            className="border-none text-lg text-[#6C6C6C] ring-0 ring-transparent placeholder:text-[#6C6C6C] focus-visible:ring-0 focus-visible:ring-transparent"
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
                    className="flex items-center w-[10.75rem] h-[3.6rem] justify-center gap-2 text-2xl rounded-2xl	 text-[#8C236C] border-[#8C236C] hover:text-[#8C236C]"
                    onClick={() => navigate({ to: "/" })}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex items-center w-[10.75rem] h-[3.6rem] justify-center gap-2 text-2xl bg-[#8C236C]  rounded-2xl"
                    onClick={() => navigate({ to: "/" })}
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
      <div className="h-full w-[40%] bg-indigo-500 md:block hidden">
        <img
          src={sideImg}
          alt="side-image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
