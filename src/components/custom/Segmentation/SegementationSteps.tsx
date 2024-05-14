import { Clamp } from "@/utilities/clamp";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Children } from "react";

type SegementatorProps = {
  children: React.ReactNode;
  currentStep: number;
};

const animationVariants: Variants = {
  inactive: { scaleX: 0, transition: { ease: "linear" } },
  active: { scaleX: 1, transition: { ease: "linear" } },
};

export function SegementationSteps(props: SegementatorProps) {
  const steps = Children.toArray(props.children);

  return (
    <div className="gap-21 flex w-full flex-col p-0">
      <div>
        <AnimatePresence mode="wait">
          {steps[Clamp(props.currentStep, 0, steps.length)]}
        </AnimatePresence>
      </div>
      <div className="flex w-full gap-1">
        {steps.map((_, index) => (
          <div className="relative h-1 w-full bg-gray-400" key={index}>
            <motion.div
              className="absolute left-0 top-0 h-full w-full bg-primary"
              variants={animationVariants}
              animate={props.currentStep >= index ? "active" : "inactive"}
              initial={{ scaleX: 0, transformOrigin: "left center" }}
            ></motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SegementationSteps;
