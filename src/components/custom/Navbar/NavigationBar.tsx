import miniLogo from "@/assets/mini-logo.svg";
import { Button } from "@/components/ui";
import { Link, useRouterState } from "@tanstack/react-router";
import { initialTabs as tabs } from "./NavLinks";
import { motion } from "framer-motion";
import { RefObject, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getCurrentActiveUser } from "@/API/user/user";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import bell from "@/assets/icons/bell.svg";
import { ChevronDown, LogOut, User } from "lucide-react";
import pfp from "@/assets/hager.jpeg";
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

const NavigationBar = forwardRef(function (_, ref) {
  // const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const router = useRouterState();
  const matches = router.matches;
  const [isExpanded, setIsExpanded] = useState<boolean>();
  const { access_token } = useAuth();

  const getCurrentUserFn = () => getCurrentActiveUser(access_token() ?? "");

  const userQuery = useQuery({
    queryKey: ["active-user"],
    queryFn: getCurrentUserFn,
    retry: false,
  });

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
                <Button className="m-0 rounded-none bg-transparent hover:bg-transparent">
                  <img src={bell} />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Link className="flex items-center gap-2">
                  <img
                    src={pfp}
                    className="aspect-square w-12 rounded-full object-cover"
                  />
                  <h1>Some Client</h1>
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
                      <DropdownMenuItem>
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
