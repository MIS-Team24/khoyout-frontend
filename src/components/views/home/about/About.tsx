import { Button, Input } from "@/components/ui";
import { Search, SlidersHorizontal } from "lucide-react";
import { aboutImg, bookImg } from "@/assets";
import { motion } from "framer-motion";

const spring = {
  ease: "linear",
  type: "spring",
  stiffness: 50,
  damping: 10,
};

export default function About() {
  return (
    <section className="my-[5rem]">
      <div className="mx-auto h-[65rem] w-[75rem]">
        <div className="flex flex-col gap-y-8">
          <h2 className="text-[2rem] font-normal leading-normal">
            About Khoyout
          </h2>
          <div className="flex w-full items-center justify-between gap-x-[4.75rem]">
            {/* fade in left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="h-[30rem] w-[32rem]"
            >
              <img
                src={aboutImg}
                alt="about-img"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="space-y-[1.5rem]"
            >
              <p className="w-[37rem] text-[1.5rem] font-normal leading-[2rem] text-[#49454F]">
                Khoyout is your one-stop destination for effortlessly finding
                the perfect tailor to suit your needs, anywhere and everywhere
              </p>
              <form className="w-full">
                <div className="flex h-[3.5rem] items-center justify-center gap-x-0.5 rounded-xl bg-[#F3EBF1] p-4">
                  <Search size={27} className="text-secondary" />
                  <Input
                    type="search"
                    placeholder="Search for designer"
                    className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                  <SlidersHorizontal size={27} className="text-secondary" />
                </div>
              </form>
            </motion.div>
          </div>

          <div className="flex w-full items-center justify-between gap-x-[4.75rem]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="flex flex-col items-center justify-center gap-y-[1.5rem]"
            >
              <p className="w-[37rem] text-start text-[1.5rem] font-normal leading-[2rem] text-[#49454F]">
                It helps you easily schedule appointments with your chosen
                tailor after exploring and choosing from our wide range of
                tailors
              </p>
              <Button
                type="button"
                className="h-[3rem] w-[23rem] rounded-[1rem] text-[1.5rem] font-medium leading-normal hover:bg-[#9E2B7A]"
              >
                Book Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="h-[27.87rem] w-[30rem]"
            >
              <img
                src={bookImg}
                alt="book-now-img"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
