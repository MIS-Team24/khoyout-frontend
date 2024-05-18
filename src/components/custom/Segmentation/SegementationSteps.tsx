import { Variants, motion } from "framer-motion";
import { Children } from "react";
import { circle, circleCheck, circleDot } from "@/assets";
import { cn } from "@/lib/utils";

type SegementatorProps = {
  children: React.ReactNode;
  currentStep: number;
};

const animationVariants: Variants = {
  inactive: { scaleX: 0, transition: { ease: "linear" } },
  active: { scaleX: 1, transition: { ease: "linear" } },
};

export function SegementationSteps({
  children,
  currentStep,
}: SegementatorProps) {
  const steps = Children.toArray(children);

  return (
    <div className="flex w-full max-w-[18rem]">
      <div className="flex w-full">
        {steps.map(
          (_, i) =>
            i < steps.length - 1 && (
              <div
                key={i}
                className={cn(
                  "mx-auto flex items-center",
                  i < steps.length - 2 ? "w-full" : "w-full max-w-fit",
                )}
              >
                {i < steps.length - 1 && (
                  <div className="min-w-fit">
                    {currentStep > i ? (
                      <img
                        src={circleCheck}
                        alt="circle-check"
                        className="h-[1.75rem] w-[1.75rem] object-cover"
                      />
                    ) : currentStep === i ? (
                      <img
                        src={circleDot}
                        alt="circle-dot"
                        className="h-[1.75rem] w-[1.75rem] object-cover"
                      />
                    ) : (
                      <img
                        src={circle}
                        alt="circle"
                        className="h-[1.75rem] w-[1.75rem] object-cover"
                      />
                    )}
                  </div>
                )}
                {i < steps.length - 2 && (
                  <div className="relative mx-2 h-1 w-full rounded-lg bg-gray-400">
                    <motion.div
                      className="absolute left-0 top-0 h-full w-full rounded-lg bg-primary"
                      variants={animationVariants}
                      animate={currentStep > i ? "active" : "inactive"}
                      initial={{ scaleX: 0, transformOrigin: "left center" }}
                    ></motion.div>
                  </div>
                )}
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default SegementationSteps;
