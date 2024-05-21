import { plusIcon } from "@/assets";
import { Link } from "@tanstack/react-router";

export default function StylePreferences() {
  return (
    <div className="flex w-full flex-col gap-8 rounded-xl bg-[#F3EBF1] p-6">
      <div className="gap-2">
        <h2 className="h-[2.4rem] w-[19.1rem] text-[2rem] font-normal">
          My Style preferences
        </h2>
        <p className="h-12 w-[32.25rem] pt-4 text-base font-normal leading-6 text-[#6C6C6C]">
          By entering your style preferences, you'll help us match you with
          designers who specialize in your preferred styles
        </p>
      </div>
      {/* TODO */}
      <Link className="flex w-full items-center justify-start gap-x-2 pb-4 text-xl leading-8 text-[#76526A]">
        <img src={plusIcon} alt="Plus Icon" className="h-6 w-6" />
        <span>Add your preferred style</span>
      </Link>
    </div>
  );
}
