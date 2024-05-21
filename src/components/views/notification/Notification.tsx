// import { useQuery } from "@tanstack/react-query";
// import {
//   getNotifications,
//   API_NotificationResponse,
// } from "@/API/notification/notification";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
import NotificationItem from "./NotificationItem";
import { Button } from "@/components/ui";
import { clientImg } from "@/assets";

const DUMMY_DATA = [
  {
    image: clientImg,
    name: "Basma Adel",
    describtion: "wants to contact you to check the final design",
    isNew: false,
  },
  {
    image: clientImg,
    name: "Basma Adel",
    describtion: "requested for a reschedule",
    isNew: false,
  },
  {
    image: clientImg,
    name: "Basma Adel",
    describtion: "Booking confirmed by",
    isNew: true,
  },
];

export default function Notification() {
  // const access_token = useSelector((x: RootState) => x.user.user?.access_token);
  // const getNotificationsFn = () => getNotifications(access_token ?? "");
  // const notificationQuery = useQuery({
  //   queryKey: ["notifications-list"],
  //   queryFn: getNotificationsFn,
  // });
  // let transformedData: API_NotificationResponse | undefined;
  // if (notificationQuery.isSuccess) {
  //   transformedData = notificationQuery.data.data as API_NotificationResponse;
  // }

  return (
    <section>
      <div className="main-container mt-10">
        <div className="flex w-full items-center justify-between px-4 pb-8">
          <h1 className="text-[2rem] font-normal text-[#1F1F29]">
            Notifications
          </h1>
          <Button
            type="button"
            variant={"outline"}
            className="flex h-[2.9375rem] w-[10.75rem] items-center justify-center rounded-2xl text-xl font-medium text-[#8C236C] hover:text-[#8C236C] "
          >
            Make as read
          </Button>
        </div>
        {DUMMY_DATA.map((el, i) => (
          <NotificationItem key={i} {...el} />
        ))}
      </div>
    </section>
  );
}
