import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Button } from "@/components/ui";
import Team from "./team/Team";
import Reviews from "./reviews/Reviews";
import BookingCard from "./stickyBookingCard/StickyBookingCard";
import { SectionHeader } from "@/components/custom";
import {
  Review,
  Service as ServiceBody,
  TeamMember,
} from "@/API/types/designer/designer";

type ServiceProps = {
  services: ServiceBody[];
  teamMembers: TeamMember[];
  reviews: Review[];
  ratingDetails: {
    rating: number;
    ordersFinished: number;
  };
};

export default function Service({
  services,
  teamMembers,
  reviews,
  ratingDetails,
}: ServiceProps) {
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
                        From <span>{item.price}</span>
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-2xl px-6 py-3 text-xl font-medium text-primary "
                      >
                        Book
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <Team teamMembers={teamMembers} />
          <Reviews reviews={reviews} ratingDetails={ratingDetails} />
        </div>
        <div className="sticky top-24 lg:w-2/5">
          <BookingCard />
        </div>
      </div>
    </div>
  );
}
