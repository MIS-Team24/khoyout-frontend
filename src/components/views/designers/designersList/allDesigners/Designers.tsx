import { cn } from "@/lib/utils";
import DesignerCard from "./DesignerCard";
import { API_Designer } from "@/API/types/designers/designers";

type DesignerProps = {
  desigenrs: API_Designer[];
  isOpen: boolean;
};

export default function Designers({ desigenrs, isOpen }: DesignerProps) {
  return (
    <section>
      <div
        className={cn(
          "grid grid-cols-1 gap-8 md:grid-cols-2",
          isOpen ? "md:grid-cols-3" : "lg:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {desigenrs?.map(
          ({
            baseAccountId,
            ordersFinished,
            address,
            yearsExperience,
            rating,
            avatarUrl,
            gender,
            name,
            openNow,
            openUntil,
          }) => (
            <DesignerCard
              id={baseAccountId}
              name={name}
              // address={{ city: location, province: location }}
              address={address}
              ratings={{ average: rating, totalCount: ordersFinished }}
              wishlisted={false}
              yearsOfExperienceCount={yearsExperience}
              key={baseAccountId}
              img={avatarUrl}
              openNow={openNow}
              openUntil={openUntil}
              gender={gender}
            />
          ),
        )}
      </div>
    </section>
  );
}
