import { design2 } from "@/assets";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

function ImagesPagination() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPgae, setPostsPerPage] = useState(9);

  const images = Array.from({ length: 21 })
    .fill(0)
    .map((_, i) => <img src={design2} alt="" key={i} />);

  return (
    <section className="">
      <div className="mx-auto flex w-[81rem] flex-col">
        <div className="flex w-[6.625rem] items-center justify-start pb-8">
          <h1 className="text-[2rem] font-normal">Images</h1>
        </div>
        <div className="grid grid-cols-3 gap-6">{images}</div>
        <div className="p-[4.25rem]">
          <Pagination>
            <PaginationContent className="text-[#8C236C] hover:text-[#8C236C]">
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem></PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem></PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem></PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}

export default ImagesPagination;
