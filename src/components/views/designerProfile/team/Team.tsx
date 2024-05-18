import {
    Card, CardContent
} from "@/components/ui";
import {team} from "@/assets";

export default function Team() {

    return (
        <section>
            <div>
                <p className="text-foreground text-[2rem] mb-8">Team</p>
                <div className="flex flex-row gap-6 overflow-auto whitespace-nowrap no-scrollbar">
                    {team.map((member) => (
                        <Card className="p-2 min-w-48">
                            <CardContent className="p-0 text-center">
                                <img src={member.image.src} alt={member.image.alt}
                                     className="object-cover object-center rounded-md"/>
                                <div className="mt-6 ">
                                    <p className="text-2xl mb-2 font-medium">{member.name}</p>
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
