import { clients, quotes } from "@/assets";
import { Button } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { Rating } from "react-simple-star-rating";

function Clients() {
  return (
    <section className="mb-20 mt-10">
      <div className="mx-auto h-full min-h-[36rem] w-full max-w-[90rem]">
        <div className="flex items-center justify-between px-4 pb-8 md:px-0">
          <h2 className="text-[1.3rem] font-normal sm:text-[1.5rem] md:text-[2rem]">
            What Our Clients Say
          </h2>
          <Button
            className="flex items-center gap-x-1 text-base font-medium leading-normal text-primary hover:bg-transparent hover:text-primary md:text-[1.2rem]"
            variant="ghost"
          >
            See more
            <ChevronRight size={25} />
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:px-0 xl:grid-cols-3">
          {clients.map(({ src, alt, name, review }, i) => (
            <div
              key={`client-${i}`}
              className="mx-auto flex h-[33rem] w-full flex-col items-end gap-2 rounded-2xl bg-[#F3EBF1] p-6"
            >
              <div className="w-full">
                <div className="flex  justify-end">
                  <img
                    src={quotes}
                    alt="Quotes"
                    className="flex h-8 w-8 items-end object-cover"
                  />
                </div>
                <div className="flex h-[28.25rem] w-full flex-col items-center">
                  <div className="">
                    <div className="flex h-[12rem] w-[12rem] items-center justify-center">
                      <img
                        src={src}
                        alt={alt}
                        className="h-full w-full rounded-[50%] object-cover"
                      />
                    </div>
                    <div className="space-y-1.5 pb-5 pt-2">
                      <h4 className="mx-auto w-full text-center text-2xl font-normal leading-8 text-[#1F1F29] ">
                        {name}
                      </h4>
                      <p className="flex items-center justify-center">
                        <Rating
                          initialValue={5}
                          className="relative bottom-[2px] w-full"
                          iconsCount={5}
                          readonly={true}
                          SVGclassName={`inline-block`}
                          allowFraction={true}
                          size={22}
                        />
                      </p>
                    </div>
                  </div>
                  <p className="h-[7.5rem] w-[17.75rem] text-center text-lg font-normal leading-6 text-[#49454F]">
                    {review}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Clients;
