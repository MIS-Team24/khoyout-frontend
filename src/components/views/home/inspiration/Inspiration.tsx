import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { inspirationImages } from "@/assets";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { API_DesignerPortfolios } from "@/API/types/designer/designer";

type InspirationProps = {
  header: React.ReactNode;
  className?: string;
  portfolios?: API_DesignerPortfolios;
};

export default function Inspiration({
  header,
  className,
  portfolios,
}: InspirationProps) {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <section className="main-container mt-16">
      {header}
      <div className="rounded-[0.5rem] pt-8">
        <Carousel
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.play}
          className="h-full w-full rounded-[0.5rem]"
        >
          <CarouselContent>
            {portfolios?.length === 0 ||
            portfolios === undefined ||
            portfolios === null
              ? inspirationImages.map(({ alt, src }, i) => (
                  <CarouselItem
                    key={`inspiration-image-${i}`}
                    className={cn(
                      "h-full basis-full overflow-hidden rounded-[0.5rem] lg:basis-1/2",
                      className ?? "2xl:basis-1/3",
                    )}
                  >
                    <div className="group relative h-full w-full rounded-[0.5rem]">
                      <img
                        src={src}
                        alt={alt}
                        className="h-full w-full rounded-[0.5rem] object-cover"
                      />
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="gradient absolute inset-0 z-50 hidden items-end justify-center space-x-1 rounded-[0.5rem] pb-4 text-[1.3rem] leading-[2rem] text-white group-hover:flex"
                      >
                        <span>Designed by</span>
                        <Link
                          to="/"
                          className="cursor-pointer font-medium hover:underline"
                        >
                          Bassma Adel
                        </Link>
                      </motion.span>
                    </div>
                  </CarouselItem>
                ))
              : portfolios.map(({ url }, i) => (
                  <CarouselItem
                    key={`inspiration-image-${i}`}
                    className={cn(
                      "h-full basis-full overflow-hidden rounded-[0.5rem] lg:basis-1/2",
                      className ?? "2xl:basis-1/3",
                    )}
                  >
                    <div className="group relative h-full w-full rounded-[0.5rem]">
                      <img
                        src={url}
                        alt={`inspiration-image-${i}`}
                        className="h-full w-full rounded-[0.5rem] object-cover"
                      />
                      <motion.span
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="gradient absolute inset-0 z-50 hidden items-end justify-center space-x-1 rounded-[0.5rem] pb-4 text-[1.3rem] leading-[2rem] text-white group-hover:flex"
                      >
                        <span>Designed by</span>
                        <Link
                          to="/"
                          className="cursor-pointer font-medium hover:underline"
                        >
                          Bassma Adel
                        </Link>
                      </motion.span>
                    </div>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 h-14 w-14 border-none bg-primary text-white hover:bg-[#9E2B7A] hover:text-white" />
          <CarouselNext className="right-4 h-14 w-14 border-none bg-primary text-white hover:bg-[#9E2B7A] hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
}
