import { Input } from "@/components/ui";
import { Search, SlidersHorizontal } from "lucide-react";
import { heroImg } from "@/assets";

export default function Hero() {
  return (
    <section>
      <div className="main-container relative h-[60rem] w-full">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute z-10 flex h-full w-full items-center justify-start">
          <div className="flex w-full flex-col items-center gap-y-[4.44rem] px-4 md:w-[80%] md:items-start md:pl-[10rem] lg:w-[56%]">
            <div className="w-full">
              <h1 className="text-center text-[3.5rem] font-medium leading-normal text-primary md:text-start">
                Khoyout
              </h1>
              <p className="w-full text-center text-[2.2rem] font-normal leading-tight text-[#76526A] md:w-[34.25rem] md:text-start">
                Discover the designer who speaks your style language!
              </p>
            </div>
            <form className="w-full">
              <div className="flex h-[4rem] items-center justify-center gap-x-0.5 rounded-xl bg-[#F3EBF1] p-4 ring-1 ring-transparent focus-within:ring-primary">
                <Search size={27} className="text-secondary" />
                <Input
                  type="search"
                  placeholder="Search for designer"
                  className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                <SlidersHorizontal size={27} className="text-secondary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
