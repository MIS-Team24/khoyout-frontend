import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { SectionHeader } from "@/components/custom";
import { useState } from "react";
import { fullUserType } from "../myProfile/MyProfile";
import { useMutation } from "@tanstack/react-query";
import { updateUserClientPersonalInfoAPi } from "@/API/profile/profile";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "Please enter your first name, must be at least 2 characters.",
    })
    .trim(),
  last_name: z
    .string()
    .min(2, {
      message: "Please enter your last name must be at least 2 characters.",
    })
    .trim(),
  phone_number: z
    .string()
    .regex(/^\+20\d{10}$/, {
      message:
        "Invalid phone number format. Please provide a valid phone number with the +20 country code.",
    })
    .trim(),
  email: z
    .string()
    .email({
      message: "Invalid email format. Please provide a valid email address.",
    })
    .trim(),
  age: z.coerce
    .number()
    .positive()
    .gte(0, { message: "Age must be greater than 0" }),
  gender: z
    .string()
    .min(2, {
      message: "Please enter your gender",
    })
    .trim(),
  country: z
    .string()
    .min(2, {
      message: "Please enter your country",
    })
    .trim(),
  city: z
    .string()
    .min(2, {
      message: "Please enter your city",
    })
    .trim(),
});

export type userClientBasicInfoBody = z.infer<typeof formSchema>;

export default function PersonalInfoForm(props: { user: fullUserType }) {
  const [edit, setEdit] = useState(false);
  const auth = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: props.user.firstName,
      last_name: props.user.lastName,
      phone_number: props.user.phone ?? "",
      email: props.user.email,
      age: 0,
      gender: props.user?.gender ?? "Male",
      country: props.user.user?.country ?? "",
      city: props.user.user?.city ?? "",
    },
  });

  const updateMutation = useMutation({
    mutationKey: ["user-update-personal"],
    mutationFn: (values: userClientBasicInfoBody) =>
      updateUserClientPersonalInfoAPi(auth.access_token() ?? "", values),
    onSuccess: () => {
      toast.success("Successfully updated information.");
      setEdit(false);
    },
    onError: () => {
      toast.error(
        "Failed to update please make sure you entered the right data",
      );
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMutation.mutate(values);
  }

  return (
    <div className="w-full rounded-xl bg-[#F3EBF1] p-6">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeader title="Personal Information" className="my-0" />
        <Button
          onClick={() => {
            setEdit(!edit);
            form.reset();
          }}
          variant={"ghost"}
          className="h-[2.375rem] text-2xl font-medium  text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
        >
          {edit ? "Cancel" : "Edit"}
        </Button>
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex w-full items-center justify-between gap-x-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        placeholder="First Name"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        placeholder="Last Name"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Input
                      disabled={!edit}
                      placeholder="Phone Number"
                      {...field}
                      className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
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
                    <Input
                      disabled={!edit}
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-between gap-x-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        type="number"
                        placeholder="Age"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select
                      disabled={!edit}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 w-full rounded-[0.25rem] border-[#B1B1B1] bg-transparent py-[1rem] transition hover:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0">
                          <SelectValue placeholder="Select Your Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-none">
                        <SelectItem className="rounded-none" value="Male">
                          Male
                        </SelectItem>
                        <SelectItem className="rounded-none" value="Female">
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-x-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        placeholder="Country"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        placeholder="City"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className="h-[2.9375rem] w-[17.5rem] items-center text-xl font-medium text-[#F9F4F4]"
                disabled={!edit || updateMutation.isPending}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
