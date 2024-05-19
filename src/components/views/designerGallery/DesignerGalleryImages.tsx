import { designerGalleryImages } from "@/assets";
import { CustomPagination } from "@/components/custom";
import { useMemo, useState } from "react";

export default function DesignerGalleryImages() {
  // const [posts, setPosts] = useState([]);
  const [currentItemsPage, setItemsPage] = useState(1);
  const itemsPerPage = 9;
  const currentItems = useMemo(() => {
    const lastItem = currentItemsPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    return designerGalleryImages.slice(firstItem, lastItem);
  }, [currentItemsPage, itemsPerPage, designerGalleryImages]);

  return (
    <section>
      <div className="mx-auto flex w-full max-w-[90rem] flex-col px-[9rem] py-16">
        <div className="pb-8">
          <h1 className="text-[2rem] font-normal leading-normal">Images</h1>
        </div>
        <div className="grid grid-cols-3 place-items-center gap-6 pb-[3.5rem]">
          {currentItems.map(({ alt, src }, index) => (
            <div
              key={index}
              className="h-[27.8125rem] w-[23rem] rounded-[0.5rem]"
            >
              <img
                src={src}
                alt={alt}
                className="h-full w-full rounded-[0.5rem] object-cover"
              />
            </div>
          ))}
        </div>
        <CustomPagination
          totalItems={designerGalleryImages.length}
          itemsPerPage={itemsPerPage}
          setItemsPage={setItemsPage}
        />
      </div>
    </section>
  );
}
