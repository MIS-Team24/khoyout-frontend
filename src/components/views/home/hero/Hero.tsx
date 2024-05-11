import { Input } from "@/components/ui";
import { Search, SlidersHorizontal } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-hero-pattern h-screen w-full object-cover">
      <div className="flex h-full w-full items-center justify-start">
        <div className="flex w-[59%] flex-col gap-y-[4.44rem] pl-0 md:pl-[15.12rem]">
          <div>
            <h1 className="text-[3.5rem] font-medium leading-normal text-primary">
              Khoyout
            </h1>
            <p className="w-[34.25rem] text-[2.2rem] font-normal leading-tight text-[#76526A]">
              Discover the designer who speaks your style language!
            </p>
          </div>
          <form className="w-full">
            <div className="flex h-[4.5rem] items-center justify-center gap-x-0.5 rounded-xl bg-[#F3EBF1] p-4 ring-2 ring-transparent focus-within:ring-primary">
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
    </section>
  );
}
