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

export default function Service() {
  const data = [
    {
      title: "Design from scratch",
      description:
        '"Crafting your vision from the ground up – our design from scratch service brings your ideas to life with creativity and precision."',
      price: "250 EGP",
    },
    {
      title: "Design implementation",
      description:
        '"Expertly executing your designs with precision and passion."',
      price: "200 EGP",
    },
    {
      title: "Hand made",
      description:
        '"Artisanal elegance tailored just for you – where every stitch tells a story."',
      price: "300 EGP",
    },
    {
      title: "Redesign",
      description:
        '"Elevating tradition with a modern twist – our redesign service breathes new life into timeless garments."',
      price: "200 EGP",
    },
  ];
  return (
    <div className="main-container">
      <p className="mb-8 mt-16 text-[2rem] text-foreground">Services</p>
      <div className="mb-8 flex flex-col place-items-start gap-8 pb-0 text-xl lg:flex-row">
        <div className="mx-auto flex w-full flex-col gap-[4.25rem] lg:w-3/5">
          <section>
            <div>
              <div className="flex flex-col gap-6">
                {data.map((item, i) => (
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
          <Team />
          <Reviews />
        </div>
        <div className="sticky top-24 lg:w-2/5">
          <BookingCard />
        </div>
      </div>
    </div>
  );
}
