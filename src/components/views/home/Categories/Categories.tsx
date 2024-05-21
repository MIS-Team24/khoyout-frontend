import { categories } from "@/assets";
import { SectionHeader } from "@/components/custom";
import { motion } from "framer-motion";

const spring = {
  ease: "linear",
  type: "spring",
  stiffness: 50,
  damping: 10,
};

function Categories() {
  return (
    <section className="main-container mt-16">
      <SectionHeader title="Browse Designers By Categories" className="mb-6" />
      <div className="grid h-full w-full grid-cols-1 place-content-between gap-5 lg:grid-cols-2">
        {categories.map(({ src, alt }, i) => (
          <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={spring}
            className="h-[400px] w-full rounded-[0.25rem]"
            key={i}
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-full rounded-[0.5rem] object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
