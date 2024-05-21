import { Button, Input } from "@/components/ui";
import { Search, SlidersHorizontal } from "lucide-react";
import { aboutImg, bookImg } from "@/assets";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookingDialog, SectionHeader } from "@/components/custom";

const spring = {
  ease: "linear",
  type: "spring",
  stiffness: 100,
  damping: 10,
};

export default function About() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full">
      <div className="main-container my-16">
        <div className="flex flex-col gap-y-8">
          <SectionHeader title="About Khoyout" className="mb-5" />
          <div className="flex w-full flex-col items-center justify-between gap-y-10 px-4 xl:flex-row xl:gap-y-0 xl:px-0">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="w-[25rem] sm:w-[35rem]"
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
              className="w-full max-w-[40rem] space-y-[1.5rem]"
            >
              <p className="text-center text-[1.3rem] font-normal leading-normal text-[#49454F] md:text-[1.5rem] md:leading-[2rem] xl:text-start">
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

          <div className="flex w-full flex-col-reverse items-center justify-between gap-y-10 px-4 xl:flex-row xl:gap-y-0 xl:px-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="flex w-full max-w-[40rem] flex-col items-start justify-center gap-y-[1.5rem]"
            >
              <p className="text-center text-[1.3rem] font-normal leading-normal text-[#49454F] md:text-[1.5rem] md:leading-[2rem] xl:text-start">
                It helps you easily schedule appointments with your chosen
                tailor after exploring and choosing from our wide range of
                tailors
              </p>
              <Button
                type="button"
                className="h-[2.5rem] w-[18rem] rounded-[1rem] text-[1.2rem] font-medium leading-normal hover:bg-[#9E2B7A] sm:h-[3rem] sm:w-[23rem] sm:text-[1.5rem]"
                onClick={() => setOpen(true)}
              >
                Book Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={spring}
              className="w-[23rem] sm:w-[35rem]"
            >
              <img
                src={bookImg}
                alt="book-now-img"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        <BookingDialog
          designerName="Basma Adel"
          open={open}
          onChange={setOpen}
        />
      </div>
    </section>
  );
}
