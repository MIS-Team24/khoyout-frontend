import { Play } from "lucide-react";
import { designerVideo1 } from "@/assets";
import { useMemo, useState } from "react";
import { CustomPagination } from "@/components/custom";

export default function DesignerGalleryVideos() {
  const videos: string[] = Array.from({ length: 9 }).fill(
    designerVideo1,
  ) as string[];
  const [currentItemsPage, setItemsPage] = useState(1);

  const itemsPerPage = 3;
  const currentItems = useMemo(() => {
    const lastItem = currentItemsPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    return videos.slice(firstItem, lastItem);
  }, [currentItemsPage, itemsPerPage, videos]);

  return (
    <section>
      <div className="mx-auto flex w-full max-w-[90rem] flex-col px-[9rem] py-16">
        <div className="pb-8">
          <h1 className="text-[2rem] font-normal leading-normal">Videos</h1>
        </div>
        <div className="grid grid-cols-3 place-items-center gap-6 pb-[3.5rem]">
          {currentItems.map((video, index) => (
            <div className="group relative h-full flex-1 cursor-pointer rounded-[0.25rem]">
              <img
                src={video}
                alt={`designer-video-${index}`}
                className="h-full w-full rounded-[0.25rem] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-[0.25rem] bg-black/30">
                <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full bg-primary group-hover:opacity-80">
                  <Play className="fill-white text-white" size={35} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <CustomPagination
          totalItems={videos.length}
          itemsPerPage={itemsPerPage}
          setItemsPage={setItemsPage}
        />
      </div>
    </section>
  );
}
