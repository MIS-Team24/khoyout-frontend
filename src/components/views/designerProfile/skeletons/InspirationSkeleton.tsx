import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Skeleton,
} from "@/components/ui";
import { Image } from "lucide-react";

type InspirationSkeletonProps = {
  arrayLength: number;
};

const InspirationSkeleton = ({ arrayLength }: InspirationSkeletonProps) => (
  <section className="main-container mt-16">
    <div className="flex w-full items-start justify-between">
      <Skeleton className="mb-0 mt-16 h-[40px] w-[120px] rounded bg-gray-100" />
      <Skeleton className="mb-0 mt-16 h-[35px] w-[140px] rounded bg-gray-100" />
    </div>
    <div className="rounded pt-8">
      <Carousel className="relative h-full w-full rounded">
        <CarouselContent>
          {Array.from({ length: arrayLength })
            .fill(0)
            .map((_, i) => (
              <CarouselItem
                key={`inspiration-image-${i}`}
                className={
                  "h-full basis-full overflow-hidden rounded-[0.5rem] lg:basis-1/2 2xl:basis-1/3"
                }
              >
                <div className="relative flex h-[574px] w-full items-center justify-center rounded">
                  <Skeleton className="absolute h-full w-full rounded bg-gray-100" />
                  <Image size={50} className="animate-pulse text-gray-200" />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  </section>
);

export default InspirationSkeleton;
