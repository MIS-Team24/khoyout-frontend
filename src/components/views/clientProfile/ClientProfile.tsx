import PersonalInfoForm from "./PersonalInfoForm";
import { esraa, edit, body, plusIcon } from "@/assets";
import { Button } from "@/components/ui";
import BodyMeasurmentform from "./BodyMeasurmentform";
import { Link } from "@tanstack/react-router";

function ClientProfile() {
  return (
    <section className="py-24">
      <div className="mx-auto flex w-full max-w-[80rem] flex-col items-center justify-center">
        <div className="relative mb-[7.4rem] flex h-[12.5rem] w-full items-end justify-between rounded-2xl bg-[#F3EBF1]">
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
        <div className="flex h-full w-full flex-col-reverse items-start justify-between gap-8 lg:flex-row">
          <div className="flex w-full flex-col items-center gap-y-[1.06rem] lg:items-start ">
            <PersonalInfoForm />
            <BodyMeasurmentform />
            <div className="flex max-h-[14rem] max-w-[39rem] flex-col gap-8 rounded-sm bg-[#F3EBF1] p-6">
              <div className="gap-2">
                <h2 className="h-[2.4rem] w-[19.1rem] text-[2rem] font-normal">
                  My Style preferences
                </h2>
                <p className="h-12 w-[32.25rem] pt-4 text-base font-normal leading-6 text-[#6C6C6C]">
                  By entering your style preferences, you'll help us match you
                  with designers who specialize in your preferred styles
                </p>
              </div>
              <Link className="flex w-full items-center justify-start gap-x-2 pb-4 text-xl leading-8 text-[#76526A]">
                <img src={plusIcon} alt="Plus Icon" className="h-6 w-6" />
                <span>Add your preferred style</span>
              </Link>
            </div>
            <div className="flex w-full items-center justify-end">
              <Button
                variant={"outline"}
                className="w-[15.375rem] text-xl font-medium text-[#8C236C] hover:text-[#8C236C]"
              >
                Log out
              </Button>
            </div>
          </div>
          <div className="mx-auto flex h-[30rem] w-[38rem] items-center justify-center rounded-2xl bg-[#F3EBF1] lg:h-[52.125rem] lg:w-full">
            <img
              src={body}
              alt="Body Measurments Image"
              className="h-full object-cover lg:h-[full] lg:w-[37rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientProfile;
