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
} from "@/components/ui";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last Name must be at least 2 characters.",
  }),
  phone_number: z.string().min(10, {
    message:
      "Invalid phone number format. Please provide a valid phone number with the +20 country code.",
  }),
  email: z.string().email({
    message: "Invalid email format. Please provide a valid email address.",
  }),
  age: z.coerce
    .number()
    .positive()
    .gte(0, { message: "Age must be greater than 0" }),
  gender: z.string().min(2, {
    message: "Please enter your gender",
  }),
  country: z.string().min(2, {
    message: "Please enter your country",
  }),
  city: z.string().min(2, {
    message: "Please enter your city",
  }),
});

export default function PersonalInfoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      age: 0,
      gender: "",
      country: "",
      city: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function cancelHandler() {
    form.reset();
  }

  return (
    <div className="w-full max-w-[39rem] rounded-xl bg-[#F3EBF1] p-6">
      <div className="flex items-center justify-between pb-8">
        <h2 className="text-[2rem] font-normal">Personal Information</h2>
        <Button
          onClick={cancelHandler}
          variant={"ghost"}
          className="h-[2.375rem] text-2xl font-medium  text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
        >
          Cancel
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
                    <FormControl>
                      <Input
                        placeholder="Gender"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
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