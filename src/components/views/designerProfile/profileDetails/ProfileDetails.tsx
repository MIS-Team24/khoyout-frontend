import { share, designer1 } from "@/assets";
import { Button } from "@/components/ui";
import { Rating } from "react-simple-star-rating";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileDetails({
  wishlisted,
}: {
  wishlisted: boolean;
}) {
  return (
    <section className="pb-[5.25rem] pt-[1.25rem]">
      <div className="mx-auto w-[90%] md:max-w-[90%]">
        <div className="flex w-full flex-col items-center justify-between gap-y-5 sm:flex-row sm:gap-y-0">
          <div className="flex flex-1 flex-col items-center gap-x-8 sm:flex-row">
            <div className="h-52 w-52 rounded-full sm:h-44 sm:w-44">
              <img
                src={designer1}
                alt="designer-image"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="pt-5  text-center sm:text-start">
              <h1 className="text-[2rem] leading-10">Bassma Adel</h1>
              <p className="text-base leading-normal text-[#49454F]">
                132 finished order
              </p>
              <p className="text-[0.75rem] leading-normal text-[#49454F]">
                <span className="text-[#1EB717]">Opened</span> until 10 pm
              </p>
              <p className="flex items-center justify-center space-x-0.5 pt-2 text-[0.75rem] text-[#49454F] sm:justify-start">
                <span className="pt-0.5">4.5</span>
                <Rating
                  initialValue={4.5}
                  className="relative bottom-[2px] w-full"
                  iconsCount={5}
                  readonly={true}
                  SVGclassName={`inline-block`}
                  allowFraction={true}
                  size={16}
                />
                <span>(124)</span>
              </p>
              <div className="space-x-3 pt-3">
                <Button
                  type="button"
                  className="px[1rem] h-[2rem] w-[6.3rem] rounded-[0.5rem] py-[0.5rem]"
                >
                  Follow
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="px[1rem] h-[2rem] w-[6.3rem] rounded-[0.5rem] py-[0.5rem] text-primary"
                >
                  Message
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-row-reverse gap-x-8">
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
      </div>
    </section>
  );
}
