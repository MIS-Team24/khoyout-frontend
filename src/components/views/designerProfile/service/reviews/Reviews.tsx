import { clients } from "@/assets";
import { SectionHeader } from "@/components/custom";
import { Rating } from "react-simple-star-rating";

export default function Reviews() {
  return (
    <section className="lg:mb-[4.25rem]">
      <div>
        <div className="mb-8">
          <SectionHeader title="Reviews" className="my-0 mb-8" />
          <Rating
            initialValue={5}
            className="relative bottom-[2px] my-3 w-full"
            iconsCount={5}
            readonly={true}
            SVGclassName={`inline-block`}
            allowFraction={true}
            size={32}
          />
          {/*Store Rating*/}
          <div className="flex gap-4">
            <p className="text-2xl text-foreground">5.0</p>
            <p className="text-2xl text-primary">(124)</p>
          </div>
        </div>
        <div>
          {clients.map(({ src, alt, name, review }, i) => (
            <div
              key={`client-${i}`}
              className="mb-8 flex flex-col gap-2 lg:w-11/12"
            >
              <div className="flex gap-2">
                <div>
                  <img
                    src={src}
                    alt={alt}
                    className="h-12 w-12 rounded-full object-cover object-center"
                  />
                </div>
                <div>
                  <p>{name}</p>
                  <p className="text-sm text-secondary">6 days ago</p>
                  <Rating
                    initialValue={5}
                    className="relative bottom-[2px] w-full"
                    iconsCount={5}
                    readonly={true}
                    SVGclassName={`inline-block`}
                    allowFraction={true}
                    size={16}
                  />
                </div>
              </div>
              <div>
                <p className="text-xl text-secondary">{review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
