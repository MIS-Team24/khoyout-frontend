import { useCallback, useState } from "react";
import {
  buttonVariants,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  setItemsPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function CustomPagination({
  itemsPerPage,
  setItemsPage,
  totalItems,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = useCallback((page: number) => {
    setItemsPage(page);
    setCurrentPage(page);
  }, []);

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPage((prev) => prev + 1);
    setItemsPage((prev: number) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    setCurrentPage((prev) => prev - 1);
    setItemsPage((prev: number) => prev - 1);
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-5">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mx-2 cursor-pointer bg-transparent text-base text-primary hover:bg-transparent hover:text-primary",
                currentPage === 1 &&
                  "cursor-not-allowed text-primary/60 hover:text-primary/60",
              )}
              onClick={handlePreviousPage}
            />
          </PaginationItem>
          <div className="flex gap-x-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem
                key={page}
                onClick={() => handlePageChange(page)}
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
                      currentPage === page &&
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
            <PaginationNext
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mx-2 cursor-pointer bg-transparent text-base text-primary hover:bg-transparent hover:text-primary",
                currentPage === totalPages &&
                  "cursor-not-allowed text-primary/60 hover:text-primary/60",
              )}
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
