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

export default function BookingCard() {
  const data = {
    storeRating: "5.0",
    time: "12:00 PM to 10:00 PM",
    totalReviews: "(124)",
  };
  return (
    <div>
      <Card className="px-8 py-10">
        <CardHeader className="p-0">
          <CardTitle className="text-[2.5rem] text-foreground">
            Diamond Atelier
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="my-8 flex place-items-center gap-4">
            <p className="text-2xl font-medium text-foreground">
              {data.storeRating}
            </p>
            <Rating
              initialValue={5}
              className="relative bottom-[2px] w-full"
              iconsCount={5}
              readonly={true}
              SVGclassName={`inline-block`}
              allowFraction={true}
              size={32}
            />
            {/*Store Rating*/}
            <div className="flex gap-4">
              <p className="text-2xl font-medium text-primary">
                {data.totalReviews}
              </p>
            </div>
          </div>
          <div className="mb-6 flex gap-2">
            <Clock />
            <p className="text-xl text-foreground">
              <span className="text-success">Opened</span> opens from{" "}
              {data.time}
            </p>
          </div>
          <div className="mb-6 flex gap-2">
            <Clock />
            <p className="text-xl text-foreground">
              <span className="text-success">Opened</span> opens from{" "}
              {data.time}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <Button className="h-14 w-full rounded-2xl text-2xl font-medium">
            Book now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
