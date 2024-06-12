import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
  Button,
} from "@/components/ui";
import { Calendar, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/API/appointments/appointments";
import {
  API_AppointmentsResponse,
  API_AppointmentBody,
} from "@/API/types/appointments/appointments";
import useAuth from "@/hooks/useAuth";
import { Error, LoadingState } from "@/components/custom";
import { format } from "date-fns";
import { upcomingImg } from "@/assets";
import WriteAReview from "./WriteReview";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export default function ComingAppointmentPage() {
  const { access_token } = useAuth();
  const [reviewdEntity, setReviewdEntity] = useState({
    designerId: "",
    appointmentId: 0,
    designerName: "",
  });

  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const [value, setValue] = useState({
    upcoming: true,
  });
  const getAppointmentsFn = () => getAppointments(access_token() ?? "");

  const getAppointmentsQuery = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointmentsFn,
  });

  function onClickWriteReview(
    designerId: string,
    designerName: string,
    appotId: number,
  ) {
    setReviewdEntity({
      appointmentId: appotId,
      designerId: designerId,
      designerName: designerName,
    });
    setIsReviewOpen(true);
  }

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
              className="relative rounded-none text-lg text-[#49454F] text-foreground data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!bg-transparent data-[state='active']:text-foreground data-[state='active']:!shadow-none data-[state='active']:ring-0 lg:text-[2rem]"
            >
              Upcoming
              <span className="absolute -right-5 top-0 flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-full bg-primary text-base font-medium text-white">
                {getAppointmentsQuery.isError ? (
                  <div className="hidden"></div>
                ) : getAppointmentsQuery.isPending ? (
                  <LoadingState className="mx-auto h-4 w-4" />
                ) : getAppointmentsQuery.isSuccess ? (
                  (
                    (
                      getAppointmentsQuery.data
                        ?.data as API_AppointmentsResponse
                    ).data as API_AppointmentBody[]
                  ).filter((x) => x.status === "Booked").length
                ) : (
                  0
                )}
              </span>
            </TabsTrigger>
            <hr className="h-6 w-0.5 rounded bg-border" />
            <TabsTrigger
              value="history"
              onClick={() =>
                setValue({
                  upcoming: false,
                })
              }
              className="relative rounded-none text-lg text-[#49454F] text-foreground data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!bg-transparent data-[state='active']:text-foreground data-[state='active']:!shadow-none data-[state='active']:ring-0 lg:text-[2rem]"
            >
              History
              <span className="absolute -right-5 top-0 flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-full bg-primary text-base font-medium text-white">
                {getAppointmentsQuery.isError ? (
                  <div className="hidden"></div>
                ) : getAppointmentsQuery.isPending ? (
                  <LoadingState className="mx-auto h-4 w-4" />
                ) : getAppointmentsQuery.isSuccess ? (
                  (
                    (
                      getAppointmentsQuery.data
                        ?.data as API_AppointmentsResponse
                    ).data as API_AppointmentBody[]
                  ).filter(
                    (x) => x.status === "Finished" || x.status === "Missed",
                  ).length
                ) : (
                  0
                )}
              </span>
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
                image={upcomingImg}
              />
            ) : getAppointmentsQuery.isPending ? (
              <p>Loading...</p>
            ) : getAppointmentsQuery.isSuccess ? (
              (
                (getAppointmentsQuery.data?.data as API_AppointmentsResponse)
                  .data as API_AppointmentBody[]
              ).filter((x) => x.status === "Booked").length === 0 ? (
                <div className="my-10">
                  <Error
                    title="No history available"
                    description="You have no history of appointments at the moment."
                    image={upcomingImg}
                  />
                </div>
              ) : (
                (
                  (getAppointmentsQuery.data?.data as API_AppointmentsResponse)
                    .data as API_AppointmentBody[]
                )
                  .filter((x) => x.status === "Booked")
                  .map(({ designer, startTime, id }) => (
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
                          <div className="flex place-items-center gap-2">
                            <Clock size={24} className="text-secondary" />
                            <p className="text-lg text-[#49454F] lg:text-xl">
                              {timeFormatter.format(new Date(startTime))}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )
            ) : (
              <Error
                title="Error"
                description="An error occurred while fetching appointments"
                image={upcomingImg}
              />
            )}
          </TabsContent>
          <TabsContent
            value="history"
            className=" mb-8 flex-col gap-8 data-[state='active']:flex"
          >
            {getAppointmentsQuery.isError ? (
              <Error
                title="Error"
                description="An error occurred while fetching appointments"
                image={upcomingImg}
              />
            ) : getAppointmentsQuery.isPending ? (
              <p>Loading...</p>
            ) : getAppointmentsQuery.isSuccess ? (
              (
                (getAppointmentsQuery.data?.data as API_AppointmentsResponse)
                  .data as API_AppointmentBody[]
              ).filter((x) => x.status === "Finished" || x.status === "Missed")
                .length === 0 ? (
                <div className="my-10">
                  <Error
                    title="No history available"
                    description="You have no history of appointments at the moment."
                    image={upcomingImg}
                  />
                </div>
              ) : (
                (
                  (getAppointmentsQuery.data?.data as API_AppointmentsResponse)
                    .data as API_AppointmentBody[]
                )
                  .filter(
                    (x) => x.status === "Finished" || x.status === "Missed",
                  )
                  .map(({ designer, startTime, id, status, leftReview }) => (
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
                          <div className="flex place-items-center gap-2">
                            <Clock size={24} className="text-secondary" />
                            <p className="text-lg text-[#49454F] lg:text-xl">
                              {timeFormatter.format(new Date(startTime))}
                            </p>
                          </div>
                          <div className="flex place-items-center gap-2">
                            <p className="text-lg text-[#49454F] lg:text-xl">
                              {status}
                            </p>
                          </div>
                        </div>
                        {status === "Finished" && !leftReview ? (
                          <Button
                            onClick={() =>
                              onClickWriteReview(
                                designer.baseAccount.id,
                                designer.baseAccount.firstName,
                                id,
                              )
                            }
                          >
                            Write A Review
                          </Button>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))
              )
            ) : (
              <Error
                title="Error"
                description="An error occurred while fetching appointments"
                image={upcomingImg}
              />
            )}
            <WriteAReview
              appointmentId={reviewdEntity.appointmentId}
              designerId={reviewdEntity.designerId}
              isOpen={isReviewOpen}
              designerName={reviewdEntity.designerName}
              onOpenChange={setIsReviewOpen}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
