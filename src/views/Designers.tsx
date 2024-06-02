import { NavigatablePageWrapper, SectionHeader } from "@/components/custom";
import { buttonVariants } from "@/components/ui";

import { DesignersList, Search } from "@/components/views/designers";
import { Inspiration } from "@/components/views/home";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export default function Designers() {
  return (
    <NavigatablePageWrapper>
      <Search />
      <Inspiration header={<Header />} />
      <DesignersList />
    </NavigatablePageWrapper>
  );
}

function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <SectionHeader className="my-0" title="Inspiration For You" />
      <Link
        to="/gallery/images"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-x-1 text-base font-medium leading-normal text-primary hover:bg-transparent hover:text-primary md:text-[1.2rem]",
        )}
      >
        See more
        <ChevronRight size={25} />
      </Link>
    </div>
  );
}
