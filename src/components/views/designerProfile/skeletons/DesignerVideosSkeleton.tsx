import { Skeleton } from "@/components/ui";
import { Play } from "lucide-react";

const DesignerVideosSkeleton = () => (
  <section className="main-container mt-16">
    <div className="flex w-full items-start justify-between">
      <Skeleton className="mb-0 mt-16 h-[40px] w-[120px] rounded bg-gray-300" />
      <Skeleton className="mb-0 mt-16 h-[35px] w-[140px] rounded bg-gray-300" />
    </div>
    <div className="flex flex-col items-center justify-center gap-8 pt-8 lg:flex-row">
      <div className="relative flex h-[478px] flex-1 cursor-pointer items-center justify-center rounded-[0.25rem]">
        <Skeleton className="absolute h-full w-full rounded-[0.25rem] bg-gray-300" />
        <div className="flex h-[6rem] w-[6rem] animate-pulse items-center justify-center rounded-full bg-gray-400">
          <Play size={50} className="animate-pulse text-gray-500" />
        </div>
      </div>
      <div className="relative flex h-[478px] flex-1 cursor-pointer items-center justify-center rounded-[0.25rem]">
        <Skeleton className="absolute h-full w-full rounded-[0.25rem] bg-gray-300" />
        <div className="flex h-[6rem] w-[6rem] animate-pulse items-center justify-center rounded-full bg-gray-400">
          <Play size={50} className="animate-pulse text-gray-500" />
        </div>
      </div>
    </div>
  </section>
);

export default DesignerVideosSkeleton;
