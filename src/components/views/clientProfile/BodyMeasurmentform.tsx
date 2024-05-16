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
  body_shape: z
    .string()
    .min(2, {
      message: "Input must be between 2 characters and 50 characters",
    })
    .max(50),
  weight: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  length: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  shoulder_width: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  neck: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  chest: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  arms: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  forearms: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  wrists: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  waist: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  hips: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  thigh: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  belly: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  above_kinee: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  below_kinee: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  calf: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
});

function BodyMeasurmentform() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body_shape: "",
      weight: 0,
      length: 0,
      shoulder_width: 0,
      neck: 0,
      chest: 0,
      arms: 0,
      forearms: 0,
      wrists: 0,
      waist: 0,
      hips: 0,
      thigh: 0,
      belly: 0,
      below_kinee: 0,
      above_kinee: 0,
      calf: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function cancelHandler() {
    form.resetField("body_shape");
    form.resetField("weight");
    form.resetField("length");
    form.resetField("shoulder_width");
    form.resetField("neck");
    form.resetField("chest");
    form.resetField("arms");
    form.resetField("forearms");
    form.resetField("wrists");
    form.resetField("waist");
    form.resetField("hips");
    form.resetField("thigh");
    form.resetField("belly");
    form.resetField("above_kinee");
    form.resetField("below_kinee");
    form.resetField("calf");
  }

  return (
    <div className="min-h-[59.3rem] w-full max-w-[39rem] rounded-xl bg-[#F3EBF1] p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-normal">My body measurments</h2>
        <Button
          onClick={cancelHandler}
          variant={"ghost"}
          className="h-[2.375rem] text-2xl font-medium  text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
        >
          Cancel
        </Button>
      </div>
      <div className="pb-8">
        <p className="text-base font-normal leading-6 text-[#6C6C6C]">
          Your measurements are securely shared with any designer you book with
          to craft a perfect fit just for you
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="body_shape"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Body Shape"
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
                name="weight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight"
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
                name="length"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Length"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="shoulder_width"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Shoulder_Width"
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
                name="neck"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Neck"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="chest"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Chest"
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
                name="arms"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Arms"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="forearms"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Forearms"
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
                name="wrists"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Wrists"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="waist"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Waist"
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
                name="hips"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Hips"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="thigh"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Thigh"
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
                name="belly"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Belly"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="above_kinee"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Above Kinee"
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
                name="below_kinee"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Below Kinee"
                        {...field}
                        className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="calf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Calf"
                      {...field}
                      className="h-14 items-center gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default BodyMeasurmentform;
