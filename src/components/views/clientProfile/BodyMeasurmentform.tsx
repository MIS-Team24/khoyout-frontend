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
import { SectionHeader } from "@/components/custom";
import { useState } from "react";
import { fullUserType } from "../myProfile/MyProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBodyMeasurementsAPI } from "@/API/profile/profile";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "@/components/custom/Loading";

const formSchema = z.object({
  body_shape: z
    .string()
    .min(2, {
      message: "Body Shape must be between 2 characters and 50 characters",
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
  shoulderWidth: z.coerce
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
  aboveKnee: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  belowKnee: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
  calf: z.coerce
    .number()
    .positive()
    .gte(0, { message: "The value must be greater than 0" }),
});

export type bodyMeasurementsType = z.infer<typeof formSchema>;

function BodyMeasurmentform(props: { user: fullUserType }) {
  const [edit, setEdit] = useState(false);
  const bm = props.user.user?.bodyMeasurements;
  const auth = useAuth();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationKey: ["update-body-measurement"],
    mutationFn: (values: bodyMeasurementsType) =>
      updateBodyMeasurementsAPI(auth.access_token() ?? "", values),
    onSuccess: () => {
      setEdit(false);
      toast.success("Successfully updated your body measurements.");
      queryClient.invalidateQueries({ queryKey: ["user-me-client"] });
    },
    onError: () => {
      toast.success(
        "Failed to update your body measurements. Try again later.",
      );
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body_shape: bm?.body_shape ?? "",
      weight: bm?.weight ?? 0,
      length: bm?.length ?? 0,
      shoulderWidth: bm?.shoulderWidth ?? 0,
      neck: bm?.neck ?? 0,
      chest: bm?.chest ?? 0,
      arms: bm?.arms ?? 0,
      forearms: bm?.forearms ?? 0,
      wrists: bm?.wrists ?? 0,
      waist: bm?.waist ?? 0,
      hips: bm?.hips ?? 0,
      thigh: bm?.thigh ?? 0,
      belly: bm?.belly ?? 0,
      belowKnee: bm?.belowKnee ?? 0,
      aboveKnee: bm?.aboveKnee ?? 0,
      calf: bm?.calf ?? 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMutation.mutate(values);
  }

  return (
    <div className="w-full rounded-xl bg-[#F3EBF1] p-6">
      <div className="flex items-center justify-between">
        <SectionHeader title="My body measurments" className="my-0 pb-2" />
        <Button
          onClick={() => {
            form.reset();
            setEdit(!edit);
          }}
          variant={"ghost"}
          className="h-[2.375rem] text-2xl font-medium  text-primary hover:bg-transparent hover:text-primary"
        >
          {edit ? "Cancel" : "Edit"}
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
                      disabled={!edit}
                      placeholder="Body Shape"
                      {...field}
                      className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Weight"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Length"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="shoulderWidth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        type="number"
                        placeholder="Should Width"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Neck"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Chest"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Arms"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Forearms"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Wrists"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Waist"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Hips"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Thigh"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                        disabled={!edit}
                        type="number"
                        placeholder="Belly"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                name="aboveKnee"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        type="number"
                        placeholder="Above Kinee"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="belowKnee"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled={!edit}
                        type="number"
                        placeholder="Below Kinee"
                        {...field}
                        className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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
                      disabled={!edit}
                      type="number"
                      placeholder="Calf"
                      {...field}
                      className="h-14 gap-2 rounded border border-[#B1B1B1] bg-transparent text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button
                type="submit"
                className="h-[2.9375rem] w-[17.5rem] text-xl font-medium text-[#F9F4F4]"
                disabled={!edit || updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loading /> Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default BodyMeasurmentform;
