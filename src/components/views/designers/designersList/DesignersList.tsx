import Designers from "./allDesigners/Designers";
import DesignerFilter from "./designersFilter/DesignerFilter";
import { useQuery } from "@tanstack/react-query";
import {
  API_Designer,
  API_DesignersResponse,
} from "@/API/types/designers/designers";
import { getDesigners } from "@/API/designers/designers";
import DesignerPagination from "./designerPagination/DesignerPagination";
import DesignerSorting from "./allDesigners/DesignerSorting";
import { LoadingState } from "@/components/custom";
import DesignerToogleView from "./allDesigners/DesignerToogleView";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

const DesignerLimits = 10;

export default function DesignersList() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [status, setStatus] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getDesignersFn = () => getDesigners(DesignerLimits, pageNumber);

  const designersQuery = useQuery({
    queryKey: ["designers-list"],
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
        <DesignerToogleView handleToggle={handleToggle} />
        <DesignerSorting />
      </div>

      <div className="flex">
        <div
          className={cn(
            `flex h-full flex-col justify-between`,
            status && "duration-500",
            isOpen ? "mr-6 w-[26%]" : "w-[0px]",
          )}
        >
          <DesignerFilter />
        </div>
        <div
          className={cn(
            status && "duration-500",
            isOpen ? "w-[74%]" : "w-full",
          )}
        >
          {designersQuery.isPending ? (
            <div className="flex w-full items-center justify-center">
              <LoadingState />
            </div>
          ) : (
            <Designers
              isOpen={isOpen}
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
