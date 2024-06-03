import { Button } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { Briefcase, Clock, Heart, MapPin } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type DesignerCardProps = {
  id: string;
  name: string;
  ratings: {
    average: number;
    totalCount: number;
  };
  yearsOfExperienceCount: number;
  wishlisted: boolean;
  // address: {
  //   province: string;
  //   city: string;
  // };
  img: string;
  address: string;
  openNow: boolean;
  openUntil: string;
  gender: string;
};

export default function DesignerCard(props: DesignerCardProps) {
  return (
    <div>
      <Card className="flex h-full w-full flex-col items-center gap-4 overflow-hidden border-gray-300 pb-4">
        <div className="h-[280px] w-full rounded-lg">
          <img
            className="h-full w-full rounded-t-lg object-cover"
            src={props.img}
            alt={`${props.name} image`}
          />
        </div>
        <div className="flex w-full flex-col gap-2 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl">{props.name}</h3>
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
              size={20}
            />
            <p className="text-[12px]">({props.ratings.totalCount})</p>
          </div>
          <div className="flex flex-col gap-1.5 text-[12px]">
            <p className="flex items-center gap-2">
              <MapPin size={12} />
              {/* {props.address.province}, {props.address.city} */}
              <span className="whitespace-nowrap text-sm text-[#49454F]">
                {props.address}
              </span>
            </p>
            <p className="flex items-center gap-2 whitespace-nowrap text-sm text-[#49454F]">
              <Clock size={12} />
              <span>
                {props.openNow ? (
                  <span className="text-green-500">Opened</span>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </span>
              {props.openNow ? (
                <span>until - {props.openUntil}</span>
              ) : (
                <span>now</span>
              )}
            </p>
            <p className="flex items-center gap-2 whitespace-nowrap text-sm text-[#49454F]">
              <Briefcase size={12} />
              {props.yearsOfExperienceCount} Years Of Experience
            </p>
            {/* TODO: Fix Gender Icon */}
            <p>{props.gender}</p>
          </div>
        </div>
        <div className="w-full px-4">
          <Link className="w-full">
            <Button className="mt-auto h-8 w-full rounded-full py-0">
              View Profile
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
