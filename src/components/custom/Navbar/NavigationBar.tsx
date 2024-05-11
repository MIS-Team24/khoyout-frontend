import miniLogo from "@/assets/mini-logo.svg";
import { Button } from "@/components/ui";
import { Link, useRouterState } from "@tanstack/react-router";
import { initialTabs as tabs } from "./NavLinks";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, forwardRef } from "react";

const NavigationBar = forwardRef(function (_, ref) {
  const router = useRouterState();
  const matches = router.matches;

  return (
    <nav
      className="fixed top-0 z-10 h-20 w-full bg-white shadow-[rgba(33,33,33,0.1)_0px_1px_0px_0px]"
      ref={ref as RefObject<HTMLDivElement>}
    >
      <div className="mx-auto flex h-full w-4/5 items-center justify-between text-xl">
        <div className="h-12 w-20">
          <img className="w-full" src={miniLogo} />
        </div>
        <div>
          <ul className="flex h-full items-center gap-6">
            {tabs.map((item) => {
              const isMatched =
                matches.findIndex(
                  (e) =>
                    e.pathname.toLowerCase() === `${item.path.toLowerCase()}`,
                ) !== -1;
              return (
                <li key={item.label} className="relative h-full">
                  <Link to={item.path} className="py-8 text-xl">
                    {item.label}
                  </Link>
                  <AnimatePresence>
                    {isMatched ? (
                      <motion.div
                        className="absolute bottom-[-10px] h-0 w-full rounded-full border-2 border-primary"
                        layoutId="underline"
                      />
                    ) : null}
                  </AnimatePresence>
                </li>
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
    </nav>
  );
});

export default NavigationBar;
