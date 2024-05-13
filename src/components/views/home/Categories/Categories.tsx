import { categories } from "@/assets";
import { motion } from "framer-motion";

const spring = {
  ease: "linear",
  type: "spring",
  stiffness: 50,
  damping: 10,
};

function Categories() {
  return (
    <section className="mt-16">
      <div className="mx-auto flex w-full items-center justify-center">
        <div className="flex max-w-[90rem] flex-col items-center text-center 2xl:text-start">
          <h2 className="w-full pb-8 text-[1.3rem] font-normal sm:text-[1.5rem] md:text-[2rem]">
            Browse Designers By Categories
          </h2>
          <div className="flex w-full flex-wrap justify-center gap-6 px-4 sm:px-0">
            {categories.map(({ src, alt }, i) => (
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={spring}
                className="h-[400px] w-full max-w-[708px] rounded-[0.25rem]"
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
        </div>
      </div>
    </section>
  );
}

export default Categories;
