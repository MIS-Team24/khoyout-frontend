import { Card, CardContent } from "@/components/ui";
import { team } from "@/assets";
import { SectionHeader } from "@/components/custom";

export default function Team() {
  return (
    <section>
      <div>
        <SectionHeader title="Team" className="mt-0" />
        <div className="no-scrollbar flex flex-row gap-6 overflow-y-auto overflow-x-hidden whitespace-nowrap">
          {team.map((member, i) => (
            <Card
              className="min-w-48 p-2"
              key={`
              team-member-${i}
            `}
            >
              <CardContent className="p-0 text-center">
                <img
                  src={member.image.src}
                  alt={member.image.alt}
                  className="rounded-md object-cover object-center"
                />
                <div className="mt-6 ">
                  <p className="mb-2 text-2xl font-medium">{member.name}</p>
                  <p className="text-base text-secondary">{member.job}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
