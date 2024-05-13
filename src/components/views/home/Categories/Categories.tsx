import { soiree, classic, formal, casual } from "@/assets";

function Categories() {
  return (
    <section className="mt-16">
      <div className="mx-auto flex w-full items-center justify-center">
        <div className="inline-flex flex-col items-center ">
          <div className="w-full ">
            <h2 className="text-[2rem] font-normal text-[#1F1F29]">
              Browse Designers By Categories
            </h2>
          </div>
          <div className="m-6 grid h-full w-full grid-cols-2 ">
            <div className=" ">
              <img
                src={soiree}
                alt="Soiree Image"
                className=" mb-6 h-[19.8125rem] w-full max-w-[35.25rem] rounded-tl-[.5rem]"
              />
              <img
                src={casual}
                alt="Casual Image"
                className=" h-[19.8125rem] w-[35.25rem] rounded-bl-[.5rem]"
              />
            </div>
            <div className="grid w-full">
              <img
                src={classic}
                alt="Classic Image"
                className=" mb-6 h-[19.8125rem] w-[35.25rem] rounded-tr-[.5rem]"
              />
              <img
                src={formal}
                alt="Formal Image"
                className=" h-[19.8125rem] w-[35.25rem] rounded-br-[.5rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
