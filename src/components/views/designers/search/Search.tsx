import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
} from "@/components/ui";
import { Search as SearchIcon } from "lucide-react";

const cateogries = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];

export default function Search() {
  return (
    <section className="main-container my-[4.5rem]">
      <div className="flex items-center justify-center gap-x-6">
        {/* Select Category */}
        <div>
          <Select>
            <SelectTrigger className="h-[3rem] w-[10rem] rounded-lg border-none bg-[#F3EBF1] py-[1rem] text-base text-[#49454F] transition hover:border-primary focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-offset-0">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent className="!overflow-visible">
              {cateogries.map((category, i) => (
                <SelectItem
                  key={`category-${i}`}
                  value={category.toLowerCase()}
                  className="relative cursor-pointer !overflow-visible"
                >
                  {category}
                  <div className="absolute right-20 top-0 bg-red-500">
                    "goodbye world"
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Search for designer */}
        <div className="flex h-[3rem] w-[22.3rem] items-center justify-center gap-x-0.5 rounded-[1rem] bg-[#F3EBF1] p-4 ring-1 ring-transparent focus-within:ring-transparent">
          <SearchIcon size={25} className="text-[#49454F]y" />
          <Input
            type="search"
            placeholder="Search for designer"
            className="border-none bg-transparent text-lg text-foreground ring-0 ring-transparent placeholder:text-[#49454F] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          />
        </div>
      </div>
    </section>
  );
}
