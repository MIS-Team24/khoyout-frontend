import NavigationBar from "@/components/custom/Navbar/NavigationBar";
import DesignerProfileCard from "@/components/views/designers/DesignerProfileCard";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla
        itaque molestiae ullam blanditiis neque quos sint aperiam omnis! Iste
        minima laborum voluptatum quos voluptatibus pariatur vitae atque
        obcaecati dolorem.
        <DesignerProfileCard
          id="damsodR23Dmoa"
          name="Jupi Juuu"
          address={{ city: "Alexandria", province: "Asafra" }}
          ratings={{ average: 2.5, totalCount: 120 }}
          wishlisted={false}
          yearsOfExperienceCount={5}
          key={"asplflaspf"}
        />
      </div>
    </>
  );
}
