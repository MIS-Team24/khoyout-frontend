import { Skeleton } from "@/components/ui";
import { Image } from "lucide-react";

const DesigenrProfileSkeleton = () => (
  <section className="main-container mt-16">
    <div className="flex w-full flex-col items-center justify-between gap-y-3 sm:flex-row sm:gap-y-0">
      <div className="flex w-full flex-col items-center gap-x-3 sm:flex-row lg:w-3/5">
        <div className="relative flex h-52 w-52 items-center justify-center rounded-full rounded-t-lg sm:h-44 sm:w-44">
          <Skeleton className="absolute h-52 w-52 rounded-full bg-gray-300 sm:h-44 sm:w-44" />
          <Image size={35} className="animate-pulse text-gray-500" />
        </div>
        <div className="space-y-2 pt-5 text-center sm:text-start">
          <Skeleton className="h-[35px] w-[200px] rounded bg-gray-300" />
          <Skeleton className="h-[20px] w-[140px] rounded bg-gray-300" />
          <Skeleton className="h-[15px] w-[110px] rounded bg-gray-300" />
          <Skeleton className="h-[20px] w-[140px] rounded bg-gray-300" />
          <div className="flex items-center justify-between space-x-3">
            <Skeleton className="h-[28px] w-[100px] rounded bg-gray-300" />
            <Skeleton className="h-[28px] w-[100px] rounded bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-x-4 lg:w-2/5">
        <Skeleton className="h-[38px] w-[38px] animate-pulse rounded bg-gray-300 text-gray-100" />
        <Skeleton className="h-[38px] w-[38px] animate-pulse rounded bg-gray-300 text-gray-100" />
      </div>
    </div>
  </section>
);

export default DesigenrProfileSkeleton;
