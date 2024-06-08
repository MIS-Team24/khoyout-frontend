import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui";
import {Clock, Calendar} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {useState} from "react";


export default function comingAppointmentPage() {
    const [value, setValue] = useState({
        upcoming: true,
    });
    const data = [
        {
            date: "In 19 Aug 2024",
            time:
                '11 : 00 AM',
            name: "Basma Adel",
        },
        {
            date: "In 20 Aug 2024",
            time:
                '12 : 00 AM',
            name: "Basma Adel",
        },
        {
            date: "In 21 Aug 2024",
            time:
                '1 : 00 PM',
            name: "Basma Adel",
        },
        {
            date: "In 22 Aug 2024",
            time:
                '2 : 00 PM',
            name: "Basma Adel",
        },
    ];
    return (
        <section className="main-container">
            <Breadcrumb className="my-6 lg:my-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/home" className="text-foreground">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    {value.upcoming ? (
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-foreground">Upcoming
                                appointments</BreadcrumbPage>
                        </BreadcrumbItem>
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-foreground">History</BreadcrumbPage>
                        </BreadcrumbItem>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="w-11/12 sm:w-[400px] xl:w-1/2 2xl:w-[40%] mx-auto">
                <Tabs defaultValue="upcoming">
                    <TabsList className="flex w-full justify-between bg-transparent mb-8">
                        <TabsTrigger value="upcoming" onClick={() => setValue({
                            upcoming: true
                        })
                        }
                                     className="text-foreground text-lg lg:text-[2rem] text-[#49454F] rounded-none data-[state='active']:!bg-transparent data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!shadow-none data-[state='active']:ring-0 data-[state='active']:text-foreground">Upcoming</TabsTrigger>
                        <hr className="bg-border w-0.5 h-6 rounded"/>
                        <TabsTrigger value="history" onClick={() => setValue({
                            upcoming: false
                        })
                        }
                                     className="text-foreground text-lg lg:text-[2rem] text-[#49454F] rounded-none data-[state='active']:!bg-transparent data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!shadow-none data-[state='active']:ring-0 data-[state='active']:text-foreground">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming" className="flex-col gap-8 data-[state='active']:flex mb-8">
                        {data.map(({date, time, name}, i) => (
                            <Card key={`
              upcoming-appointment-${i}
            `} className="bg-transparent">
                                <CardHeader>
                                    <CardDescription className="lg:text-xl text-foreground">
                                        Enjoy your upcoming appointment with <span
                                        className=" lg:text-xl font-semibold text-primary">{name}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex gap-8 place-items-center">
                                        <div className="flex gap-2 place-items-center">
                                            <Calendar size={24} className="text-secondary"/>
                                            <p className="text-[#49454F] text-lg lg:text-xl">{date}</p>
                                        </div>
                                        <div className="flex gap-2 place-items-center">
                                            <Clock size={24} className="text-secondary"/>
                                            <p className="text-[#49454F] text-lg lg:text-xl">
                                                {time}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-4">
                                    <Button variant="outline"
                                            className="text-primary font-medium text-xl hover:text-primary bg-transparent">Reschedule</Button>
                                    <Button variant="ghost"
                                            className="text-primary text-xl font-medium hover:text-primary">Cancel</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </TabsContent>
                    <TabsContent value="history" className=" flex-col gap-8 mb-8 data-[state='active']:flex">
                        {data.map(({date, time, name}, i) => (
                            <Card
                                key={`
              history-appointment-${i}
            `} className="bg-transparent">
                                <CardHeader>
                                    <CardDescription className="lg:text-xl text-foreground">
                                        Your previous appointment with <span
                                        className=" lg:text-xl font-semibold text-primary">{name}</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex gap-8 place-items-center">
                                        <div className="flex gap-2 place-items-center">
                                            <Calendar size={24} className="text-secondary"/>
                                            <p className="text-[#49454F] text-lg lg:text-xl">{date}</p>
                                        </div>
                                        <div className="flex gap-2 place-items-center">
                                            <Clock size={24} className="text-secondary"/>
                                            <p className="text-[#49454F] text-lg lg:text-xl">
                                                {time}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex gap-4">
                                    <Button className="h-12 text-xl font-medium">Write a review</Button>
                                    <Button variant="outline"
                                            className="text-primary font-medium text-xl hover:text-primary bg-transparent h-12">Message</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
