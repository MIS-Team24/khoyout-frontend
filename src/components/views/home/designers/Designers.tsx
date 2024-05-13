import { workExamples } from "@/assets";
import { Button } from "@/components/ui";

function Designers() {
  return (
    <section>
      <div className="mx-auto flex w-full max-w-[75rem] flex-wrap items-center justify-center gap-8 py-10">
        <h2 className="w-full text-center text-[2rem] font-normal leading-normal lg:text-start">
          What Designers Do
        </h2>
        <div className="grid w-[35.23rem] grid-cols-1 gap-5 px-4 lg:w-full lg:grid-cols-2 lg:px-0">
          {workExamples.map(({ alt, src, title }, i) => (
            <div
              key={`work-example-${i}`}
              className="flex h-[12.5rem] w-full items-center gap-6 rounded-[1rem] border-2 border-solid border-[#B1B1B1] p-4"
            >
              <div className="h-[10.5rem] w-[14rem] rounded-md">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
              <div className="ml-6 flex flex-col items-start gap-8">
                <h4 className="text-xl font-normal leading-8 text-[#1F1F29] md:text-2xl">
                  {title}
                </h4>
                <Button className="flex h-12 items-center justify-center gap-2 rounded-2xl text-center text-base font-medium">
                  Explore Designers
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Designers;
