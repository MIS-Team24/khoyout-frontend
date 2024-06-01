import { NavigatablePageWrapper } from "@/components/custom";
import { DesignersFilter, Search } from "@/components/views/designers";
import { Inspiration } from "@/components/views/home";

export default function Designers() {
  return (
    <NavigatablePageWrapper>
      <Search />
      {/* <Inspiration title="Inspiration For You" /> */}
      {/* <DesignersFilter /> */}
      <div></div>
    </NavigatablePageWrapper>
  );
}
