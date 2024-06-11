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
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui";
import { Clock, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/API/appointments/appointments";
import {
  API_AppointmentsResponse,
  API_AppointmentBody,
} from "@/API/types/appointments/appointments";
import useAuth from "@/hooks/useAuth";
import { Error } from "@/components/custom";
import { convertTo12HourFormat } from "@/utilities/convertTime";
import { format } from "date-fns";

export default function ComingAppointmentPage() {
  const [value, setValue] = useState({
    upcoming: true,
  });
  const { access_token } = useAuth();

  const getAppointmentsFn = () => getAppointments(access_token() ?? "");

  const getAppointmentsQuery = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointmentsFn,
  });

  return (
    <section className="main-container">
      <Breadcrumb className="my-6 lg:my-12">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/home" className="text-foreground">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {value.upcoming ? (
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-foreground">
                Upcoming appointments
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-foreground">
                History
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto sm:w-[400px] xl:w-1/2 2xl:w-[40%]">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8 flex w-full justify-between bg-transparent">
            <TabsTrigger
              value="upcoming"
              onClick={() =>
                setValue({
                  upcoming: true,
                })
              }
              className="rounded-none text-lg text-[#49454F] text-foreground data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!bg-transparent data-[state='active']:text-foreground data-[state='active']:!shadow-none data-[state='active']:ring-0 lg:text-[2rem]"
            >
              Upcoming
            </TabsTrigger>
            <hr className="h-6 w-0.5 rounded bg-border" />
            <TabsTrigger
              value="history"
              onClick={() =>
                setValue({
                  upcoming: false,
                })
              }
              className="rounded-none text-lg text-[#49454F] text-foreground data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!bg-transparent data-[state='active']:text-foreground data-[state='active']:!shadow-none data-[state='active']:ring-0 lg:text-[2rem]"
            >
              History
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="upcoming"
            className="mb-8 flex-col gap-8 data-[state='active']:flex"
          >
            {getAppointmentsQuery.isError ? (
              <Error
                title="Error"
                description="An error occurred while fetching appointments"
              />
            ) : getAppointmentsQuery.isPending ? (
              <p>Loading...</p>
            ) : getAppointmentsQuery.isSuccess ? (
              (
                (getAppointmentsQuery.data?.data as API_AppointmentsResponse)
                  .data as API_AppointmentBody[]
              ).map(({ designer, startTime, id }) => (
                <Card
                  key={`
                upcoming-appointment-id-${id}
              `}
                  className="bg-transparent"
                >
                  <CardHeader>
                    <CardDescription className="text-base text-foreground lg:text-xl">
                      Enjoy your upcoming appointment with{" "}
                      <span className="font-semibold text-primary lg:text-xl">
                        {designer.baseAccount.firstName}{" "}
                        {designer.baseAccount.lastName}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex place-items-center gap-8">
                      <div className="flex place-items-center gap-2">
                        <Calendar size={24} className="text-secondary" />
                        <p className="text-base text-[#49454F] lg:text-xl">
                          In {format(new Date(startTime), "dd MMMM yyyy")}
                        </p>
                      </div>
                      {/* <div className="flex place-items-center gap-2">
                        <Clock size={24} className="text-secondary" />
                        <p className="text-lg text-[#49454F] lg:text-xl">
                          {convert}
                        </p>
                      </div> */}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button
                      variant="outline"
                      className="bg-transparent text-xl font-medium text-primary hover:text-primary"
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-xl font-medium text-primary hover:text-primary"
                    >
                      Cancel
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Error
                title="Error"
                description="An error occurred while fetching appointments"
              />
            )}
          </TabsContent>
          <TabsContent
            value="history"
            className=" mb-8 flex-col gap-8 data-[state='active']:flex"
          >
            {/* {data.map(({ date, time, name }, i) => (
              <Card
                key={`
              history-appointment-${i}
            `}
                className="bg-transparent"
              >
                <CardHeader>
                  <CardDescription className="text-base text-foreground lg:text-xl">
                    Your previous appointment with{" "}
                    <span className="text-base font-semibold text-primary lg:text-xl">
                      {name}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex place-items-center gap-8">
                    <div className="flex place-items-center gap-2">
                      <Calendar size={24} className="text-secondary" />
                      <p className="text-base text-[#49454F] lg:text-xl">
                        {date}
                      </p>
                    </div>
                    <div className="flex place-items-center gap-2">
                      <Clock size={24} className="text-secondary" />
                      <p className="text-base text-[#49454F] lg:text-xl">
                        {time}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button className="h-12 text-base font-medium lg:text-xl">
                    Write a review
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 bg-transparent text-base font-medium text-primary hover:text-primary lg:text-xl"
                  >
                    Message
                  </Button>
                </CardFooter>
              </Card>
            ))} */}
            <div>Hello</div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
