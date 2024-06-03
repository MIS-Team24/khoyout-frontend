import { NavigatablePageWrapper, SectionHeader } from "@/components/custom";
import {
  ProfileDetails,
  AboutDesigner,
  DesignerVideos,
  Service,
} from "@/components/views/designerProfile";
import { Inspiration } from "@/components/views/home";
import { buttonVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export default function DesignerProfile() {
  return (
    <NavigatablePageWrapper>
      {/* TODO: Make it dynamic */}
      <ProfileDetails wishlisted={false} />
      <AboutDesigner />
      <Inspiration header={<Header />} />
      <DesignerVideos />
      <Service />
    </NavigatablePageWrapper>
  );
}

function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <SectionHeader className="my-0" title="Photos" />
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
