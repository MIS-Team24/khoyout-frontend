import { Button } from "@/components/ui";
import { ListFilter } from "lucide-react";

type DesignerToogleViewProps = {
  handleToggle: () => void;
};

export default function DesignerToogleView({
  handleToggle,
}: DesignerToogleViewProps) {
  return (
    <Button
      variant="outline"
      className="h-[3rem] w-[8rem] space-x-1 rounded-lg border text-lg font-medium text-primary hover:border-primary hover:text-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
      onClick={handleToggle}
    >
      <span className="pr-[0.5rem]">Filter</span>
      <ListFilter className="h-5 w-5" />
    </Button>
  );
}
