import { cn } from "@/lib/utils";

export default function SectionHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2 className={cn("mb-16 mt-8 text-[2rem] text-foreground", className)}>
      {title}
    </h2>
  );
}
