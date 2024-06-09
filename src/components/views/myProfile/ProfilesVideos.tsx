import { designerVideo1, designerVideo2 } from "@/assets";
import { Play } from "lucide-react";

export default function DesignerVideos() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
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
    </div>
  );
}
