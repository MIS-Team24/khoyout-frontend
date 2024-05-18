import { Variants, motion } from "framer-motion";

type SegmentProps = {
  children: React.ReactNode;
};

const animationVariants: Variants = {
  unmount: { scale: 0.8, opacity: 0 },
  mount: { scale: 1, opacity: 1 },
  default: { scale: 0.8, opacity: 0 },
};

export default function Segment(props: SegmentProps) {
  return (
    <motion.div
      className="min-w-full overflow-hidden p-1"
      initial="default"
      animate="mount"
      exit="unmount"
      variants={animationVariants}
    >
      {props.children}
    </motion.div>
  );
}
