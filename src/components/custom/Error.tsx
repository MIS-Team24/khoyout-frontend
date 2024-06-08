import { designerNotFound } from "@/assets";

const Error = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex w-full flex-col items-center gap-y-4">
    <div className="flex flex-col space-y-0.5 text-center">
      <h2 className="text-[2rem] font-normal leading-normal">{title}</h2>
      <p className="text-xl font-normal leading-8 text-[#6C6C6C]">
        {description}
      </p>
    </div>
    <div className="h-[25rem] w-[33rem]">
      <img
        src={designerNotFound}
        className="h-full w-full object-cover"
        alt="designer-not-found"
      />
    </div>
  </div>
);

export default Error;
