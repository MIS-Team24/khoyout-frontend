import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import { Clock, Image } from "lucide-react";

type ServiceSkeletonProps = {
  membersLength: number;
  reviewsLength: number;
  serviceLength: number;
};

const ServiceSkeleton = ({
  membersLength,
  reviewsLength,
  serviceLength,
}: ServiceSkeletonProps) => (
  <div className="main-container">
    <Skeleton className="mb-8 mt-16 h-[40px] w-[100px] rounded bg-gray-300" />
    <div className="mb-8 flex flex-col place-items-start gap-8 pb-0 text-xl lg:flex-row">
      <div className="mx-auto flex w-full flex-col gap-[4.25rem] lg:w-3/5">
        <section>
          <div>
            <div className="flex flex-col gap-6">
              {Array.from({ length: serviceLength })
                .fill(0)
                .map((_, i) => (
                  <Card className="rounded-2xl" key={`service-${i}`}>
                    <CardHeader className="gap-4">
                      <CardTitle className="font-medium text-foreground">
                        <Skeleton className="h-[28px] w-[200px] rounded bg-gray-300" />
                      </CardTitle>
                      <CardDescription className="text-xl text-secondary">
                        <Skeleton className="h-[28px] w-full rounded bg-gray-300" />
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex place-items-center justify-between">
                      <Skeleton className="h-[30px] w-[100px] rounded bg-gray-300" />
                      <Skeleton className="h-[35px] w-[80px] rounded bg-gray-300" />
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </section>
        <TeamSkeleton membersLength={membersLength} />
        <ReviewsSkeleton reviewsLength={reviewsLength} />
      </div>
      <div className="sticky top-24 lg:w-2/5">
        <BookingCardSkeleton />
      </div>
    </div>
  </div>
);

export default ServiceSkeleton;

const TeamSkeleton = ({ membersLength }: { membersLength: number }) => (
  <section>
    <div>
      <Skeleton className="mb-8 mt-16 h-[40px] w-[100px] rounded bg-gray-300" />
      <div className="no-scrollbar flex flex-row gap-6 overflow-auto whitespace-nowrap">
        {Array.from({ length: membersLength })
          .fill(0)
          .map((_, i) => (
            <Card className="min-w-48 p-2" key={`team-member-${i}`}>
              <CardContent className="p-0 text-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded">
                  <Skeleton className="absolute h-full w-full rounded bg-gray-300" />
                  <Image size={50} className="animate-pulse text-gray-400" />
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <Skeleton className="mb-2 h-[28px] w-[100px] rounded bg-gray-300" />
                  <Skeleton className="h-[15px] w-[140px] rounded bg-gray-300" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  </section>
);

const ReviewsSkeleton = ({ reviewsLength }: { reviewsLength: number }) => (
  <section className="lg:mb-[4.25rem]">
    <div>
      <div className="mb-8">
        <Skeleton className="mb-8 h-[40px] w-[100px] rounded bg-gray-300" />
        <Skeleton className="h-[40px] w-[180px] rounded bg-gray-300" />
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-[40px] w-[60px] rounded bg-gray-300" />
          <Skeleton className="h-[40px] w-[80px] rounded bg-gray-300" />
        </div>
      </div>
      <div>
        {Array.from({ length: reviewsLength })
          .fill(0)
          .map((_, i) => (
            <div
              key={`client-${i}`}
              className="mb-8 flex flex-col gap-2 lg:w-11/12"
            >
              <div className="flex gap-2">
                <div>
                  <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-[28px] w-[80px] rounded bg-gray-300" />
                  <Skeleton className="h-[20px] w-[60px] rounded bg-gray-300" />
                  <Skeleton className="h-[30px] w-[80px] rounded bg-gray-300" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-[28px] w-full rounded bg-gray-300" />
                <Skeleton className="h-[28px] w-full rounded bg-gray-300" />
              </div>
            </div>
          ))}
      </div>
    </div>
  </section>
);

const BookingCardSkeleton = () => (
  <div>
    <Card className="px-8 py-10">
      <CardHeader className="p-0">
        <CardTitle className="text-[2.5rem] text-foreground">
          <Skeleton className="h-[80px] w-[200px] rounded bg-gray-300" />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="my-8 flex place-items-center gap-4">
          <Skeleton className="h-[32px] w-[33px] rounded bg-gray-300" />
          <Skeleton className="h-[32px] w-[180px] rounded bg-gray-300" />
          <Skeleton className="h-[32px] w-[40px] rounded bg-gray-300" />
        </div>
        <div className="mb-6 flex gap-2">
          <Clock className="animate-pulse text-gray-300" />
          <Skeleton className="h-[28px] w-[377px] rounded bg-gray-300" />
        </div>
        <div className="mb-6 flex gap-2">
          <Clock className="animate-pulse text-gray-300" />
          <Skeleton className="h-[28px] w-[377px] rounded bg-gray-300" />
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Skeleton className="h-14 w-full rounded-2xl bg-gray-300" />
      </CardFooter>
    </Card>
  </div>
);
