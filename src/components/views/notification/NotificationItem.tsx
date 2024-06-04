import { API_Notification } from "@/API/types/notifications/notifications";
import { notificationType } from "@/API/response_enums";
import { Ellipse } from "@/assets";
import { Link, ReactNode } from "@tanstack/react-router";
import bell from "@/assets/icons/bell.svg";
import { User } from "lucide-react";

type notificationItemProps = {
  notification: API_Notification;
};

export default function NotificationItem(
  notificationItemProps: notificationItemProps,
) {
  const props = notificationItemProps.notification;

  let renderedItem: ReactNode;

  switch (props.type) {
    case notificationType.Ideas: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          We think you might like these 10 ideas.
        </p>
      );
      break;
    }
    case notificationType.AppointmentRequest: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          <span className="text-xl font-semibold text-[#8C236C]">
            {props.sender?.name}
          </span>
          Has requested an appointment with you.
        </p>
      );
      break;
    }
    case notificationType.BookingConfirmed: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          Booking confirmed by{" "}
          <span className="text-xl font-semibold text-[#8C236C]">
            {props.sender?.name}
          </span>
          .
        </p>
      );
      break;
    }
    case notificationType.RescheduleRequest: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          <span className="text-xl font-semibold text-[#8C236C]">
            {props.sender?.name}
          </span>
          requested for a reschedule.
        </p>
      );
      break;
    }
    case notificationType.PremiumExpired: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          Your subscription plan has expired,{" "}
          <Link
            from="/notifications"
            to="/subscription"
            className="text-[#8C236C]"
          >
            Click Here To Renew it
          </Link>
          .
        </p>
      );
      break;
    }
    case notificationType.PremiumGranted: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          Thank you for subscribing to our plans, We'll make sure you get more
          clients.
        </p>
      );
      break;
    }
    case notificationType.PremiumRevoked: {
      renderedItem = (
        <p className="ml-4 text-xl font-normal text-[#1F1F29]">
          Your subscription plan has been revoked due to a violation of our
          terms of service.
        </p>
      );
      break;
    }
  }

  return (
    <div className="mb-12">
      <div className="flex w-full items-center justify-between px-4 pb-8">
        <div className="flex items-center justify-center">
          <div className="w-[8rem] sm:h-[4.25rem] sm:w-[6.375rem]">
            {props.sender ? (
              props.sender.avatarURL ? (
                <img
                  src={props.sender.avatarURL}
                  alt="Client Image"
                  className="h-[5rem] w-[5rem] rounded-[50%] object-cover"
                />
              ) : (
                <div className="h-[5rem] w-[5rem] rounded-[50%] object-cover">
                  <User />
                </div>
              )
            ) : (
              <div className="flex h-[5rem] w-[5rem] items-center justify-center rounded-[50%] bg-[#f3ebf1] object-cover">
                <img src={bell} className="w-6" />
              </div>
            )}
          </div>
          {renderedItem}
        </div>
        <div>{!props.read && <img src={Ellipse} alt="Icon" />}</div>
      </div>
    </div>
  );
}
