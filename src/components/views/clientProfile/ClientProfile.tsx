import PersonalInfoForm from "./PersonalInfoForm";
import { esraa, edit, body } from "@/assets";
import { Button } from "@/components/ui";
import BodyMeasurmentform from "./BodyMeasurmentform";
import StylePreferences from "./StylePreferences";

function ClientProfile() {
  return (
    <section>
      <div className="main-container mb-16 mt-10">
        <div className="relative mb-[6rem] flex h-[12.5rem] w-full items-end justify-between rounded-2xl bg-[#F3EBF1]">
          <div>
            <div className="absolute left-8 top-[6rem] h-[10rem] w-[10rem] rounded-full">
              <img
                src={esraa}
                alt="Client Image"
                className="h-full w-full rounded-full object-cover "
              />
            </div>
            <h1 className="relative left-[13rem] text-[2rem] font-normal">
              Esraa Ahmed
            </h1>
          </div>
          <div className="inline-flex h-[2.375rem] items-center justify-center gap-[0.5rem] pr-6">
            <Button
              variant={"ghost"}
              className="inline-flex h-[1.75rem] w-[6.8rem] text-xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
            >
              Edit photo
              <img src={edit} alt="Edit Icon" className="pl-2" />
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col-reverse items-start justify-between gap-5 md:flex-row">
          <div className="flex w-full flex-col items-center gap-y-[1.06rem] lg:w-1/2 lg:items-start">
            <PersonalInfoForm />
            <BodyMeasurmentform />
            <StylePreferences />
            <div className="flex w-full items-center justify-end">
              <Button
                variant={"outline"}
                className="w-full text-xl font-medium text-primary hover:text-primary max-md:h-12 md:w-[15.375rem]"
              >
                Log out
              </Button>
            </div>
          </div>
          <div className="mx-auto h-full w-full rounded-xl bg-[#F3EBF1] lg:w-1/2">
            <img
              src={body}
              alt="Body Measurments Image"
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientProfile;
