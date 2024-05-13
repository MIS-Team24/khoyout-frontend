import { Ellipse } from "@/assets";

export default function NotificationItem(props: {
  image: string;
  name: string;
  describtion: string;
  isNew: boolean;
}) {
  return (
    <div className="mb-12">
      <div className="flex w-full items-center justify-between px-4 pb-8">
        <div className="flex items-center justify-center">
          <div className="w-[8rem] sm:h-[4.25rem] sm:w-[6.375rem]">
            <img
              src={props.image}
              alt="Client Image"
              className="h-[5rem] w-[5rem] rounded-[50%] object-cover"
            />
          </div>
          <p className="ml-4 text-xl font-normal text-[#1F1F29]">
            <span className="text-xl font-semibold text-[#8C236C]">
              {props.name}
            </span>{" "}
            {props.describtion}
          </p>
        </div>
        <div>{props.isNew && <img src={Ellipse} alt="Icon" />}</div>
      </div>
    </div>
  );
}
