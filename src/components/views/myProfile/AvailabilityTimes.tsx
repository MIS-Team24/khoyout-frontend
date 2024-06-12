import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fullUserType } from "./MyProfile";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import {
  createAvailableTime,
  deleteAvailableTimeAPI,
} from "@/API/profile/profile";
import toast from "react-hot-toast";
import { useState } from "react";
import { z } from "zod";
import { dayOfWeekEnum } from "@/API/types/appointments/appointments";

const timevalidationSchema = z
  .string()
  .regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/);

// Define the order of days in a week
const order = [
  dayOfWeekEnum.Saturday,
  dayOfWeekEnum.Sunday,
  dayOfWeekEnum.Monday,
  dayOfWeekEnum.Tuesday,
  dayOfWeekEnum.Wednesday,
  dayOfWeekEnum.Thursday,
  dayOfWeekEnum.Friday,
];

// Create a mapping of each day to its order position
const dayToOrder: { [key: string]: number } = {};
order.forEach((day, index) => {
  dayToOrder[day] = index;
});

export default function AvailabilityTimes(props: {
  user: fullUserType;
  isLoadingData: boolean;
}) {
  if (!props.user.designer) return <div>Invalid user.</div>;
  const [fromTime, setFromTime] = useState("05:30:00");
  const [toTime, setToTime] = useState("07:00:00");
  const [formatError, setFormatError] = useState<string>();
  const [dayOfWeek, setDayOfWeek] = useState<dayOfWeekEnum>(
    dayOfWeekEnum.Sunday,
  );

  const des = props.user.designer;
  const auth = useAuth();
  const queryControl = useQueryClient();

  const deleteAvailableTime = useMutation({
    mutationFn: (id: number) =>
      deleteAvailableTimeAPI(auth.access_token() ?? "", id),
    mutationKey: ["delete-available-time-mutation"],
    onSuccess: () => {
      toast.success("Successfully deleted appointment time.");
      queryControl.invalidateQueries({ queryKey: ["user-me"] });
    },
    onError: () => {
      toast.error("Failed to delete appointment time.");
    },
  });

  const createAvailableTimeFn = () =>
    createAvailableTime(auth.access_token() ?? "", {
      startTime: fromTime,
      endTime: toTime,
      dayOfWeek: dayOfWeek,
    });

  const createAvailableTimeMutation = useMutation({
    mutationFn: createAvailableTimeFn,
    mutationKey: ["create-new-available-time"],
    onSuccess: () => {
      toast.success(
        `Successfully added a new appointment time on ${dayOfWeek} (${fromTime}) to (${toTime})`,
      );
      queryControl.invalidateQueries({ queryKey: ["user-me"] });
    },
    onError: () => {
      toast.error("Failed to create new appointment time");
    },
  });

  const onClickDeleteTime = (id: number) => {
    deleteAvailableTime.mutate(id);
  };

  function addTimeToAvailables() {
    createAvailableTimeMutation.mutate();
  }

  function onChangeaAvailableTime(type: "to" | "from", value: string) {
    if (type === "from") {
      setFromTime(value);
    } else {
      setToTime(value);
    }

    const parsed = timevalidationSchema.safeParse(value);
    if (!parsed.success) {
      setFormatError(
        "The time format must be in 24H format for example : 02:40:00",
      );
    } else {
      setFormatError(undefined);
    }
  }

  function onChangeDayOfWeek(value: string) {
    setDayOfWeek(value as dayOfWeekEnum);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Select
              defaultValue={dayOfWeek}
              value={dayOfWeek}
              onValueChange={onChangeDayOfWeek}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Day`} />
              </SelectTrigger>
              <SelectContent className="w-full" defaultValue={dayOfWeek}>
                {(
                  Object.keys(dayOfWeekEnum) as Array<
                    keyof typeof dayOfWeekEnum
                  >
                ).map((element) => {
                  return (
                    <SelectItem key={element} value={dayOfWeekEnum[element]}>
                      <div className="flex items-center gap-2">{element}</div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Input
              value={fromTime}
              onChange={(event) =>
                onChangeaAvailableTime("from", event.target.value)
              }
              placeholder="05:30:00"
              maxLength={8}
            />
            To
            <Input
              value={toTime}
              onChange={(event) =>
                onChangeaAvailableTime("to", event.target.value)
              }
              placeholder="06:30:00"
              maxLength={8}
            />
          </div>
          {formatError !== "" && formatError !== undefined ? (
            <h1 className="text-sm text-destructive">{formatError}</h1>
          ) : null}
        </div>
        <div>
          <Button
            onClick={addTimeToAvailables}
            disabled={
              createAvailableTimeMutation.isPending ||
              deleteAvailableTime.isPending ||
              props.isLoadingData
            }
          >
            Add Time
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-row flex-wrap justify-between gap-2">
        {des.availabilityTimes
          .sort((e1, e2) => dayToOrder[e1.dayOfWeek] - dayToOrder[e2.dayOfWeek])
          .map((time) => {
            return (
              <div className="flex w-96 items-center justify-between gap-8 rounded-sm bg-purple-300 px-4 py-2 text-white">
                <div className="flex gap-4">
                  <h1 className="mr-auto">{time.dayOfWeek}</h1>
                  <div className="flex gap-2">
                    <h2>{time.startTime}</h2>-<h2>{time.endTime}</h2>
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => onClickDeleteTime(time.id)}
                    disabled={
                      createAvailableTimeMutation.isPending ||
                      deleteAvailableTime.isPending ||
                      props.isLoadingData
                    }
                    className=""
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
