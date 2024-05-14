import { Variants, motion } from "framer-motion";

type SegmentProps = {
  children: React.ReactNode;
};

const animationVariants: Variants = {
  unmount: { opacity: 0 },
  mount: { opacity: 1 },
  default: { opacity: 0 },
};

export default function SegmentStep(props: SegmentProps) {
  return (
    <motion.div
      className="min-w-full overflow-hidden p-1 text-sm text-primary"
      initial="default"
      animate="mount"
      exit="unmount"
      variants={animationVariants}
    >
      {props.children}
    </motion.div>
  );
}
