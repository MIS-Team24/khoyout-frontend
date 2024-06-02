import DesignerCard from "./DesignerCard";
import { API_Designer } from "@/API/types/designers/designers";

export default function Designers({
  desigenrs,
}: {
  desigenrs: API_Designer[];
}) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {desigenrs?.map(
          ({
            baseAccountId,
            ordersFinished,
            address,
            yearsExperience,
            rating,
            avatarUrl,
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
            />
          ),
        )}
      </div>
    </section>
  );
}
