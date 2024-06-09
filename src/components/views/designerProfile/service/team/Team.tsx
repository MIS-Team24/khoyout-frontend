import { Card, CardContent } from "@/components/ui";
import { SectionHeader } from "@/components/custom";
import { TeamMember } from "@/API/types/designer/designer";

type TeamProps = {
  teamMembers: TeamMember[];
};

export default function Team({ teamMembers }: TeamProps) {
  return (
    <section>
      <div>
        <SectionHeader title="Team" className="mt-0" />
        <div className="no-scrollbar flex flex-row gap-6 overflow-y-auto overflow-x-hidden whitespace-nowrap">
          {teamMembers.map(({ avatarUrl, name, role }) => (
            <Card className="min-w-48 p-2" key={`${name}`}>
              <CardContent className="p-0 text-center">
                <img
                  src={avatarUrl}
                  alt={`team member name ${name} role ${role}`}
                  className="rounded-md object-cover object-center"
                />
                <div className="mt-6 ">
                  <p className="mb-2 text-2xl font-medium">{name}</p>
                  <p className="text-base text-secondary">{role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
