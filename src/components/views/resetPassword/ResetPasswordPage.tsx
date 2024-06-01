import { sideImg, mainLogo } from "@/assets/";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Button,
  Input,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lock, EyeOff, Eye, Check, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/API/resetPassword/ResetPassword";

const formSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>, event) {
    if (values.password !== "" || values.password == undefined) {
      if (
        values.password.length >= 8 &&
        /[a-z]/.test(values.password) &&
        /[A-Z]/.test(values.password) &&
        /[0-9]/.test(values.password)
      ) {
        resetPasswordMutation.mutate(values);
      } else {
        event.preventDefault();
      }
    }
  }

  const [value, setValue] = useState("");

  function handleInputChange(event) {
    setValue(`${event.value}`);
  }

  return (
    <div className="flex h-screen place-items-center lg:place-items-start">
      <div className="mx-auto w-11/12 py-12 lg:w-3/5 lg:py-0">
        <div className="hidden p-11 lg:block">
          <img src={mainLogo} alt="main-logo" className="object-cover" />
        </div>
        <div className="flex place-items-center justify-center">
          <div className="flex w-[23rem] flex-col gap-16 text-center">
            <div>
              <p className="mb-4 text-[2.5rem] font-medium">Reset Password</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex h-12 items-center justify-center gap-x-0.5 rounded border border-input px-3 py-3 focus-within:border-primary">
                          <Lock size={24} className="text-secondary" />
                          <Input
                            onKeyUp={handleInputChange({ ...field })}
                            type={showPassword.password ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex h-12 items-center justify-center gap-x-0.5 rounded border border-input px-3 py-3 focus-within:border-primary">
                          <Lock size={24} className="text-secondary" />
                          <Input
                            type={
                              showPassword.confirmPassword ? "text" : "password"
                            }
                            placeholder="Confirm Password"
                            {...field}
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <div className="flex gap-6">
                  <Link
                    to="/login"
                    className="flex h-14 w-1/2 place-items-center justify-center rounded-2xl border border-primary bg-background text-2xl  font-medium text-primary"
                  >
                    Cancel
                  </Link>
                  <Button
                    type="submit"
                    className="h-14 w-1/2 rounded-2xl text-2xl"
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
            <div className="text-left">
              <p className="mb-4 text-2xl text-foreground">
                Password conditions
              </p>
              <ul id="password-condition-list">
                <li>
                  {value.length >= 8 ? (
                    <Check className="text-success duration-300" size={24} />
                  ) : (
                    <X className="text-error duration-300" size={24} />
                  )}
                  <span
                    className={
                      value.length >= 8
                        ? "text-success duration-300"
                        : "text-error duration-300"
                    }
                  >
                    At least 8 characters long
                  </span>
                </li>
                <li>
                  {/[a-z]/.test(value) ? (
                    <Check className="text-success" size={24} />
                  ) : (
                    <X className="text-error" size={24} />
                  )}
                  <span
                    className={
                      /[a-z]/.test(value)
                        ? "text-success duration-300"
                        : "text-error duration-300"
                    }
                  >
                    Include at least one lowercase letter (a-z)
                  </span>
                </li>
                <li>
                  {/[A-Z]/.test(value) ? (
                    <Check className="text-success" size={24} />
                  ) : (
                    <X className="text-error" size={24} />
                  )}
                  <span
                    className={
                      /[A-Z]/.test(value)
                        ? "text-success duration-300"
                        : "text-error duration-300"
                    }
                  >
                    Include at least one uppercase letter (A-Z)
                  </span>
                </li>
                <li>
                  {/[0-9]/.test(value) ? (
                    <Check className="text-success" size={24} />
                  ) : (
                    <X className="text-error" size={24} />
                  )}
                  <span
                    className={
                      /[0-9]/.test(value)
                        ? "text-success duration-300"
                        : "text-error duration-300"
                    }
                  >
                    Include at least one number (0-9)
                  </span>
                </li>
              </ul>
            </div>
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
