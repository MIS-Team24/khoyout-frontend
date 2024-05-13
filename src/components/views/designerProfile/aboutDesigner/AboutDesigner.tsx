import { useState } from "react";
import { Button } from "@/components/ui";
import { MapPin } from "lucide-react";
import AboutMap from "./AboutMap";
import AboutMapDialog from "./AboutMapDialog";

const workingtimes = [
  { day: "Saturday", time: "12:00 PM - 10:00 PM", open: true },
  { day: "Sunday", time: "12:00 PM - 10:00 PM", open: true },
  { day: "Monday", time: "12:00 PM - 10:00 PM", open: true },
  { day: "Tuesday", time: "12:00 PM - 10:00 PM", open: true },
  { day: "Wednesday", time: "12:00 PM - 10:00 PM", open: true },
  { day: "Thursday", time: "12:00 PM - 10:00 PM", open: true },
  { day: "Friday", time: "12:00 PM - 10:00 PM", open: false },
];

export default function AboutDesigner() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="mb-20">
      <div className="mx-auto w-full px-2 md:max-w-[90rem] md:px-10 xl:px-0">
        <h2 className="w-full pb-2 text-[2rem] font-normal sm:pb-4">About</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-0">
          <div className="flex flex-1 flex-col gap-y-[2.5rem]">
            <p className="text-base leading-6 tracking-[0.00625rem] text-[#49454F] sm:text-[1.25rem] sm:leading-8">
              Hi there, I am Bassma from Egypt, Alexandria. I have been working
              as a fashion designer for more than two years from home. Now I am
              the owner of Diamond Atelier.
            </p>
            <div className="space-y-8">
              <h3 className="text-[1.5rem] leading-8">Working Times</h3>
              <div className="space-y-3.5">
                {workingtimes.map(({ day, open, time }, i) => (
                  <div
                    key={day + (open ? "open" : "closed") + time + i.toString()}
                    className="flex justify-between text-start text-[#49454F]"
                  >
                    <p className="text-base leading-6 tracking-[0.00625rem] text-[#49454F] sm:text-[1.25rem] sm:leading-8">
                      {day}
                    </p>
                    <p className="text-base leading-6 tracking-[0.00625rem] text-[#49454F] sm:w-[12rem] sm:text-[1.25rem] sm:leading-8">
                      {open ? (
                        time
                      ) : (
                        <span className="text-[#B3261E]">Closed</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-[30rem] flex-1 flex-col gap-y-5 lg:h-full">
            <AboutMap />
            <div className="flex w-full flex-col items-center justify-between gap-y-4 pb-4 sm:flex-row sm:gap-y-0">
              <div className="flex items-center gap-x-2">
                <MapPin size={18} className="mb-0.5" />
                <p>84 Omar Lotfy st., El Ibrahimeya, Alexandria</p>
              </div>
              <Button
                variant="default"
                className="!m-0 h-0 !p-0 text-[1rem] text-primary hover:text-primary"
                onClick={() => setIsOpen(true)}
              >
                Show Location on map
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AboutMapDialog isOpen={isOpen} onChange={setIsOpen} />
    </section>
  );
}
