import miniLogo from "@/assets/mini-logo.svg";
import { Button } from "@/components/ui";
import { Link, useRouterState } from "@tanstack/react-router";
import { initialTabs as tabs } from "./NavLinks";
import { motion } from "framer-motion";
import { RefObject, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

const NavigationBar = forwardRef(function (_, ref) {
  const router = useRouterState();
  const matches = router.matches;
  const [isExpanded, setIsExpanded] = useState<boolean>();

  return (
    <motion.nav
      className={cn(
        `fixed top-0 z-10 w-full overflow-hidden bg-white shadow-[rgba(33,33,33,0.1)_0px_1px_0px_0px] lg:h-20`,
        isExpanded ? "shadow-[rgba(33,33,33,0.1)_0px_3px_0px_0px] " : "",
      )}
      ref={ref as RefObject<HTMLDivElement>}
      animate={isExpanded ? { height: "auto" } : { height: "70px" }}
    >
      <Button
        className="absolute right-5 top-0 w-14 translate-y-1/2 rounded-none bg-transparent p-0 hover:bg-transparent lg:hidden"
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
      <div className="lg: mx-auto mb-8 mt-16 flex flex-col items-center justify-between pb-0 text-xl lg:my-0 lg:h-full lg:w-full lg:flex-row lg:pb-0 xl:w-4/5 xl:px-2">
        <div className="absolute left-4 top-3 h-12 w-20 lg:static">
          <img className="w-full" src={miniLogo} />
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
          <div className="flex items-center gap-4">
            <Link>
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
        </div>
      </div>
    </motion.nav>
  );
});

export default NavigationBar;
