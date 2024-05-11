import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
import DesignerProfileCard from "@/components/views/designers/DesignerProfileCard";

export default function Designers() {
  return (
    <NavigatablePageWrapper>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla
        itaque molestiae ullam blanditiis neque quos sint aperiam omnis! Iste
        minima laborum voluptatum quos voluptatibus pariatur vitae atque
        obcaecati dolorem.
        <DesignerProfileCard
          id="damsodR23Dmoa"
          name="Some Designer Bitch"
          address={{ city: "Alexandria", province: "Asafra" }}
          ratings={{ average: 2.5, totalCount: 120 }}
          wishlisted={false}
          yearsOfExperienceCount={5}
          key={"asplflaspf"}
        />
        Bank of stones right here
      </div>
    </NavigatablePageWrapper>
  );
}
