import DesignerCard from "./DesignerCard";
import { designerGalleryImages } from "@/assets";

export default function Designers() {
  return (
    <div>
      {designerGalleryImages.map((image, i) => (
        <DesignerCard
          id="damsodR23Dmoa"
          name="Ghada Elkyat"
          address={{ city: "Alexandria", province: "Smoha" }}
          ratings={{ average: 3, totalCount: 120 }}
          wishlisted={false}
          yearsOfExperienceCount={5}
          key={i}
          img={image}
        />
      ))}
    </div>
  );
}
