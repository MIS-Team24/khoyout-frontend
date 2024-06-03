import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const sortingOptions = ["Most Booked", "Highest Review", "Highest Rated"];

export default function DesignerSorting() {
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  console.log(selectedSubCategory);

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
        {sortingOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            className="cursor-pointer rounded-[0.5rem]"
            onClick={() => setSelectedSubCategory(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
