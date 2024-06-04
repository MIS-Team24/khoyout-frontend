import { FilterType } from "@/API/designers/designers";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@/components/ui";
import { ChevronDown } from "lucide-react";

const sortingOptions = [
  { title: "Most Booked", value: "mostBooked" },
  { title: "Highest Reviews", value: "highestReviews" },
  { title: "Highest Rated", value: "highestRated" },
];

type DesignerSortingProps = {
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
};

export default function DesignerSorting({
  setFilterType,
}: DesignerSortingProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-[3rem] w-[8rem] rounded-lg border text-lg font-medium text-[#49454F] text-primary hover:border-primary hover:text-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
        >
          <span className="pr-[0.5rem]">Sort by</span>
          <ChevronDown className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[10rem] space-y-2 rounded-[0.5rem] border-[#F3EBF1] py-2 shadow-[0_4px_25px_0px_rgba(108,108,108,0.15)]">
        {sortingOptions.map(({ title, value }) => (
          <DropdownMenuItem
            key={value}
            className="cursor-pointer rounded-[0.5rem]"
            onClick={() =>
              setFilterType((prev) => ({
                ...prev,
                sortBy: value,
              }))
            }
          >
            {title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
