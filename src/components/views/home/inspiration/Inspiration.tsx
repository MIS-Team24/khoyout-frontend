import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { inspirationImages } from "@/assets";

export default function Inspiration() {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <section className="py-[5rem]">
      <div className="mx-auto h-[34rem] w-[90rem]">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-[2rem] font-normal">Inspiration For You</h2>
          <Button
            className="flex items-center gap-x-1 text-[1.2rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
            variant="ghost"
          >
            See more
            <ChevronRight size={25} />
          </Button>
        </div>
        <div className="pt-8">
          <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.play}
          >
            <CarouselContent>
              {inspirationImages.map(({ alt, src }, i) => (
                <CarouselItem
                  key={`inspiration-image-${i}`}
                  className="h-[27.8rem] w-[23rem] basis-1/4 rounded-[0.5rem]"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="h-full w-full rounded-[0.5rem] object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4  border-none bg-primary text-white hover:bg-[#9E2B7A] hover:text-white" />
            <CarouselNext className="right-4  border-none bg-primary text-white hover:bg-[#9E2B7A] hover:text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
