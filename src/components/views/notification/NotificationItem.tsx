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
          <div className="h-[4.25rem] w-[6.375rem]">
            <img
              src={props.image}
              alt="Client Image"
              className="h-[5rem] w-[5rem] rounded-[50%] object-cover"
            />
          </div>
          <p className="text-2xl font-normal text-[#1F1F29]">
            <span className="text-2xl font-semibold text-[#8C236C]">
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
