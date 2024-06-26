import { share, designer1 } from "@/assets";
import { Button } from "@/components/ui";
import { Rating } from "react-simple-star-rating";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileDetailsProps = {
  designerDetails: {
    avatarUrl: string;
    name: string;
    ordersFinished: number;
    openNow: boolean;
    openUntil: string;
    rating: number;
  };
  wishlisted: boolean;
};

export default function ProfileDetails({
  designerDetails,
  wishlisted,
}: ProfileDetailsProps) {
  return (
    <section className="main-container mt-16">
      <div className="flex w-full flex-col items-center justify-between gap-y-3 sm:flex-row sm:gap-y-0">
        <div className="flex w-full flex-col items-center gap-x-8 sm:flex-row lg:w-3/5">
          <div className="h-52 w-52 rounded-full sm:h-44 sm:w-44">
            <img
              src={designerDetails.avatarUrl ?? designer1}
              alt={`${name}-designer-avatar`}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="pt-5 text-center sm:text-start">
            <h1 className="text-[2rem] leading-10">{designerDetails.name}</h1>
            <p className="text-base leading-normal text-[#49454F]">
              {designerDetails.ordersFinished} Finished Order
            </p>
            <p className="flex items-center gap-2 whitespace-nowrap pt-1 text-[0.75rem] text-[#49454F]">
              <span>
                {designerDetails.openNow ? (
                  <span className="text-green-500">Opened</span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </span>
              {designerDetails.openNow ? (
                <span>until - {designerDetails.openUntil}</span>
              ) : (
                <span>now</span>
              )}
            </p>
            <p className="flex items-center justify-center space-x-0.5 pt-3 text-[0.75rem] text-[#49454F] sm:justify-start">
              <span className="pt-0.5">
                {designerDetails.rating.toString().length > 3
                  ? designerDetails.rating.toFixed(1)
                  : designerDetails.rating}
              </span>
              <Rating
                initialValue={designerDetails.rating}
                className="relative bottom-[2px] w-full"
                iconsCount={5}
                readonly={true}
                SVGclassName={`inline-block`}
                allowFraction={true}
                size={16}
              />
              <span>({designerDetails.ordersFinished})</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-x-8 lg:w-2/5">
          <Button className="group m-0 h-fit bg-transparent p-0 hover:bg-transparent">
            <Heart
              className={cn(
                "text-primary transition-all",
                wishlisted ? "fill-primary" : "fill-none",
              )}
              size={32}
            />
            <Heart
              className="absolute fill-primary text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:active:fill-muted-foreground"
              size={32}
            />
          </Button>
          <Button className="group m-0 h-fit bg-transparent p-0 hover:bg-transparent">
            <img src={share} alt="share-icon" className="cursor-pointer" />
          </Button>
        </div>
      </div>
    </section>
  );
}
