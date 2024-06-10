import { useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import { Clock } from "lucide-react";
import { BookingDialog } from "@/components/custom";
import { Service, WorkingDay } from "@/API/types/designer/designer";

type BookingCardProps = {
  bookingDetails: {
    name: string;
    rating: number;
    designerId: string;
    ordersFinished: number;
    workingDays: WorkingDay[];
    services: Service[];
  };
};

export default function BookingCard({ bookingDetails }: BookingCardProps) {
  const [open, setOpen] = useState(false);

  const filteredOpenedTimes = useMemo(() => {
    return bookingDetails.workingDays.filter((x) => x.hours !== "Closed");
  }, [bookingDetails.workingDays]);

  return (
    <div>
      <Card className="px-8 py-10">
        <CardHeader className="p-0">
          <CardTitle className="text-[2.5rem] text-foreground">
            {bookingDetails.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="my-8 flex place-items-center gap-4">
            <p className="text-2xl font-medium text-foreground">
              {bookingDetails.rating.toString().length > 3
                ? bookingDetails.rating.toFixed(1)
                : bookingDetails.rating.toFixed(1)}
            </p>
            <Rating
              initialValue={bookingDetails.rating}
              className="relative bottom-[2px] w-full"
              iconsCount={5}
              readonly={true}
              SVGclassName={`inline-block`}
              allowFraction={true}
              size={32}
            />
            <div className="flex gap-4">
              <p className="text-2xl font-medium text-primary">
                ({bookingDetails.ordersFinished}) Finished Orders
              </p>
            </div>
          </div>
          {filteredOpenedTimes.map(({ day, hours }) => {
            const hoursArr = hours.split(" - ");
            return (
              <div className="mb-6 flex gap-2" key={day}>
                <Clock />
                <p className="text-xl text-foreground">
                  {day} <span className="text-success">Opened</span> from{" "}
                  {hoursArr[0]} to {hoursArr[1]}
                </p>
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="p-0">
          <Button
            onClick={() => setOpen(true)}
            className="h-14 w-full rounded-2xl text-2xl font-medium"
          >
            Book now
          </Button>
        </CardFooter>
      </Card>
      <BookingDialog
        designerName={bookingDetails.name}
        services={bookingDetails.services}
        open={open}
        onChange={setOpen}
        designerId={bookingDetails.designerId}
      />
    </div>
  );
}
