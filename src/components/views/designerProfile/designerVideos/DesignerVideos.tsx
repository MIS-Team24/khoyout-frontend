import { buttonVariants } from "@/components/ui";
import { ChevronRight, Play } from "lucide-react";
import { designerVideo1, designerVideo2 } from "@/assets";
import { SectionHeader } from "@/components/custom";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export default function DesignerVideos() {
  return (
    <section className="main-container mt-16">
      <div className="flex w-full items-center justify-between">
        <SectionHeader className="my-0" title="Videos" />
        <Link
          to="/gallery/videos"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex items-center gap-x-1 text-base font-medium leading-normal text-primary hover:bg-transparent hover:text-primary md:text-[1.2rem]",
          )}
        >
          See more
          <ChevronRight size={25} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-8 pt-8 lg:flex-row">
        <div className="group relative h-full flex-1 cursor-pointer rounded-[0.25rem]">
          <img
            src={designerVideo1}
            alt="designer-video-1"
            className="h-full w-full rounded-[0.25rem] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-[0.25rem] bg-black/30">
            <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-primary group-hover:opacity-80">
              <Play className="fill-white text-white" size={35} />
            </div>
          </div>
        </div>
        <div className="group relative h-full flex-1 cursor-pointer rounded-[0.25rem]">
          <img
            src={designerVideo2}
            alt="designer-video-2"
            className="h-full w-full rounded-[0.25rem] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center rounded-[0.25rem] bg-black/30">
            <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-primary group-hover:opacity-80">
              <Play className="fill-white text-white" size={35} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
