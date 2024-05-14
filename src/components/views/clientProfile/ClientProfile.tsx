import { esraa, edit } from "@/assets";
import { Button } from "@/components/ui";

function ClientProfile() {
  return (
    <section className=" h-[176.2rem] w-[90rem]">
      <div className="mx-auto flex w-full items-center justify-center pt-24">
        <div className="relative flex h-[12.5rem] w-[72rem] items-end justify-between rounded-2xl bg-[#F3EBF1]">
          <div>
            <div className="absolute left-12 top-[7rem] h-[10.75rem] w-[16.2rem]">
              <img
                src={esraa}
                alt="Client Image"
                className="h-[9rem] w-[9rem] rounded-[50%] object-cover "
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
      </div>
    </section>
  );
}

export default ClientProfile;
