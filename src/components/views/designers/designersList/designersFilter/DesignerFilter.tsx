import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Label,
} from "@/components/ui";
import { API_Provinces } from "@/API/response_enums";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Plus, Minus } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { FilterType } from "@/API/designers/designers";

const provinces = Object.keys(API_Provinces) as Array<
  keyof typeof API_Provinces
>;

type DesignerFilterProps = {
  filterType: FilterType;
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
};

function findProvince(province: string) {
  const existingPro = provinces.find((pro) => API_Provinces[pro] === province);
  const foundPro = existingPro ? API_Provinces[existingPro] : "Location";
  return foundPro.split("-").join(" ");
}

export default function DesignerFilter({
  filterType,
  setFilterType,
}: DesignerFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <aside>
      <div className="flex flex-col gap-y-4">
        <div>
          <h3 className="pb-4 text-xl leading-8">Location</h3>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              asChild
              className="rounded border-[#B1B1B1] bg-background ring-0 ring-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            >
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                  "w-[200px] justify-between font-normal",
                  location ? "text-black" : "text-[#6C6C6C]",
                )}
              >
                {findProvince(filterType.location)}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] rounded p-0">
              <Command>
                <CommandInput placeholder="Search For Location" />
                <CommandEmpty>No Location found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {provinces.map((pro) => (
                      <CommandItem
                        className="cursor-pointer rounded"
                        key={pro}
                        value={API_Provinces[pro]}
                        onSelect={(currentValue) => {
                          setFilterType((prev) => ({
                            ...prev,
                            location:
                              currentValue === filterType.location
                                ? ""
                                : currentValue,
                          }));
                          setOpen(false);
                        }}
                      >
                        <Checkbox
                          checked={filterType.location === API_Provinces[pro]}
                          className={cn(
                            "mr-2 rounded",
                            filterType.location === API_Provinces[pro]
                              ? "bg-primary"
                              : "border-[#6C6C6C] bg-background",
                          )}
                        />

                        {API_Provinces[pro].split("-").join(" ")}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <h3 className="pb-4 text-xl leading-8">Rating</h3>
          <RadioGroup
            onValueChange={(value) => {
              setFilterType((prev) => ({
                ...prev,
                minRating: Number(value),
              }));
            }}
            value={String(filterType.minRating)}
            defaultValue={String(filterType.minRating)}
            className="flex flex-col-reverse"
          >
            {Array.from({ length: 5 })
              .fill(0)
              .map((_, i) => (
                <div
                  className="flex h-7 items-center justify-start gap-x-2"
                  key={"Star Rating " + i + 1}
                >
                  <RadioGroupItem
                    value={String(i + 1)}
                    id={String(i + 1)}
                    className={cn(
                      filterType.minRating === i + 1
                        ? "border-primary"
                        : "border-[#49454F]",
                    )}
                  />
                  <Label htmlFor={String(i + 1)} className="cursor-pointer">
                    <Rating
                      initialValue={i + 1}
                      className="relative mb-[1px] w-full"
                      iconsCount={5}
                      readonly={true}
                      SVGclassName={`inline-block`}
                      allowFraction={true}
                      size={22}
                    />
                    <span className="ml-1 text-base font-normal text-[#49454F]">
                      {i + 1 === 5 ? "only" : "& up"}
                    </span>
                  </Label>
                </div>
              ))}
          </RadioGroup>
        </div>
        <div>
          <h3 className="pb-4 text-xl leading-8">Gender</h3>
          <RadioGroup
            onValueChange={(value) => {
              setFilterType((prev) => ({
                ...prev,
                gender: value,
              }));
            }}
            value={filterType.gender}
            defaultValue={filterType.gender}
            className="flex gap-x-6"
          >
            <div className="flex items-center justify-start gap-x-2">
              <RadioGroupItem
                value="Male"
                id="male"
                className={cn(
                  filterType.gender === "Male"
                    ? "border-primary"
                    : "border-[#49454F]",
                )}
              />
              <Label
                htmlFor="male"
                className="mt-1 cursor-pointer text-base font-normal text-[#49454F]"
              >
                Male
              </Label>
            </div>
            <div className="flex items-center justify-start gap-x-2">
              <RadioGroupItem
                value="Female"
                id="female"
                className={cn(
                  filterType.gender === "Female"
                    ? "border-primary"
                    : "border-[#49454F]",
                )}
              />
              <Label
                htmlFor="female"
                className="mt-1 cursor-pointer text-base font-normal text-[#49454F]"
              >
                Female
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <h3 className="pb-4 text-xl leading-8">Years Of experience</h3>
          <div className="flex w-full flex-row-reverse items-center justify-end gap-x-4">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-[2.75rem] rounded border-[1.5px] border-[#1F1F29] text-[#1F1F29] hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => {
                setFilterType((prev) => ({
                  ...prev,
                  yearsOfExperience: filterType.yearsOfExperience + 1,
                }));
              }}
            >
              <Plus size={17} />
            </Button>
            <span
              className={cn(
                "text-base",
                filterType.yearsOfExperience === 0
                  ? "text-[#6C6C6C]"
                  : "text-primary",
              )}
            >
              {filterType.yearsOfExperience ?? 0}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-[2.75rem] rounded border-[1.5px] border-[#1F1F29] text-[#1F1F29] hover:border-primary hover:bg-transparent hover:text-primary"
              onClick={() => {
                setFilterType((prev) => ({
                  ...prev,
                  yearsOfExperience: filterType.yearsOfExperience - 1,
                }));
              }}
              disabled={
                filterType.yearsOfExperience === 0 ||
                filterType.yearsOfExperience === undefined
              }
            >
              <Minus size={15} />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Label htmlFor="opened" className="text-xl font-normal leading-8">
            Opened
          </Label>
          <Checkbox
            checked={filterType.openNow ?? false}
            onCheckedChange={() => {
              setFilterType((prev) => ({
                ...prev,
                openNow: !prev.openNow,
              }));
            }}
            className={cn(
              "h-[1.25rem] w-[1.25rem] rounded bg-background",
              filterType.openNow ? "border-primary" : "border-[#6C6C6C]",
            )}
            id="opened"
            name="opened"
          />
        </div>
      </div>
    </aside>
  );
}
