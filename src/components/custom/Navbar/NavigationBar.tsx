import miniLogo from "@/assets/mini-logo.svg";
import { Button } from "@/components/ui";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { initialTabs as tabs } from "./NavLinks";
import { motion } from "framer-motion";
import { RefObject, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getCurrentActiveUser } from "@/API/user/user";
import { API_LOGGED_IN_USER } from "@/API/types/user/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui";
import bell from "@/assets/icons/bell.svg";
import { ChevronDown, LogOut, NotepadText, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { getNotifications } from "@/API/notification/notification";
import { API_NotificationResponse } from "@/API/types/notifications/notifications";
import { logout } from "@/API/auth/login/login";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { stateSetLogout } from "@/store/features/user";

const NavigationBar = forwardRef(function (_, ref) {
  const dispatch = useDispatch();
  const router = useRouterState();
  const matches = router.matches;
  const [isExpanded, setIsExpanded] = useState<boolean>();
  const { access_token, auth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getCurrentUserFn = () => getCurrentActiveUser(access_token() ?? "");
  const getCurrentNotification = () => getNotifications(access_token() ?? "");
  const logoutFunction = () => logout(access_token() ?? "");

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutFunction,
    onSuccess: () => {
      navigate({ to: "/home", from: "/home" });
      queryClient.invalidateQueries({ queryKey: ["active-user"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Successfully Logged Out");
    },
    onError: () => {
      toast.error("Failed to logged out");
      queryClient.invalidateQueries({ queryKey: ["active-user"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const userQuery = useQuery({
    queryKey: ["active-user"],
    queryFn: getCurrentUserFn,
    retry: false,
  });

  let processedData: API_LOGGED_IN_USER | undefined = undefined;

  if (userQuery.isSuccess) {
    processedData = userQuery.data.data.user as API_LOGGED_IN_USER;
  }

  const notificationQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: getCurrentNotification,
    retry: false,
    enabled: !processedData,
  });

  let hasNotifications: boolean = false;

  if (notificationQuery.isSuccess) {
    const notifications: API_NotificationResponse = notificationQuery.data
      .data as API_NotificationResponse;

    const foundUnreadNotif = notifications.data.find((notif) => !notif.read);
    if (foundUnreadNotif) hasNotifications = true;
  }

  function onClickLogout() {
    logoutMutation.mutate();
    dispatch(stateSetLogout());
  }

  const toBeUsedTabs =
    auth.user?.user.type === "designer"
      ? tabs
      : tabs.filter((e) => e.label !== "Subscription");

  return (
    <motion.nav
      className={cn(
        `fixed top-0 z-20 w-full overflow-hidden bg-white shadow-[rgba(33,33,33,0.1)_0px_1px_0px_0px] lg:h-20`,
        isExpanded ? "shadow-[rgba(33,33,33,0.1)_0px_3px_0px_0px]" : "",
      )}
      ref={ref as RefObject<HTMLDivElement>}
      animate={isExpanded ? { height: "auto" } : { height: "70px" }}
      initial={isExpanded ? { height: "auto" } : { height: "70px" }}
    >
      <Button
        className="absolute right-5 top-[-5px] w-14 translate-y-1/2 rounded-none bg-transparent p-0 hover:bg-transparent lg:hidden"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <motion.div className="flex h-full w-full flex-col gap-2">
          <motion.div
            className="h-2 w-full bg-primary"
            animate={
              isExpanded
                ? {
                    transform: "translateY(14px) rotate(45deg)",
                    borderRadius: "10rem",
                  }
                : { transform: "none" }
            }
          ></motion.div>
          <motion.div
            className="h-2 w-full bg-primary"
            animate={isExpanded ? { opacity: 0 } : { opacity: 1 }}
          ></motion.div>
          <motion.div
            className="h-2 w-full bg-primary"
            animate={
              isExpanded
                ? {
                    transform: " translateY(-18px) rotate(-45deg)",
                    borderRadius: "10rem",
                  }
                : { transform: "none" }
            }
          ></motion.div>
        </motion.div>
      </Button>
      <div className="main-container mb-8 mt-16 flex flex-col items-center justify-between pb-0 text-xl lg:mt-0 lg:flex-row">
        <div className="absolute left-4 top-3 h-12 w-20 lg:static">
          <Link to="/">
            <img className="w-full" src={miniLogo} />
          </Link>
        </div>
        <div>
          <ul className="flex h-full flex-col items-center gap-6 lg:flex-row">
            {toBeUsedTabs.map((item) => {
              const isMatched =
                matches.findIndex(
                  (e) =>
                    e.pathname.toLowerCase() === `${item.path.toLowerCase()}`,
                ) !== -1;
              return (
                <motion.li
                  key={item.label}
                  className="relative h-full"
                  layout
                  layoutRoot
                >
                  <Link to={item.path} className="py-8 text-xl">
                    {item.label}
                  </Link>
                  {isMatched ? (
                    <motion.div
                      className="absolute bottom-[-10px] h-0 w-full rounded-full border-2 border-primary"
                      layoutId="underline"
                    />
                  ) : null}
                </motion.li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-10">
          {userQuery.isPending ? (
            <UserSkeleton />
          ) : userQuery.isSuccess ? (
            access_token() ? (
              <div className="flex items-center gap-5">
                <div>
                  <Link
                    className="relative m-0 h-[24px] w-[17px] rounded-none bg-transparent px-4 py-0 hover:bg-transparent"
                    to="/notifications"
                  >
                    <img src={bell} />
                    {hasNotifications ? (
                      <div className="absolute bottom-[40px] right-[-2px] h-1.5 w-1.5 rounded-full bg-[#b3261e] outline outline-2 outline-white"></div>
                    ) : null}
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex cursor-pointer items-center gap-2">
                        {processedData?.avatarURL ? (
                          <img
                            src={
                              processedData?.avatarURL + "?q=" + Math.random()
                            }
                            className="aspect-square w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ebf1]">
                            <User />
                          </div>
                        )}
                        <h1>
                          {/* {processedData?.firstName ?? "Unknown"}{" "}
                          {processedData?.lastName ?? "Unknown"} */}
                          {auth.user?.user.fullName ?? "Unknown User"}
                        </h1>
                        <Button className="cursor-pointer border-none bg-transparent text-black outline-none hover:bg-transparent">
                          <ChevronDown />
                        </Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link to="/my-profile" className="flex">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link to="/coming-appointment" className="flex">
                            <NotepadText className="mr-2 h-4 w-4" />
                            <span>Booking</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={onClickLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button
                    variant={"ghost"}
                    className="py-7 text-xl text-primary hover:text-primary"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant={"default"}
                    className="rounded-2xl px-4 py-7 text-xl"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant={"ghost"}
                  className="py-7 text-xl text-primary hover:text-primary"
                >
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant={"default"}
                  className="rounded-2xl px-4 py-7 text-xl"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
});

export default NavigationBar;

function UserSkeleton() {
  return (
    <div className="flex items-center gap-8">
      <div>
        <Skeleton className="aspect-square w-6" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="aspect-square w-12 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </div>
  );
}
