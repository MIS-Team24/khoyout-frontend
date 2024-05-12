import { scratchImg, implementImg, redesignImg, handImg } from "@/assets";

function Designers() {
  return (
    <section>
      <div className="mx-auto flex w-full max-w-[72rem] flex-wrap items-center justify-center gap-8">
        <h2 className="mt-4 w-full text-4xl font-normal text-[#1F1F29]">
          What Designers Do
        </h2>

        <div className="flex flex-wrap gap-6">
          <div className="flex h-[12.5rem] w-[35.23rem] items-center gap-6 rounded-[1rem] border-2 border-solid border-[#B1B1B1] p-4">
            <img
              src={scratchImg}
              alt="Design from scratch"
              className="h-[10.5rem] w-[14.1875rem] rounded-md"
            />
            <div className="ml-6 flex flex-col items-start gap-8">
              <h4 className="text-2xl font-normal leading-8 text-[#1F1F29]">
                Design from scratch
              </h4>
              <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#8C236C] px-2 py-4 text-center text-base font-medium text-[#F9F4F4] ">
                Explore Designers
              </button>
            </div>
          </div>
          <div className="flex h-[12.5rem] w-[35.23rem] items-center gap-6 rounded-[1rem] border-2 border-solid border-[#B1B1B1] p-4">
            <img
              src={implementImg}
              alt="Design implementation"
              className="h-[10.5rem] w-[14.1875rem] rounded-md"
            />
            <div className="ml-6 flex flex-col items-start gap-8">
              <h4 className="text-2xl font-normal leading-8 text-[#1F1F29]">
                Design implementation
              </h4>
              <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#8C236C] px-2 py-4 text-center text-base font-medium text-[#F9F4F4]">
                Explore Designers
              </button>
            </div>
          </div>
          <div className="flex h-[12.5rem] w-[35.23rem] items-center gap-6 rounded-[1rem] border-2 border-solid border-[#B1B1B1] p-4">
            <img
              src={redesignImg}
              alt="Redesign image"
              className="h-[10.5rem] w-[14.1875rem] rounded-md"
            />
            <div className="ml-6 flex flex-col items-start gap-8">
              <h4 className="text-2xl font-normal leading-8 text-[#1F1F29]">
                Redesign image
              </h4>
              <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#8C236C] px-2 py-4 text-center text-base font-medium text-[#F9F4F4]">
                Explore Designers
              </button>
            </div>
          </div>
          <div className="flex h-[12.5rem] w-[35.23rem] items-center gap-6 rounded-[1rem] border-2 border-solid border-[#B1B1B1] p-4">
            <img
              src={handImg}
              alt="Hand made image"
              className="h-[10.5rem] w-[14.1875rem] rounded-md"
            />
            <div className="ml-6 flex flex-col items-start gap-8">
              <h4 className="text-2xl font-normal leading-8 text-[#1F1F29]">
                Hand made image
              </h4>
              <button className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#8C236C] px-2 py-4 text-center text-base font-medium text-[#F9F4F4]">
                Explore Designers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Designers;
