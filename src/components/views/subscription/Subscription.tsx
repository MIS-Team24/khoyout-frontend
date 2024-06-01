import { checkImg } from "@/assets";
import { Button } from "@/components/ui";

function Subscription() {
  return (
    <section>
      <div className="main-container mb-[7.69rem]">
        <div className="mx-auto mb-8 flex h-[2.9375rem] w-full items-center justify-center">
          <h2 className="text-[2.5rem] font-normal leading-normal">
            Subscription plans
          </h2>
        </div>
        <div className="mx-auto flex items-center justify-center">
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="mb-4 w-full rounded-2xl border-[1px] border-[#B1B1B1]">
              <div className="flex h-full w-full flex-col items-center justify-between p-6">
                <div className="w-full border-b-[1px]">
                  <h3 className="pb-6 text-center text-[2rem] font-normal leading-normal">
                    Free
                  </h3>
                  <p className="mx-auto w-[20rem] pb-6 text-center text-xl font-normal leading-8 text-[#6C6C6C]">
                    Showcase your talent to potential clients today for free
                  </p>
                  <p className="mx-auto w-[20rem] pb-6 text-center text-xl font-normal leading-8 text-[#49454F]">
                    0 EGP /{" "}
                    <span className="text-sm font-normal leading-normal">
                      {" "}
                      month{" "}
                    </span>
                  </p>
                </div>
                <div className="flex h-full w-full flex-col pt-6">
                  <div>
                    <h3 className="w-full pb-6 text-2xl font-normal leading-8">
                      Features
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-start pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Profile creation and listing in the directory
                      </p>
                    </div>
                    <div className="flex items-start pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Limited gallery uploads (up to 15 photos, no videos)
                      </p>
                    </div>
                    <div className="flex items-start pb-10">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Receiving only 3 booking requests per month
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    variant={"secondary"}
                    className="mt-2 w-full text-center text-xl font-medium leading-normal text-[#F9F4F4]"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-4 w-full rounded-2xl border-[1px] border-[#B1B1B1]">
              <div className="flex h-full flex-col items-center justify-between p-6">
                <div className="w-full border-b-[1px]">
                  <h3 className="pb-6 text-center text-[2rem] font-normal leading-normal">
                    Standard
                  </h3>
                  <p className="mx-auto w-[20rem] pb-6 text-center text-xl font-normal leading-8 text-[#6C6C6C]">
                    Upgrade to elevate your business and reach more clients{" "}
                  </p>
                  <p className="mx-auto w-[20rem] pb-6 text-center text-xl font-normal leading-8 text-[#49454F]">
                    200 EGP /{" "}
                    <span className="text-sm font-normal leading-normal">
                      {" "}
                      month{" "}
                    </span>
                  </p>
                </div>
                <div className="flex h-full w-full flex-col pt-6">
                  <div>
                    <h3 className="w-full pb-6 text-2xl font-normal leading-8">
                      Features
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-center pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        All features in the Free Plan{" "}
                      </p>
                    </div>
                    <div className="flex items-start pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Priority listing in the search results{" "}
                      </p>
                    </div>
                    <div className="flex items-start pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Unlimited gallery uploads{" "}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pb-6 pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Receiving up to 12 booking requests per month{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    variant={"outline"}
                    className="mt-10 w-full text-center text-xl font-medium leading-normal text-[#8C236C] hover:text-[#8C236C]"
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            </div>
            <div className="mb-4 w-full rounded-2xl border-[1px] border-[#B1B1B1]">
              <div className="flex h-full flex-col items-center justify-between p-6">
                <div className="w-full border-b-[1px]">
                  <h3 className="pb-6 text-center text-[2rem] font-normal leading-normal">
                    Premium
                  </h3>
                  <p className="mx-auto w-[20rem] pb-6 text-center text-xl font-normal leading-8 text-[#6C6C6C]">
                    Subscribe to take your fashion design business to the next
                    level{" "}
                  </p>
                  <p className="mx-auto w-[20rem] pb-6 text-center text-xl font-normal leading-8 text-[#49454F]">
                    350 EGP /{" "}
                    <span className="text-sm font-normal leading-normal">
                      {" "}
                      month{" "}
                    </span>
                  </p>
                </div>
                <div className="flex h-full w-full flex-col pt-6">
                  <div>
                    <h3 className="w-full pb-6 text-2xl font-normal leading-8">
                      Features
                    </h3>
                  </div>
                  <div className="flex flex-col items-start justify-between">
                    <div className="flex items-start pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        All features in the Standard Plan{" "}
                      </p>
                    </div>
                    <div className="flex items-start pb-4">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Featured listing on the homepage{" "}
                      </p>
                    </div>
                    <div className="flex items-start">
                      <img src={checkImg} alt="Check Image" />
                      <p className="pl-2 text-xl font-normal leading-8 text-[#6C6C6C]">
                        Unlimited booking requests{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Button
                    variant={"default"}
                    className="mt-10 w-full text-center text-xl font-medium leading-normal text-[#F9F4F4]"
                  >
                    Upgrade
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
