import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Input,
  Button,
} from "@/components/ui";

import { Search as SearchIcon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const cateogries = ["Casual", "Formal", "Classic", "Soiree"];
const subCategories = [
  "Dresses",
  "Skirts",
  "Blouses",
  "Coats & Jackets",
  "Pants",
  "Suits",
];

type SearchProps = {
  setName: (name: string) => void;
};

export default function Search({ setName }: SearchProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredValue, setFilteredValue] = useState("");

  // TODO: Fetch designers based on selectedSubCategory and filteredValue
  console.log(selectedSubCategory);

  // TODO: REMOVE "mb-[1rem]" class from the section

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (filteredValue !== undefined) {
        setName(filteredValue);
      }
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [filteredValue]);

  return (
    <section className="main-container -mb-[1rem] mt-[4.5rem]">
      <div className="flex items-center justify-center gap-x-6">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-[3rem] w-[10rem] rounded-lg border-none bg-[#F3EBF1] py-[1rem] text-base font-normal text-[#49454F] hover:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0"
              >
                <span className="pr-[0.5rem]">Categories</span>
                <ChevronDown className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10rem] space-y-2 border-[#F3EBF1] py-2 shadow-[0_4px_25px_0px_rgba(108,108,108,0.15)]">
              {cateogries.map((cat) => (
                <DropdownMenuSub key={cat}>
                  <DropdownMenuSubTrigger className="cursor-pointer rounded-[0.5rem]">
                    {cat}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="ml-2 w-[8rem] space-y-2 rounded-[0.5rem] border-[#F3EBF1] py-2 shadow-[0_4px_25px_0px_rgba(108,108,108,0.15)]">
                      {subCategories.map((subCat) => (
                        <DropdownMenuItem
                          key={subCat}
                          className="cursor-pointer rounded-[0.5rem]"
                          onClick={() =>
                            setSelectedSubCategory(subCat.toLowerCase())
                          }
                        >
                          {subCat}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex h-[3rem] w-[22.3rem] items-center justify-center gap-x-0.5 rounded-[1rem] bg-[#F3EBF1] p-4 ring-1 ring-transparent focus-within:ring-transparent">
          <SearchIcon size={25} className="text-[#49454F]y" />
          <Input
            type="search"
            placeholder="Search for designer"
            className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:font-normal placeholder:text-[#49454F] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            value={filteredValue}
            onChange={(e) => {
              setFilteredValue(e.target.value);
            }}
          />
        </div>
      </div>
    </section>
  );
}
