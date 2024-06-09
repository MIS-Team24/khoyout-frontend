import { PersonalForm, ProfileVideos } from ".";

import {
  designer1,
  edit,
  design2,
  design3,
  design4,
  member1,
  member2,
  member3,
} from "@/assets";
import { Button } from "@/components/ui";

const workingtimes = [
  { day: "Saturday", time: "12:00 PM to 10:00 PM", available: true },
  { day: "Sunday", time: "12:00 PM to 10:00 PM", available: true },
  { day: "Monday", time: "12:00 PM to 10:00 PM", available: true },
  { day: "Tuesday", time: "12:00 PM to 10:00 PM", available: true },
  { day: "Wednesday", time: "12:00 PM to 10:00 PM", available: true },
  { day: "Thursday", time: "12:00 PM to 10:00 PM", available: true },
  { day: "Friday", time: "12:00 PM to 10:00 PM", available: false },
];
function MyProfile() {
  return (
    <section>
      <div className="main-container">
        <div className="relative mb-[6rem] mt-24 flex h-[12.5rem] w-full items-end justify-between rounded-2xl bg-[#F3EBF1]">
          <div>
            <div className="absolute left-8 top-[6rem] h-[10rem] w-[10rem] rounded-full">
              <img
                src={designer1}
                alt="Client Image"
                className="h-full w-full rounded-full object-cover "
              />
            </div>
            <h1 className="relative left-[13rem] text-[2rem] font-normal">
              Bassma Adel
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
        <div className="grid grid-cols-2 gap-6 pb-8 pt-[7.38rem]">
          <div className="">
            <PersonalForm />
          </div>
          <div className="bg-green-700">2</div>
        </div>
        <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
          <div className="flex items-center justify-between pb-2">
            <div className="h-[2.375rem] w-[18rem]">
              <p className="text-[2rem] font-normal leading-normal">
                Daily Working Hours
              </p>
            </div>
            <div>
              <Button
                variant={"ghost"}
                className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
              >
                Edit
                <img src={edit} alt="Edit Icon" className="pl-2" />
              </Button>
            </div>
          </div>
          <div className="w-full pb-8">
            <p className="text-base font-normal leading-6 text-[#6C6C6C]">
              Choose a schedule below to edit your default hours that you can
              meet your clients in
            </p>
          </div>
          <div className="space-y-4">
            {workingtimes.map(({ day, time, available }, i) => (
              <div
                className="w-[63.8125rem]"
                key={
                  day +
                  (available ? "Available" : "Unavailable") +
                  time +
                  i.toString()
                }
              >
                <div className="flex items-center justify-between gap-[2.38rem]">
                  <div className="h-20 w-[13.75rem]">
                    <p className="text-[2rem] font-normal leading-normal">
                      {day}
                    </p>
                  </div>
                  <div className="h-20 w-[47.6875rem]">
                    <p className="flex w-[30.5625rem] items-center justify-center text-[2rem] font-normal leading-normal">
                      {available ? (
                        time
                      ) : (
                        <span className="flex w-[20rem] text-[#6C6C6C]">
                          Unavailable
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
          <div className="flex items-center justify-between pb-2">
            <div className="h-[2.375rem] w-[6.125rem]">
              <h2 className="text-[2rem] font-normal leading-normal">Photos</h2>
            </div>
            <div>
              <Button
                variant={"ghost"}
                className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
              >
                Edit
                <img src={edit} alt="Edit Icon" className="pl-2" />
              </Button>
            </div>
          </div>
          <div className="mb-8 h-6 w-full">
            <p className="text-base font-normal leading-6 text-[#6C6C6C]">
              Capture your craftsmanship in high-quality images to showcase your
              past designs, ensuring clarity in every detail for clients to
              trust and admire
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <img
                className="h-[27.8125rem] w-[22rem]"
                src={design3}
                alt="Design-3"
              />
            </div>
            <div>
              <img
                className="h-[27.8125rem] w-[22rem]"
                src={design2}
                alt="Design-2"
              />
            </div>
            <div>
              <img
                className="h-[27.8125rem] w-[22rem]"
                src={design4}
                alt="Design-4"
              />
            </div>
          </div>
        </div>
        <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
          <div className="flex items-center justify-between pb-2">
            <div className="h-[2.375rem] w-[6.3125rem]">
              <h2 className="text-[2rem] font-normal leading-normal">Vidoes</h2>
            </div>
            <div>
              <Button
                variant={"ghost"}
                className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
              >
                Edit
                <img src={edit} alt="Edit Icon" className="pl-2" />
              </Button>
            </div>
          </div>
          <div className="mb-8 h-6 w-full">
            <p className="text-base font-normal leading-6 text-[#6C6C6C]">
              Visualize Your Craft: upload video to share your process
            </p>
          </div>
          <ProfileVideos />
        </div>
        <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
          <div className="flex items-center justify-between pb-2">
            <div className="h-[2.375rem] w-[7.5625rem]">
              <h2 className="text-[2rem] font-normal leading-normal">
                Services
              </h2>
            </div>
            <div>
              <Button
                variant={"ghost"}
                className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
              >
                Edit
                <img src={edit} alt="Edit Icon" className="pl-2" />
              </Button>
            </div>
          </div>
          <div className="mb-8 h-6 w-full">
            <p className="text-base font-normal leading-6 text-[#6C6C6C]">
              Visualize Your Craft: upload video to share your process
            </p>
          </div>
        </div>
        <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
          <div className="flex items-center justify-between pb-2">
            <div className="h-[2.375rem] w-[14rem]">
              <h2 className="text-[2rem] font-normal leading-normal">
                Team Members
              </h2>
            </div>
            <div>
              <Button
                variant={"ghost"}
                className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
              >
                Edit
                <img src={edit} alt="Edit Icon" className="pl-2" />
              </Button>
            </div>
          </div>
          <div className="mb-8 h-6 w-full">
            <p className="text-base font-normal leading-6 text-[#6C6C6C]">
              Visualize Your Craft: upload video to share your process
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div>
                <img
                  className="h-[27.8125rem] w-[22rem] rounded-[0.5rem] object-cover"
                  src={member1}
                  alt="Team Member-1"
                />
              </div>
              <div className="h-[2.375] w-full pb-4 pt-4">
                <h3 className="text-center text-[2rem] font-medium leading-normal">
                  Nada
                </h3>
              </div>
              <div className="h-6 w-full">
                <p className="text-basw text-center font-normal leading-6 text-[#6C6C6C]">
                  Hand made specialist
                </p>
              </div>
            </div>
            <div>
              <div>
                <img
                  className="h-[27.8125rem] w-[22rem] rounded-[0.5rem] object-cover"
                  src={member2}
                  alt="Team Member-2"
                />
              </div>
              <div className="h-[2.375] w-full pb-4 pt-4">
                <h3 className="text-center text-[2rem] font-medium leading-normal">
                  Mona
                </h3>
              </div>
              <div className="h-6 w-full">
                <p className="text-basw text-center font-normal leading-6 text-[#6C6C6C]">
                  Redesign specialist
                </p>
              </div>
            </div>
            <div>
              <div>
                <img
                  className="h-[27.8125rem] w-[22rem] rounded-[0.5rem] object-cover"
                  src={member3}
                  alt="Team Member-3"
                />
              </div>
              <div className="h-[2.375] w-full pb-4 pt-4">
                <h3 className="text-center text-[2rem] font-medium leading-normal">
                  Mariam
                </h3>
              </div>
              <div className="h-6 w-full">
                <p className="text-basw text-center font-normal leading-6 text-[#6C6C6C]">
                  Sewing specialist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
