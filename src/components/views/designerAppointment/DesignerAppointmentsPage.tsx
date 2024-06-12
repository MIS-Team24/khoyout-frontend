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
} from "@/components/ui";
import { Calendar, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  confirmRequest,
  getRequests,
  rejectRequest,
  markAppointmentAs,
  markType,
} from "@/API/request/request";
import {
  API_AppointmentsResponse,
  API_AppointmentBody,
} from "@/API/types/appointments/appointments";
import useAuth from "@/hooks/useAuth";
import { Error, LoadingState } from "@/components/custom";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { getAppointments } from "@/API/appointments/appointments";
import { requestImg, upcomingImg } from "@/assets";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

export default function DesignerAppointmentsPage() {
  const queryClient = useQueryClient();
  const { access_token } = useAuth();
  const [value, setValue] = useState({
    page: "Request",
  });

  const getRequestsFn = () => getRequests(access_token() ?? "");

  const getRequestsQuery = useQuery({
    queryKey: ["requests"],
    queryFn: getRequestsFn,
  });

  const getAppointmentsFn = () => getAppointments(access_token() ?? "");

  const getAppointmentsQuery = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointmentsFn,
  });

  const confirmRequestFn = (mutationData: { requestId: number }) =>
    confirmRequest(access_token() ?? "", mutationData.requestId);

  const confirmRequestMutation = useMutation({
    mutationFn: confirmRequestFn,
    onSuccess: () => {
      toast.success("You Approved the request");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: () => {
      toast.error("An error occurred while approving the request");
    },
  });

  const rejectRequestFn = (mutationData: { requestId: number }) =>
    rejectRequest(access_token() ?? "", mutationData.requestId);

  const rejectRequestMutation = useMutation({
    mutationFn: rejectRequestFn,
    onSuccess: () => {
      toast.success("You rejected the request");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: () => {
      toast.error("An error occurred while rejecting the request");
    },
  });

  const markAppointmentAsFn = (mutationData: {
    appointmentId: number;
    markAs: markType;
  }) =>
    markAppointmentAs(
      access_token() ?? "",
      mutationData.appointmentId,
      mutationData.markAs,
    );

  const markAppointmentAsMutation = useMutation({
    mutationFn: markAppointmentAsFn,
    onSuccess: () => {
      toast.success("You marked the appointment");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
    onError: () => {
      toast.error("An error occurred while marking the appointment");
    },
  });

  return (
    <section className="main-container">
      <Breadcrumb className="my-6 lg:my-12">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/home" className="text-foreground">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground">
              {value.page}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto sm:w-[400px] xl:w-1/2 2xl:w-[40%]">
        <Tabs defaultValue="request">
          <TabsList className="mb-8 flex w-full justify-between bg-transparent">
            <TabsTrigger
              value="request"
              onClick={() =>
                setValue({
                  page: "Request",
                })
              }
              className="relative rounded-none text-lg text-[#49454F] text-foreground data-[state='active']:border-b-[3px] data-[state='active']:border-primary data-[state='active']:!bg-transparent data-[state='active']:text-foreground data-[state='active']:!shadow-none data-[state='active']:ring-0 lg:text-[2rem]"
            >
              Request
              <span className="absolute -right-5 top-0 flex h-[1.7rem] w-[1.7rem] items-center justify-center rounded-full bg-primary text-base font-medium text-white">
                {getRequestsQuery.isPending ? (
                  <LoadingState className="mx-auto h-4 w-4" />
                ) : getRequestsQuery.isSuccess ? (
                  (
                    (getRequestsQuery.data?.data as API_AppointmentsResponse)
                      .data as API_AppointmentBody[]
                  ).filter((x) => x.status === "Waiting").length
                ) : (
                  0
                )}
              </span>
            </TabsTrigger>
            <hr className="h-6 w-0.5 rounded bg-border" />
            <TabsTrigger
              value="upcoming"
              onClick={() =>
                setValue({
                  page: "Upcoming appointments",
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
                  page: "History",
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
            value="request"
            className="mb-8 flex-col gap-8 data-[state='active']:flex"
          >
            {getRequestsQuery.isError ? (
              <Error
                title="Error"
                description="An error occurred while fetching requests"
                image={requestImg}
              />
            ) : getRequestsQuery.isPending ? (
              <p>Loading...</p>
            ) : getRequestsQuery.isSuccess ? (
              (
                (getRequestsQuery.data?.data as API_AppointmentsResponse)
                  .data as API_AppointmentBody[]
              ).filter((x) => x.status === "Waiting").length === 0 ? (
                <div className="my-10 ">
                  <Error
                    title="No available requests"
                    description="You have no available requests to approve or reject at the moment."
                    image={requestImg}
                  />
                </div>
              ) : (
                (
                  (getRequestsQuery.data?.data as API_AppointmentsResponse)
                    .data as API_AppointmentBody[]
                )
                  .filter((x) => x.status === "Waiting")
                  .map(({ startTime, id, description, user }) => (
                    <Card
                      key={`
                upcoming-appointment-id-${id}
              `}
                      className="bg-transparent"
                    >
                      <CardHeader>
                        <CardDescription className="text-base text-foreground lg:text-xl">
                          you have a request from{" "}
                          <span className="font-semibold text-primary lg:text-xl">
                            {user.baseAccount.firstName}{" "}
                            {user.baseAccount.lastName}
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
                        <p>
                          Note: <br />{" "}
                          <span>
                            {description
                              ? description
                              : "No description provided"}
                          </span>
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-4">
                        <Button
                          variant="outline"
                          className="bg-transparent text-xl font-medium text-primary hover:text-primary"
                          disabled={confirmRequestMutation.isPending}
                          onClick={() => {
                            confirmRequestMutation.mutate({
                              requestId: id,
                            });
                          }}
                        >
                          Approve request
                        </Button>
                        <Button
                          variant="default"
                          className="text-xl font-medium"
                          onClick={() =>
                            rejectRequestMutation.mutate({
                              requestId: id,
                            })
                          }
                          disabled={rejectRequestMutation.isPending}
                        >
                          Cancel
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              )
            ) : (
              <Error
                title="Error"
                description="An error occurred while fetching requests"
                image={requestImg}
              />
            )}
          </TabsContent>
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
              ).filter((x) => x.status !== markType.Finished).length === 0 ? (
                <div className="my-10">
                  <Error
                    title="No upcoming appointments available"
                    description="You have no upcoming appointments at the moment."
                    image={upcomingImg}
                  />
                </div>
              ) : (
                (
                  (getAppointmentsQuery.data?.data as API_AppointmentsResponse)
                    .data as API_AppointmentBody[]
                )
                  .filter((x) => x.status !== markType.Finished)
                  .map(({ user, startTime, id, status }) => (
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
                            {user.baseAccount.firstName}{" "}
                            {user.baseAccount.lastName}
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
                      <CardFooter className="flex justify-end gap-4">
                        {status === markType.OnGoing || (
                          <Button
                            className="text-sm font-medium"
                            onClick={() =>
                              markAppointmentAsMutation.mutate({
                                appointmentId: id,
                                markAs: markType.OnGoing,
                              })
                            }
                            disabled={markAppointmentAsMutation.isPending}
                          >
                            Mark as On going
                          </Button>
                        )}
                        {status === "Booked" || (
                          <Button
                            className="text-sm font-medium"
                            onClick={() =>
                              markAppointmentAsMutation.mutate({
                                appointmentId: id,
                                markAs: markType.Finished,
                              })
                            }
                            disabled={markAppointmentAsMutation.isPending}
                          >
                            Mark as Finished
                          </Button>
                        )}
                        {status === markType.OnGoing || (
                          <Button
                            className="bg-red-600 text-sm font-medium hover:bg-red-700"
                            onClick={() =>
                              markAppointmentAsMutation.mutate({
                                appointmentId: id,
                                markAs: markType.Missed,
                              })
                            }
                            disabled={markAppointmentAsMutation.isPending}
                          >
                            Mark as Missed
                          </Button>
                        )}
                      </CardFooter>
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
                  .map(({ designer, startTime, id, status }) => (
                    <Card
                      key={`
                upcoming-appointment-id-${id}
              `}
                      className="bg-transparent"
                    >
                      <CardHeader>
                        <CardDescription className="text-base text-foreground lg:text-xl">
                          Your past appointment with{" "}
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
        </Tabs>
      </div>
    </section>
  );
}
