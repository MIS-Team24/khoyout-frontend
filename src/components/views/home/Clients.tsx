import { amira, may, hager, quotes } from "@/assets";
import { ChevronRight } from "lucide-react";

function Clients() {
  return (
    <section>
      <div className="mx-auto mt-10 h-[34rem] max-w-[72rem] ">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-[2rem] font-normal text-[#1F1F29]">
            What Our Clients Say
          </h2>
          <button className="flex items-center justify-center text-center text-2xl font-medium text-[#8C236C]">
            See more
            <ChevronRight />
          </button>
        </div>
        <div className="flex w-full items-end justify-between  ">
          <div className="flex h-[28.25rem] w-[23rem] flex-col items-end gap-2 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="w-full">
              <div className="flex items-end justify-end">
                <img
                  src={quotes}
                  alt="Quotes"
                  className="flex h-8 w-8 items-end object-cover"
                />
              </div>
              <div className="flex h-[28.25rem] w-full flex-col items-center">
                <div className="">
                  <div className="flex h-[11.875rem] w-[9rem] items-center justify-center">
                    <img
                      src={amira}
                      alt="Client Image"
                      className="h-[9rem] w-[9rem] rounded-[50%] object-cover"
                    />
                  </div>
                  <h4 className="m-4 mx-auto h-[2rem] w-[6.0625rem] text-2xl font-normal leading-8 text-[#1F1F29] ">
                    Amira Ali
                  </h4>
                </div>
                <p className=" h-[7.5rem] w-[17.75rem] text-center text-base font-normal leading-6 text-[#49454F]">
                  Khoyout made finding the perfect tailor a breeze! I was able
                  to browse through various options, read reviews, and book my
                  appointment with ease. Highly recommended!
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-[28.25rem] w-[23rem] flex-col items-end gap-2 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="w-full">
              <div className="flex items-end justify-end">
                <img
                  src={quotes}
                  alt="Quotes"
                  className="flex h-8 w-8 items-end"
                />
              </div>
              <div className="flex h-[28.25rem] w-full flex-col items-center">
                <div className="">
                  <div className="flex h-[11.875rem] w-[9rem] items-center justify-center">
                    <img
                      src={may}
                      alt="Client Image"
                      className="h-[9rem] w-[9rem] rounded-[50%] object-cover"
                    />
                  </div>
                  <h4 className="m-4 mx-auto h-[2rem] w-[8rem] text-2xl font-normal leading-8 text-[#1F1F29] ">
                    May Ahmed
                  </h4>
                </div>
                <p className=" h-[7.5rem] w-[17.75rem] text-center text-base font-normal leading-6 text-[#49454F]">
                  The platform is user-friendly, and I found a talented tailor
                  who exceeded my expectations. Will definitely be using it
                  again!
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-[28.25rem] w-[23rem] flex-col items-end gap-2 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="w-full">
              <div className="flex items-end justify-end">
                <img
                  src={quotes}
                  alt="Quotes"
                  className="flex h-8 w-8 items-end"
                />
              </div>
              <div className="flex h-[28.25rem] w-full flex-col items-center">
                <div className="">
                  <div className="flex h-[11.875rem] w-[11.875rem] items-center justify-center">
                    <img
                      src={hager}
                      alt="Client Image"
                      className="h-[9rem] w-[9rem] rounded-[50%] object-cover"
                    />
                  </div>
                  <h4 className="m-4 mx-auto h-[2rem] w-[7.25rem] text-2xl font-normal leading-8 text-[#1F1F29] ">
                    Hager Rizk
                  </h4>
                </div>
                <p className=" h-[7.5rem] w-[17.75rem] text-center text-base font-normal leading-6 text-[#49454F]">
                  The ability to search for tailors based on location, reviews,
                  and specialties saved me so much time. Plus, booking
                  appointments was seamless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
