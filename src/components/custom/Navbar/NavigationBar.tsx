import miniLogo from "@/assets/mini-logo.svg";
import {
  Button,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Input,
} from "@/components/ui";
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
import { ChevronDown, LogOut, SearchIcon, User } from "lucide-react";
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

const NavigationBar = forwardRef(function (_, ref) {
  const router = useRouterState();
  const matches = router.matches;
  const [isExpanded, setIsExpanded] = useState<boolean>();
  const { access_token } = useAuth();
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
  }

  return (
    <motion.nav
      className={cn(
        `fixed top-0 z-20 w-full overflow-hidden bg-white shadow-[rgba(33,33,33,0.1)_0px_1px_0px_0px] lg:h-20`,
        isExpanded ? "shadow-[rgba(33,33,33,0.1)_0px_3px_0px_0px] " : "",
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
          {userQuery.isSuccess ? (
            <NavbarSearch />
          ) : (
            <ul className="flex h-full flex-col items-center gap-6 lg:flex-row">
              {tabs.map((item) => {
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
          )}
        </div>
        <div className="flex items-center gap-10">
          <div>
            <Link>
              <Button
                variant={"outline"}
                className="rounded-2xl px-5 py-7 text-xl text-primary hover:text-primary"
              >
                For Business
              </Button>
            </Link>
          </div>
          {userQuery.isPending ? (
            <UserSkeleton />
          ) : userQuery.isSuccess ? (
            <div className="flex items-center gap-8">
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
                <Link className="flex items-center gap-2">
                  {processedData?.avatarURL ? (
                    <img
                      src={processedData?.avatarURL ?? ""}
                      className="aspect-square w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ebf1]">
                      <User />
                    </div>
                  )}
                  <h1>
                    {processedData?.firstName ?? "Unknown"}{" "}
                    {processedData?.lastName ?? "Unknown"}
                  </h1>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer border-none bg-transparent text-black outline-none hover:bg-transparent">
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onClickLogout}>
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
          )}
        </div>
      </div>
    </motion.nav>
  );
});

export default NavigationBar;

const cateogries = ["Casual", "Formal", "Classic", "Soiree"];
const subCategories = [
  "Dresses",
  "Skirts",
  "Blouses",
  "Coats & Jackets",
  "Pants",
  "Suits",
];

function NavbarSearch() {
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredValue, setFilteredValue] = useState("");

  console.log(selectedSubCategory);

  return (
    <div className="my-4 flex flex-wrap items-center justify-center gap-6 lg:flex-nowrap">
      {/* Select Category */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-[3rem] w-[10rem] rounded-lg border-none bg-[#F3EBF1] py-[1rem] text-base font-normal text-[#49454F] hover:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
            >
              <span className="pr-[0.5rem]">Categories</span>
              <ChevronDown className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[10rem] space-y-2 border-[#F3EBF1] py-2 shadow-[0_4px_25px_0px_rgba(108,108,108,0.15)]">
            {cateogries.map((cat) => (
              <DropdownMenuSub key={cat}>
                <DropdownMenuSubTrigger className="cursor-pointer rounded-[0.5rem]">
                  {cat}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="ml-2 w-[8rem] space-y-2 rounded-[0.5rem] border-[#F3EBF1] py-2 shadow-[0_4px_25px_0px_rgba(108,108,108,0.15)]">
                    {subCategories.map((subCat) => (
                      <DropdownMenuItem
                        key={subCat}
                        className="cursor-pointer rounded-[0.5rem]"
                        onClick={() =>
                          setSelectedSubCategory(subCat.toLowerCase())
                        }
                      >
                        {subCat}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Search for designer */}
      <div className="flex h-[3rem] w-[22.3rem] items-center justify-center gap-x-0.5 rounded-[1rem] bg-[#F3EBF1] p-4 ring-1 ring-transparent focus-within:ring-transparent">
        <SearchIcon size={25} className="text-[#49454F]y" />
        <Input
          type="search"
          placeholder="Search for designer"
          className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:font-normal placeholder:text-[#49454F] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          value={filteredValue}
          onChange={(e) => setFilteredValue(e.target.value)}
        />
      </div>
    </div>
  );
}

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
