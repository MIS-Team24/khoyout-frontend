import { heart, share, designer1 } from "@/assets";
import { Button } from "@/components/ui";
import { Rating } from "react-simple-star-rating";

export default function ProfileDetails() {
  return (
    <section className="pb-[5.25rem] pt-[1.25rem]">
      <div className="mx-auto w-full max-w-[80%]">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-x-8">
            <div className="h-44 w-44 rounded-full">
              <img
                src={designer1}
                alt="designer-image"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="pt-5">
              <h1 className="text-[2rem] leading-10">Bassma Adel</h1>
              <p className="text-base leading-normal text-[#49454F]">
                132 finished order
              </p>
              <p className="text-[0.75rem] leading-normal text-[#49454F]">
                <span className="text-[#1EB717]">Opened</span> until 10 pm
              </p>
              <p className="flex items-center space-x-0.5 pt-2 text-[0.75rem] text-[#49454F]">
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
          <div className="flex flex-row-reverse gap-x-8">
            <img src={heart} alt="heart-icon" className="cursor-pointer" />
            <img src={share} alt="share-icon" className="cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
}
