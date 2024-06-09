import {
  Dialog,
  DialogContent,
  DialogHeader,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Calendar,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Textarea,
  buttonVariants,
} from "@/components/ui";
import {
  SegementationSteps,
  SegmentStep,
  Segment,
  Segmentator,
} from "@/components/custom";
import { Clamp } from "@/utilities/clamp";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, CircleCheck, Clock, FileUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

const formSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  time: z.string({
    required_error: "A time is required.",
  }),
  service: z.string().optional(),
  message: z.string(),
  photo: z.union([
    z
      .instanceof(File)
      .refine(
        (file) => file?.size && file?.size <= 50 * 1024 * 1024,
        "Max file size is 50MB",
      )
      .refine(
        (file) =>
          [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/svg+xml",
            "image/webp",
          ].includes(file?.type as string),
        "Only .jpg, .png, .gif, .svg, and .webp formats are supported",
      ),
    z.undefined(),
    z.null(),
  ]),
});

type BookingDialogProps = {
  open: boolean;
  onChange: (open: boolean) => void;
  designerName: string;
};

type FormKey = keyof typeof formSchema.shape;

const fieldOfSegments: FormKey[][] = [
  ["date"],
  ["time"],
  ["service", "photo", "message"],
];

// TODO: Replace this with a dynamic array of available times
const fixedTimeArray = [
  { time: "10:00 AM" },
  { time: "11:00 AM" },
  { time: "12:00 PM" },
  { time: "01:00 PM" },
  { time: "02:00 PM" },
  { time: "03:00 PM" },
  { time: "04:00 PM" },
  { time: "05:00 PM" },
  { time: "06:00 PM" },
];
const customServices = [
  { title: "Design from scratch" },
  { title: "Design implementation" },
  { title: "Hand made" },
  { title: "Redesign" },
];

export default function BookingDialog({
  open,
  onChange,
  designerName,
}: BookingDialogProps) {
  const [currentSegment, setCurrentSegment] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      message: "",
      photo: null as File | null | undefined,
    },
  });

  async function validateAndForwardSegment() {
    let areFieldsValid = true;

    for (const field of fieldOfSegments[currentSegment]) {
      const isFieldValid = await form.trigger(field);
      if (!isFieldValid) areFieldsValid = false;
    }

    if (areFieldsValid) {
      setCurrentSegment((prevValue: number) =>
        Clamp(prevValue + 1, 0, fieldOfSegments.length),
      );
    }
  }

  function rewindSegment() {
    setCurrentSegment((prevValue: number) =>
      Clamp(prevValue - 1, 0, fieldOfSegments.length),
    );
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    if (!open && currentSegment === 3) {
      setCurrentSegment(0);
      form.reset();
      setSelectedTime("");
    }
  }, [open, currentSegment, form]);

  // const date = new Date();
  // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent className="flex h-[55rem] w-full max-w-6xl flex-col items-center justify-start gap-y-0 rounded-lg bg-[#F9F4F4] p-4 pt-14 shadow-lg">
        <SegementationSteps currentStep={currentSegment}>
          {Array.from({ length: 4 })
            .fill(0)
            .map((_, i) => (
              <SegmentStep key={i} />
            ))}
        </SegementationSteps>
        <DialogHeader></DialogHeader>
        <div className="h-full w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Segmentator currentSegment={currentSegment}>
                <Segment>
                  <h1 className="pb-[2.5rem] pt-2 text-center text-[2.5rem] font-normal leading-normal text-gray-800">
                    Book an appointment with your{" "}
                    <span className="font-medium text-primary">
                      {designerName ?? "Designer"}
                    </span>
                  </h1>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="mx-auto w-[35.5rem] space-y-4 text-center">
                        <FormLabel
                          className="text-[2rem] font-normal leading-normal"
                          htmlFor="date"
                        >
                          Select available date
                        </FormLabel>
                        <FormControl className="w-full bg-[#F3EBF1]">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            className="mx-auto rounded-lg"
                            numberOfMonths={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full justify-center gap-8 pt-[7rem]">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={rewindSegment}
                      className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={validateAndForwardSegment}
                      className="w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </Segment>
                <Segment>
                  <h1 className="pb-[2.5rem] pt-2 text-center text-[2.5rem] font-normal leading-normal text-gray-800">
                    Book an appointment with your{" "}
                    <span className="font-medium text-primary">
                      {" "}
                      {designerName ?? "Designer"}
                    </span>
                  </h1>
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem className="mx-auto w-[45rem] space-y-0 text-center">
                        <FormLabel
                          className="text-[2rem] font-normal leading-normal"
                          htmlFor="time"
                        >
                          Select available time
                        </FormLabel>
                        <div className="flex w-full items-center justify-center">
                          <p className="flex items-center gap-x-2 text-[#49454F]">
                            <CalendarDays size={20} />
                            <span className="text-[1.25rem] leading-8">
                              In{" "}
                              {format(
                                (form.getValues("date") as Date) ?? new Date(),
                                "dd MMM yyy",
                              )}
                            </span>
                          </p>
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => setCurrentSegment(0)}
                            className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="flex w-full flex-wrap justify-center gap-6 pt-4">
                          {fixedTimeArray.map(({ time }) => (
                            <FormControl
                              key={time}
                              className={cn(
                                "h-[5rem] w-[12.375rem] border border-[#B1B1B1] bg-[#F3EBF1] px-[2rem] py-[1.5rem] text-[#49454F]",
                                selectedTime === time &&
                                  "focus-within:rong-0 !bg-primary text-white",
                              )}
                            >
                              <Input
                                readOnly
                                {...field}
                                value={time}
                                className="cursor-pointer bg-transparent text-center text-[1.5rem] font-medium leading-normal hover:bg-transparent hover:text-primary focus:bg-primary focus:text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                onClick={() => {
                                  const currentTime = time.replace(" ", "");
                                  setSelectedTime(time);
                                  field.onChange(currentTime);
                                }}
                              />
                            </FormControl>
                          ))}
                          <FormMessage className="text-xl capitalize" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full justify-center gap-8 pt-[8rem]">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={rewindSegment}
                      className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={validateAndForwardSegment}
                      className="w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </Segment>
                <Segment>
                  <h1 className="pb-[2.5rem] pt-2 text-center text-[2.5rem] font-normal leading-normal text-gray-800">
                    Book an appointment with your{" "}
                    <span className="font-medium text-primary">
                      {" "}
                      {designerName ?? "Designer"}
                    </span>
                  </h1>
                  <div className="mx-auto w-[45rem] space-y-0 pb-3 text-center">
                    <h3 className="text-[2rem] font-normal leading-normal">
                      Confirm your booking
                    </h3>
                    <div className="flex w-full items-center justify-center">
                      <p className="flex items-center gap-x-2 text-[#49454F]">
                        <CalendarDays size={20} />
                        <span className="text-[1.25rem] leading-8">
                          In{" "}
                          {format(
                            (form.getValues("date") as Date) ?? new Date(),
                            "dd MMM yyy",
                          )}
                        </span>
                      </p>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setCurrentSegment(0)}
                        className="bg-transparent text-[1.38rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="mx-auto flex w-fit items-center justify-center">
                      <p className="mr-[3.25rem] flex items-center gap-x-2 text-[#49454F]">
                        <Clock size={20} />
                        <span className="text-[1.25rem]">{selectedTime}</span>
                      </p>
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => setCurrentSegment(1)}
                        className="bg-transparent text-[1.38rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem className="mx-auto w-[23rem] space-y-0 pb-6 text-center">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-[3rem] w-full rounded-[0.5rem] border-[#B1B1B1] bg-transparent py-[1.75rem] text-base text-[#6C6C6C] transition hover:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {customServices.map(({ title }) => (
                              <SelectItem key={title} value={title}>
                                {title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem className="mx-auto flex w-[23rem] flex-col">
                        <FormControl>
                          <label
                            className="group flex w-full cursor-pointer appearance-none justify-center rounded-md border border-[#B1B1B1] px-3 py-4 transition hover:border-gray-400 hover:border-primary focus:border-solid focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                            tabIndex={0}
                          >
                            <span className="flex items-center space-x-2">
                              <span className="text-base font-normal text-secondary transition group-hover:text-primary">
                                {field.value?.name
                                  ? field.value?.name
                                  : "Upload a photo for the design inspired you"}
                              </span>
                              <FileUp
                                size={24}
                                className="text-secondary transition group-hover:text-primary"
                              />
                            </span>
                            <Input
                              id="photo-dropbox"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                field.onChange(
                                  e.target?.files && e.target?.files[0],
                                )
                              }
                            />
                          </label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mx-auto w-[42rem] space-y-2 pt-8 text-center">
                        <p className="text-[1.5rem] leading-8">
                          Do you want to say anything before we met in our
                          appointment
                        </p>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="h-[10.5rem] w-full rounded-[1rem] border-[#B1B1B1] px-6 py-4 text-[1.1rem] text-[#4f4f4f] transition placeholder:text-[1.1rem] hover:border-primary focus:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
                            placeholder="Type your answer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full justify-center gap-8 pt-[3.5rem]">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={rewindSegment}
                      className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      onClick={validateAndForwardSegment}
                      className="w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </Segment>
                <Segment>
                  <div className="mx-auto flex w-[45rem] flex-col items-center justify-between pt-[5rem] text-center">
                    <CircleCheck className="h-[8.75rem] w-[8.75rem] text-[#1EB717]" />
                    <h2 className="pb-[2rem] pt-[1.5rem] text-[2.5rem] font-medium leading-normal">
                      Well Done!
                    </h2>
                    {/* TODO: Change Span User Name */}
                    <p className="w-[35.2rem] text-[1.5rem] leading-8 text-[#49454F]">
                      We sent a booking request to{" "}
                      <span className="font-medium text-primary">
                        {designerName ?? "Designer"}
                      </span>
                      . When she accepts, you will receive a confirmation
                      message.
                    </p>
                    <div className="flex w-full justify-center gap-8 pt-[3.95rem]">
                      <Link
                        // TODO: Replace this with the actual link to the user id of the designer
                        to="/"
                        onClick={() => {
                          onChange(false);
                          setCurrentSegment(0);
                          form.reset();
                          setSelectedTime("");
                        }}
                        className={cn(
                          buttonVariants({ variant: "default" }),
                          "w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal",
                        )}
                      >
                        Manage Booking
                      </Link>
                    </div>
                  </div>
                </Segment>
              </Segmentator>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
