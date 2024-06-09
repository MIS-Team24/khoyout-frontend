import { Skeleton } from "@/components/ui";
import { Map } from "lucide-react";

const AboutSkeleton = () => (
  <section className="main-container">
    <Skeleton className="mb-8 mt-16 h-[40px] w-[100px] rounded bg-gray-300" />
    <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-0">
      <div className="flex flex-1 flex-col gap-y-[2.5rem]">
        <div className="space-y-2">
          <Skeleton className="h-[28px] w-[710px] rounded bg-gray-300" />
          <Skeleton className="h-[28px] w-[710px] rounded bg-gray-300" />
          <Skeleton className="h-[28px] w-[710px] rounded bg-gray-300" />
        </div>
        <div className="space-y-8">
          <Skeleton className="h-[32px] w-[180px] rounded bg-gray-300" />
          <div className="space-y-3.5">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div className="flex justify-between">
                  <Skeleton className="h-[25px] w-[100px] rounded bg-gray-300" />
                  {i === 6 ? (
                    <Skeleton className="h-[28px] w-[100px] rounded bg-gray-300" />
                  ) : (
                    <Skeleton className="h-[28px] w-[192px] rounded bg-gray-300" />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex h-[30rem] flex-1 flex-col justify-between gap-y-4 lg:h-full">
        <div className="relative flex h-full w-full items-center justify-center">
          <Skeleton className="absolute inset-0 rounded bg-gray-300" />
          <Map size={45} className="animate-pulse text-gray-500" />
        </div>
        <div className="mt-auto flex w-full flex-col items-center justify-between gap-y-4 sm:flex-row sm:gap-y-0">
          <div className="h-full flex-1">
            <Skeleton className="h-[28px] w-[calc(100%-80px)] rounded bg-gray-300" />
          </div>
          <div className="flex h-full flex-1 justify-end">
            <Skeleton className="h-[28px] w-[calc(100%-80px)] rounded bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSkeleton;
