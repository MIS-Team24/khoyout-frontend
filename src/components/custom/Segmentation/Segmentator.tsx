import { Clamp } from "@/utilities/clamp";
import { AnimatePresence } from "framer-motion";
import { Children } from "react";

type SegementatorProps = {
  children: React.ReactNode;
  currentSegment: number;
};

export function Segementator(props: SegementatorProps) {
  const segments = Children.toArray(props.children);

  return (
    <div className="flex flex-row overflow-hidden p-0">
      <AnimatePresence mode="wait">
        {segments[Clamp(props.currentSegment, 0, segments.length)]}
      </AnimatePresence>
    </div>
  );
}

export default Segementator;
