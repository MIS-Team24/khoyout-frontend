import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";
import Reviews from "./reviews/Reviews";
import BookingCard from "./stickyBookingCard/StickyBookingCard";
import { SectionHeader } from "@/components/custom";
import {
  Review,
  Service as ServiceBody,
  TeamMember,
  WorkingDay,
} from "@/API/types/designer/designer";
import { useState } from "react";

type ServiceProps = {
  services: ServiceBody[];
  teamMembers: TeamMember[];
  reviews: Review[];
  ratingDetails: {
    rating: number;
    ordersFinished: number;
  };
  name: string;
  workingDays: WorkingDay[];
  designerId: string;
};

export default function Service({
  services,
  reviews,
  ratingDetails,
  name,
  workingDays,
  designerId,
}: ServiceProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="main-container">
      <SectionHeader title="Services" />
      <div className="mb-8 flex flex-col place-items-start gap-8 pb-0 text-xl lg:flex-row">
        <div className="mx-auto flex w-full flex-col gap-[4.25rem] lg:w-3/5">
          <section>
            <div>
              <div className="flex flex-col gap-6">
                {services.map((item, i) => (
                  <Card
                    className="rounded-2xl"
                    key={`
                    service-${i}
                  `}
                  >
                    <CardHeader className="gap-4">
                      <CardTitle className="font-medium text-foreground">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xl text-secondary">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex place-items-center justify-between">
                      <p className="text-xl font-medium text-foreground">
                        From <span>{item.price}</span> EGP
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-2xl px-6 py-3 text-xl font-medium text-primary "
                        onClick={() => setOpen(true)}
                      >
                        Book
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <Reviews reviews={reviews} ratingDetails={ratingDetails} />
        </div>
        <div className="sticky top-24 lg:w-2/5">
          <BookingCard
            bookingDetails={{
              name,
              rating: ratingDetails.rating,
              ordersFinished: ratingDetails.ordersFinished,
              workingDays,
              services,
              designerId,
            }}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
}
