import { cn } from "@/lib/utils";
import DesignerCard from "./DesignerCard";
import { API_Designer } from "@/API/types/designers/designers";

type DesignerProps = {
  desigenrs: API_Designer[];
};

export default function Designers({ desigenrs }: DesignerProps) {
  return (
    <section className="w-full">
      <div
        className={cn(
          "relative grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
