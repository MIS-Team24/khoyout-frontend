import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui";
import {Button} from "@/components/ui";
import {Team, Reviews, BookingCard} from "../";

export default function Service() {
    const data = [{
        title: "Design from scratch",
        description: '"Crafting your vision from the ground up – our design from scratch service brings your ideas to life with creativity and precision."',
        price: "250 EGP"
    }, {
        title: "Design implementation",
        description: '"Expertly executing your designs with precision and passion."',
        price: "200 EGP"
    },
        {
            title: "Hand made",
            description: '"Artisanal elegance tailored just for you – where every stitch tells a story."',
            price: "300 EGP"
        },
        {
            title: "Redesign",
            description: '"Elevating tradition with a modern twist – our redesign service breathes new life into timeless garments."',
            price: "200 EGP"
        },
    ]
    return (
        <div
            className="flex flex-col lg:flex-row gap-8 mx-4 lg:mx-auto mb-8 mt-16 pb-0 text-xl lg:mt-[4.25rem] lg:h-full lg:w-full lg:pb-0 xl:w-4/5 xl:px-2">
            <div className="flex flex-col gap-[4.25rem] w-full lg:w-3/5 mx-auto">
                <section>
                    <div>
                        <p className="text-foreground text-[2rem] mb-8">Services</p>
                        <div className="flex flex-col gap-6">
                            {data.map((item) => (
                                <Card className="rounded-2xl ">
                                    <CardHeader className="gap-4">
                                        <CardTitle className="font-medium text-foreground">{item.title}</CardTitle>
                                        <CardDescription
                                            className="text-xl text-secondary">{item.description}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex place-items-center justify-between">
                                        <p
                                            className="text-xl font-medium text-foreground">From <span>{item.price}</span>
                                        </p>
                                        <Button variant="outline"
                                                className="px-6 py-3 text-primary text-xl font-medium rounded-2xl ">Book</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                <Team/>
                <Reviews/>
            </div>
            <div className="lg:w-2/5 sticky top-0">
                <BookingCard/>
            </div>
        </div>
    );
}
