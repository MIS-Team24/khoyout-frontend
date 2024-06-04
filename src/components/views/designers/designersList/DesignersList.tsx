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
import { LoadingState } from "@/components/custom";
import DesignerToogleView from "./allDesigners/DesignerToogleView";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

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

  // console.log(filterType);

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
    <div className="main-container">
      <div className="flex justify-between pb-8">
        <div className="space-x-2">
          <DesignerToogleView handleToggle={handleToggle} />
          <Button
            variant="ghost"
            className="h-[3rem] w-[8rem] rounded-lg text-base font-medium text-gray-300 hover:bg-transparent hover:text-gray-500 focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
            onClick={() => SetFilterType({} as FilterType)}
          >
            Clear filters
          </Button>
        </div>
        <DesignerSorting setFilterType={SetFilterType} />
      </div>

      <div className="flex">
        <div
          className={cn(
            `flex h-full flex-col justify-between overflow-hidden transition-all`,
            status && "duration-500",
            isOpen
              ? "mr- w-[22%] scale-100 opacity-100"
              : "w-[0px] scale-0 opacity-0",
          )}
        >
          <DesignerFilter
            filterType={filterType}
            setFilterType={SetFilterType}
          />
        </div>
        <div
          className={cn(
            "",
            status && "duration-500",
            isOpen ? "w-[78%]" : "w-full",
          )}
        >
          {designersQuery.isPending ? (
            <div className="flex w-full items-center justify-center">
              <LoadingState />
            </div>
          ) : (
            <Designers
              desigenrs={
                (designersQuery.data?.data as API_DesignersResponse)
                  .designers as API_Designer[]
              }
            />
          )}
        </div>
      </div>
      <DesignerPagination
        pagination={
          designersQuery.isPending ? {} : designersQuery.data?.data.pagination
        }
        setPageNumber={setPageNumber}
        DesignerLimits={DesignerLimits}
      />
    </div>
  );
}
