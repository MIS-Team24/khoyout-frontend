import { Button } from "@/components/ui";
import { Card } from "@/components/ui/card";
import image from "./587b395d3c9d2ea15657587fb9f73660.png";
import { Briefcase, Clock, Heart, MapPin } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type DesignerProfileProps = {
  id: string;
  name: string;
  ratings: {
    average: number;
    totalCount: number;
  };
  yearsOfExperienceCount: number;
  wishlisted: boolean;
  address: {
    province: string;
    city: string;
  };
};

export default function DesignerProfileCard(props: DesignerProfileProps) {
  return (
    <>
      <Card className="flex h-[415px] w-[270px] flex-col items-center gap-4 border-gray-300 bg-transparent px-4 py-4">
        <div className="h-[185px] w-full">
          <img className="h-full w-full rounded-lg object-cover" src={image} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">{props.name}</h1>
            <Button className="group m-0 h-fit bg-transparent p-0 hover:bg-transparent">
              <Heart
                className={cn(
                  "text-primary transition-all",
                  props.wishlisted ? "fill-primary" : "fill-none",
                )}
                strokeWidth={1.5}
              />
              <Heart
                className="absolute fill-primary text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:active:fill-muted-foreground"
                strokeWidth={1.5}
              />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Rating
              initialValue={props.ratings.average}
              className="relative bottom-[2px] w-full"
              iconsCount={5}
              readonly={true}
              SVGclassName={`inline-block`}
              allowFraction={true}
              size={16}
            />
            <p className="text-[12px]">({props.ratings.totalCount})</p>
          </div>
          <div className="flex flex-col gap-1.5 text-[12px]">
            <span className="flex items-center gap-2">
              <MapPin size={12} />
              {props.address.province}, {props.address.city}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={12} />
              <span>
                <span>Open</span> Until 10 AM
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Briefcase size={12} />
              {props.yearsOfExperienceCount} Years Of Experience
            </span>
          </div>
        </div>
        <Link className="w-full">
          <Button className="mt-auto h-8 w-full rounded-full py-0">
            View Profile
          </Button>
        </Link>
      </Card>
    </>
  );
}
