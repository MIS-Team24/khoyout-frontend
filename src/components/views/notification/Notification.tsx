import NotificationItem from "./NotificationItem";
import { Button } from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import {
  getNotifications,
  markNotificationsAsRead,
} from "@/API/notification/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_NotificationResponse } from "@/API/types/notifications/notifications";
import { Skeleton } from "@/components/ui/skeleton";

export default function Notification() {
  const { access_token } = useAuth();
  const getCurrentNotification = () => getNotifications(access_token() ?? "");
  const queryClient = useQueryClient();

  const notificationQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getCurrentNotification,
    retry: true,
  });

  const markAsReadNotif = useMutation({
    mutationKey: ["mark-notif-as-read"],
    mutationFn: (ids: number[]) =>
      markNotificationsAsRead(access_token() ?? "", ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  let transformedData: API_NotificationResponse | undefined;
  if (notificationQuery.isSuccess) {
    transformedData = notificationQuery.data.data as API_NotificationResponse;
  }

  function onClickMarkAsRead() {
    if (!transformedData) return;
    const ids = transformedData.data.map((notif) => notif.id);
    markAsReadNotif.mutateAsync(ids);
  }

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
            className="flex h-[2.9375rem] w-[10.75rem] items-center justify-center rounded-2xl text-xl font-medium text-[#8C236C] hover:text-[#8C236C]"
            onClick={onClickMarkAsRead}
          >
            Make as read
          </Button>
        </div>
        {notificationQuery.isPending ? (
          <>
            <NotificationsSkeleton />
            <NotificationsSkeleton />
          </>
        ) : (
          transformedData?.data.map((notif) => (
            <NotificationItem key={notif.id} notification={notif} />
          ))
        )}
      </div>
    </section>
  );
}

function NotificationsSkeleton() {
  return (
    <div className="mb-12">
      <div className="flex w-full items-center justify-between px-4 pb-8">
        <div className="flex items-center justify-center">
          <div className="w-[8rem] sm:h-[4.25rem] sm:w-[6.375rem]">
            <Skeleton className="h-[5rem] w-[5rem] rounded-full" />
          </div>
          <div className="ml-4 flex flex-wrap gap-2 text-xl font-normal text-[#1F1F29]">
            <span className="text-xl font-semibold text-[#8C236C]">
              <Skeleton className="h-8 w-24" />
            </span>{" "}
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
