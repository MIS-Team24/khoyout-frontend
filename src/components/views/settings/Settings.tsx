import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Checkbox } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui";
import { Lock, Mail, EyeOff, Eye } from "lucide-react";
import { useState } from "react";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email format. Please provide a valid email address.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 chatacters",
      })
      .max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

function Settings() {
  const [showButton, setShowButton] = useState(false);
  const [check, setCheck] = useState({
    checkOne: false,
    checkTwo: false,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [edit, setEdit] = useState(false);

  function buttonHandler() {
    setShowButton(!showButton);
    setEdit(!edit);
    form.reset();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section>
      <div className="main-container mx-auto mt-[6.44rem] flex flex-col items-start justify-center">
        <div className="mb-8 w-full rounded-[0.5rem] bg-[#F3EBF1]">
          <div className="p-6">
            <div className="flex items-center justify-between pb-12">
              <div className="h-[2.375rem] w-[19.6875rem]">
                <h2 className="text-[2rem] font-normal leading-normal">
                  Account Management
                </h2>
              </div>
              {showButton && (
                <Button
                  variant={"default"}
                  className="h-[2.1875rem] w-[4.1875rem] items-center rounded-2xl px-2 py-4 xl:w-[11.875rem] xl:text-lg xl:font-medium  xl:leading-normal"
                >
                  Update
                </Button>
              )}
            </div>
            <div className="mb-10 h-8 w-[24.625rem]">
              <p className="text-xl font-normal leading-8 text-[#49454F]">
                Make changes to your email and password .
              </p>
            </div>
            <div className="mb-8 h-full pl-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="flex flex-col-reverse items-start sm:flex-row sm:items-center sm:justify-between">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex w-[23rem] items-center justify-center rounded border border-[#B1B1B1] pl-4">
                              <Mail size={24} className="text-secondary" />
                              <Input
                                disabled={!edit}
                                type="email"
                                placeholder="Email"
                                {...field}
                                className="h-[3.5rem] w-[20rem] items-center border-none bg-transparent text-base font-normal leading-6 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {
                      <Button
                        type="button"
                        onClick={buttonHandler}
                        variant={"ghost"}
                        className="mb-4 text-xl text-[#8C236C] hover:text-[#8C236C] sm:text-base sm:font-medium sm:leading-normal"
                      >
                        {edit ? "Cancel" : "Edit"}
                      </Button>
                    }
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex w-[23rem] items-center justify-center rounded border border-[#B1B1B1] pl-4">
                            <Lock size={24} className="text-secondary" />
                            <Input
                              disabled={!edit}
                              type={showPassword.password ? "text" : "password"}
                              placeholder="Password"
                              {...field}
                              className="h-[3.5rem] w-[20rem] items-center border-none bg-transparent text-base font-normal leading-6 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            />
                            <div className="cursor-pointer p-2">
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
                          <div className="flex w-[23rem] items-center justify-center rounded border border-[#B1B1B1] pl-4">
                            <Lock size={24} className="text-secondary" />
                            <Input
                              disabled={!edit}
                              type={
                                showPassword.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                              placeholder="Confirm Password"
                              {...field}
                              className="h-[3.5rem] w-[20rem] items-center border-none bg-transparent text-base font-normal leading-6 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                            />
                            <div className="cursor-pointer p-2">
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
                </form>
              </Form>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="pb-4 text-xl font-normal leading-8 tracking-[0.00625rem] sm:pb-0">
                Log in with another account
              </p>
              <Button
                variant={"outline"}
                className="h-10 w-[11.875rem] bg-transparent px-2 py-4 text-lg font-medium leading-normal text-[#8C236C] hover:text-[#8C236C]"
              >
                + Add an account
              </Button>
            </div>
          </div>
        </div>
        <div className="mb-8 w-full rounded-[0.5rem] bg-[#F3EBF1]">
          <div className="p-6">
            <div className="mb-8 h-[2.375rem] w-[11.375rem]">
              <h2 className="text-[2rem] font-normal leading-normal">
                Notification
              </h2>
            </div>
            <div className="mb-8 flex h-12 items-center justify-between">
              <p className="trackin-[0.00625rem] text-xl font-normal leading-8">
                Text messages appointment notifications
              </p>

              <Checkbox
                checked={check.checkOne}
                onCheckedChange={() =>
                  setCheck({
                    ...check,
                    checkOne: !check.checkOne,
                  })
                }
                className="h-6 w-6 cursor-pointer rounded-none data-[state=checked]:bg-transparent data-[state=checked]:text-primary"
              />
            </div>
            <div className="flex h-12 items-center justify-between">
              <p className="trackin-[0.00625rem] text-xl font-normal leading-8">
                Text messages offers notifications
              </p>

              <Checkbox
                checked={check.checkTwo}
                onCheckedChange={() =>
                  setCheck({
                    ...check,
                    checkTwo: !check.checkTwo,
                  })
                }
                className="h-6 w-6 cursor-pointer rounded-none data-[state=checked]:bg-transparent data-[state=checked]:text-primary"
              />
            </div>
          </div>
        </div>
        <div className="mb-14 w-full rounded-[0.5rem] bg-[#F3EBF1]">
          <div className="p-6">
            <div className="mb-8 h-[2.375rem] w-[13.5625rem]">
              <h2 className="text-[2rem] font-normal leading-normal">
                Delete Account
              </h2>
            </div>
            <div className="mb-8 flex h-12 items-center justify-between">
              <p className="trackin-[0.00625rem] text-xl font-normal leading-8">
                Are you sure you went to leave khoyout ?
              </p>
              <Button
                variant={"ghost"}
                className="h-10 w-[11.875rem] px-2 py-4 text-lg font-medium leading-normal text-[#8C236C] hover:text-[#8C236C]"
              >
                Delete my account
              </Button>
            </div>
            <div className="flex h-12 items-center justify-between">
              <p className="trackin-[0.00625rem] text-xl font-normal leading-8">
                Or just log out
              </p>
              <Button
                variant={"outline"}
                className="h-[1.1875rem] w-[5.4375rem] bg-transparent px-2 py-4 text-lg font-medium leading-normal text-[#8C236C] hover:text-[#8C236C]"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
