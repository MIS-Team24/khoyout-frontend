import { useState } from "react";
import { Button } from "@/components/ui";
import { MapPin } from "lucide-react";
import AboutMap from "./AboutMap";
import AboutMapDialog from "./AboutMapDialog";
import { SectionHeader } from "@/components/custom";
import { LocationDetails, WorkingDay } from "@/API/types/designer/designer";

type AboutDesignerProps = {
  aboutDesigner: {
    locationDetails: LocationDetails;
    workingDays: WorkingDay[];
    about: string;
  };
};

export default function AboutDesigner({ aboutDesigner }: AboutDesignerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="main-container">
      <SectionHeader title="About" className="mb-8 mt-16" />
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2 lg:gap-y-0">
        <div className="flex flex-1 flex-col gap-y-[2.5rem]">
          <p className="text-base leading-6 tracking-[0.00625rem] text-[#49454F] sm:text-[1.25rem] sm:leading-8">
            {aboutDesigner.about}
          </p>
          <div className="space-y-8">
            <h3 className="text-[1.5rem] leading-8">Working Times</h3>
            <div className="space-y-3.5">
              {aboutDesigner.workingDays.map(({ day, hours }) => (
                <div
                  key={`${day}`}
                  className="flex justify-between text-start text-[#49454F]"
                >
                  <p className="text-base leading-6 tracking-[0.00625rem] text-[#49454F] sm:text-[1.25rem] sm:leading-8">
                    {day}
                  </p>
                  <p className="text-base leading-6 tracking-[0.00625rem] text-[#49454F] sm:w-[12rem] sm:text-[1.25rem] sm:leading-8">
                    {hours === "Closed" ? (
                      <span className="text-[#B3261E]">Closed</span>
                    ) : (
                      hours
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-[30rem] flex-1 flex-col justify-between gap-y-4 lg:h-full">
          <AboutMap
            location={[
              +aboutDesigner.locationDetails.latitude,
              +aboutDesigner.locationDetails.longitude,
            ]}
          />
          <div className="mt-auto flex w-full flex-col items-center justify-between gap-y-4 sm:flex-row sm:gap-y-0">
            <div className="flex items-center gap-x-2">
              <MapPin size={18} className="mb-0.5" />
              <p>{aboutDesigner.locationDetails.address}</p>
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
      <AboutMapDialog
        isOpen={isOpen}
        onChange={setIsOpen}
        location={[
          +aboutDesigner.locationDetails.latitude,
          +aboutDesigner.locationDetails.longitude,
        ]}
      />
    </section>
  );
}
