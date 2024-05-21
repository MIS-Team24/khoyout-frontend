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
      <div className="main-container my-16">
        <h1 className="pb-8 text-[2rem] font-normal leading-normal">Images</h1>
        <div className="grid w-full grid-cols-1 gap-5 pb-[3.5rem] sm:grid-cols-2 lg:grid-cols-3">
          {currentItems.map(({ alt, src }, index) => (
            <div key={index} className="h-[35.4rem] w-full rounded-[0.5rem]">
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
