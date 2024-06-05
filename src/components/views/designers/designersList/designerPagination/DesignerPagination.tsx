import { API_Pagination } from "@/API/types/general/pagination";
import { Button } from "@/components/ui";
import { Clamp } from "@/utilities/clamp";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  buttonVariants,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type DesignerPaginationProps = {
  pagination: API_Pagination;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function DesignerPagination({
  pagination,
  setPageNumber,
}: DesignerPaginationProps) {
  const { prev_page, next_page } = pagination;

  return (
    <>
      <div className="flex w-full items-center justify-center gap-x-5 py-16">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "mx-2 cursor-pointer bg-transparent text-base text-primary hover:bg-transparent hover:text-primary",
                  pagination.current_page === 1 &&
                    "cursor-not-allowed text-primary/60 hover:text-primary/60",
                )}
                onClick={() =>
                  setPageNumber((prevValue) =>
                    Clamp(prevValue - 1, 0, pagination.total_pages - 1),
                  )
                }
                disabled={prev_page === null}
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
              </Button>
            </PaginationItem>
            <div className="flex gap-x-4">
              {Array.from(
                {
                  length: pagination?.total_pages ? pagination?.total_pages : 2,
                },
                (_, i) => i + 1,
              ).map((page) => (
                <PaginationItem
                  key={page}
                  onClick={() => setPageNumber(page)}
                  className="cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <PaginationLink
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "rounded-xl text-primary hover:bg-primary hover:text-white",
                        pagination.current_page === page &&
                          "bg-primary text-white hover:bg-primary hover:text-white",
                      )}
                    >
                      {page}
                    </PaginationLink>
                  </motion.div>
                </PaginationItem>
              ))}
            </div>
            <PaginationItem>
              <Button
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "mx-2 cursor-pointer bg-transparent text-base text-primary hover:bg-transparent hover:text-primary",
                  pagination.current_page === pagination.total_pages &&
                    "cursor-not-allowed text-primary/60 hover:text-primary/60",
                )}
                onClick={() =>
                  setPageNumber((prevValue) =>
                    Clamp(prevValue + 1, 0, pagination.total_pages - 1),
                  )
                }
                disabled={next_page === null}
              >
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
