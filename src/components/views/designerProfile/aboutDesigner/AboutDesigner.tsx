import { Button } from "@/components/ui";
import AboutMap from "./AboutMap";
import { MapPin } from "lucide-react";

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
  return (
    <section className="mb-20">
      <div className="mx-auto w-full max-w-[80%]">
        <h2 className="w-full pb-4 text-[2rem] font-normal">About</h2>
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-1 flex-col gap-y-[2.5rem]">
            <p className="text-[1.25rem] leading-8 tracking-[0.00625rem] text-[#49454F]">
              Hi there, I am Bassma from Egypt, Alexandria. I have been working
              as a fashion designer for more than two years from home. Now I am
              the owner of Diamond Atelier.
            </p>
            <div className="space-y-8">
              <h3 className="text-[1.5rem] leading-8">Working Times</h3>
              <div className="space-y-3.5">
                {workingtimes.map(({ day, open, time }, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-start text-[#49454F]"
                  >
                    <p className="text-[1.25rem] leading-8 tracking-[0.00625rem]">
                      {day}
                    </p>
                    <p className="w-[12rem] text-[1.25rem] leading-8 tracking-[0.00625rem]">
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
          <div className="flex flex-1 flex-col gap-y-5">
            <AboutMap />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-x-2">
                <MapPin size={18} className="mb-0.5" />
                <p>84 Omar Lotfy st., El Ibrahimeya, Alexandria</p>
              </div>
              <Button
                variant="default"
                className="!m-0 h-0 !p-0 text-[1rem] text-primary hover:text-primary"
              >
                Show Location on map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
