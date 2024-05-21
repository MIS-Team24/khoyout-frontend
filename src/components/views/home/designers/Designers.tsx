import { workExamples } from "@/assets";
import { SectionHeader } from "@/components/custom";
import { Button } from "@/components/ui";

function Designers() {
  return (
    <section className="main-container my-0">
      <SectionHeader title="What Designers Do" className="mb-5" />
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        {workExamples.map(({ alt, src, title }, i) => (
          <div
            key={`work-example-${i}`}
            className="flex h-[16rem] w-full items-center gap-6 rounded-[1rem] border-2 border-solid border-[#B1B1B1] p-4"
          >
            <div className="h-full w-full max-w-[20rem] rounded-md">
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
    </section>
  );
}

export default Designers;
