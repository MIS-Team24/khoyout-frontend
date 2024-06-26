import Designers from "./allDesigners/Designers";
import DesignerFilter from "./designersFilter/DesignerFilter";
import { useQuery } from "@tanstack/react-query";
import {
  API_Designer,
  API_DesignersResponse,
} from "@/API/types/designers/designers";
import { FilterType, getDesigners } from "@/API/designers/designers";
import DesignerPagination from "./designerPagination/DesignerPagination";
import DesignerSorting from "./allDesigners/DesignerSorting";
import DesignerToogleView from "./allDesigners/DesignerToogleView";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, Skeleton } from "@/components/ui";
import { Heart, Image } from "lucide-react";
import { Error } from "@/components/custom";

type DesignersListProps = {
  name: string;
};

const DesignerLimits = 12;

export default function DesignersList({ name }: DesignersListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [status, setStatus] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [filterType, SetFilterType] = useState<FilterType>({
    yearsOfExperience: 0,
  } as FilterType);

  console.log(filterType);

  useEffect(() => {
    SetFilterType((prev) => ({ ...prev, name }));
  }, [name]);

  const getDesignersFn = () =>
    getDesigners(DesignerLimits, pageNumber, filterType);

  const designersQuery = useQuery({
    queryKey: [
      "designers-list",
      pageNumber,
      filterType.gender,
      filterType.location,
      filterType.yearsOfExperience,
      filterType.minRating,
      filterType.openNow,
      filterType.name,
      filterType.sortBy,
    ],
    queryFn: getDesignersFn,
  });

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
    setStatus(true);
    setTimeout(() => setStatus(false), 500);
  }, [isOpen]);

  return (
    <div className="main-container mt-16">
      <div className="flex justify-between pb-8">
        <div className="space-x-2">
          <DesignerToogleView handleToggle={handleToggle} />
          <Button
            variant="ghost"
            className="h-[3rem] w-[8rem] rounded-lg text-base font-medium text-gray-300 hover:bg-transparent hover:text-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
            onClick={() =>
              SetFilterType({
                yearsOfExperience: 0,
                name: "",
              } as FilterType)
            }
          >
            Clear filters
          </Button>
        </div>
        <DesignerSorting setFilterType={SetFilterType} />
      </div>

      <div className="flex justify-between">
        <div
          className={cn(
            `flex h-full flex-col justify-between overflow-hidden pb-10 transition-all`,
            status && "duration-500",
            isOpen ? "w-[22%] scale-100 opacity-100" : "w-0 scale-0 opacity-0",
          )}
        >
          <DesignerFilter
            filterType={filterType}
            setFilterType={SetFilterType}
          />
        </div>
        <div
          className={cn(
            "pl-6",
            status && "duration-500",
            isOpen ? "w-[78%]" : "w-full",
          )}
        >
          {designersQuery.isError ? (
            <Error
              title="We didn't find a match"
              description="Make sure all words are spelled correctly or select from categories"
            />
          ) : designersQuery.isPending ? (
            <DesignersSkeleton />
          ) : (
              (designersQuery.data?.data as API_DesignersResponse)
                .designers as API_Designer[]
            ).length === 0 ? (
            <Error
              title="We didn't find a match"
              description="Make sure all words are spelled correctly or select from categories"
            />
          ) : (
            <Designers
              desigenrs={
                ((designersQuery.data?.data as API_DesignersResponse)
                  .designers as API_Designer[]) ?? []
              }
            />
          )}
        </div>
      </div>
      {designersQuery.isError ? (
        <div className="hidden"></div>
      ) : designersQuery.isPending ? (
        <DesigenrPaginationSkeleton />
      ) : (
        <DesignerPagination
          pagination={
            designersQuery.isPending
              ? {}
              : designersQuery.data?.data.pagination ?? {}
          }
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
}

const DesignersSkeleton = () => {
  return (
    <section>
      <div className="relative grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="h-[540px] flex-1 rounded-lg" key={i}>
            <div className="relative flex h-[280px] w-full items-center justify-center rounded-t-lg">
              <Skeleton className="absolute h-full w-full rounded-t-lg bg-gray-300" />
              <Image size={30} className="animate-pulse text-gray-500" />
            </div>
            <div className="mt-3 flex w-full items-center justify-between gap-2 px-1">
              <Skeleton className="h-8 w-[9rem] rounded bg-gray-300" />
              <Heart
                strokeWidth={1.5}
                className="animate-pulse text-gray-500"
              />
            </div>
            <div className="mt-2 space-y-2 px-1">
              <Skeleton className="h-4 w-[9rem] rounded bg-gray-300" />
              <Skeleton className="h-4 w-[7.75rem] rounded bg-gray-300" />
              <Skeleton className="h-3 w-[8rem] rounded bg-gray-300" />
              <Skeleton className="h-3 w-[4rem] rounded bg-gray-300" />
            </div>
            <div className="mt-2 px-4">
              <Skeleton className="h-8 w-full rounded-full bg-gray-300 py-5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const DesigenrPaginationSkeleton = () => {
  return (
    <div className="-mt-10 flex w-full items-center justify-center gap-x-2 pb-16">
      <div className="flex gap-x-2">
        <Skeleton className="h-10 w-20 rounded" />
        {Array.from({ length: 13 }).map((_, i) => (
          <Skeleton key={i} className="rounded px-5 py-4" />
        ))}
        <Skeleton className="h-10 w-20 rounded" />
      </div>
    </div>
  );
};
