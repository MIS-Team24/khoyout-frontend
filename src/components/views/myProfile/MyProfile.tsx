import {
  getUserFullProfile,
  updateProfilePicture,
} from "@/API/profile/profile";
import { PersonalForm, ProfileVideos } from ".";

import {
  edit,
  design2,
  design3,
  design4,
  member1,
  member2,
  member3,
} from "@/assets";
import { Button, Input, Label } from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AvailableTimeBody } from "@/API/types/appointments/appointments";
import AvailabilityTimes from "./AvailabilityTimes";
import AboutMap from "../designerProfile/aboutDesigner/AboutMap";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { bodyMeasurementsType } from "../clientProfile/BodyMeasurmentform";
import { cn } from "@/lib/utils";

export type fullUserType = {
  id: string;
  avatarUrl: string | null;
  BirthDate: Date | null;
  createdAt: Date;
  email: string;
  emailActivated: boolean;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | null;
  phone: null | string;
  user: {
    age: null | number;
    city: null | string;
    country: null | string;
    stylePreferences: null;
    bodyMeasurements: bodyMeasurementsType | null;
  } | null;
  designer: {
    about: string;
    address: string;
    availabilityTimes: AvailableTimeBody[];
    categories: [];
    latitude: string | null;
    longtitude: string | null;
    premiumSubscription: null | string;
    yearsExperience: number;
    location: string;
    teamMembers: [];
    services: [];
    ordersFinished: number;
  } | null;
};

function MyProfile() {
  const auth = useAuth();
  // const isUser = auth.auth.user?.user.type === "user";
  const getMe = () => getUserFullProfile(auth.access_token() ?? "");
  const queryClient = useQueryClient();
  const userFetch = useQuery({ queryKey: ["user-me"], queryFn: getMe });

  const uploadPFPMutation = useMutation({
    mutationKey: ["upload-pfp-mutation"],
    mutationFn: (file: File) =>
      updateProfilePicture(auth.access_token() ?? "", file),
    onSuccess: () => {
      toast.success("Successsfully changed your profile picture.");
      queryClient.invalidateQueries({
        queryKey: ["user-me"],
      });
      queryClient.invalidateQueries({
        queryKey: ["active-user"],
      });
    },
    onError: () => {
      toast.error("Failed to upload the image! Try again later.");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      uploadPFPMutation.mutate(file);
    }
  };

  if (userFetch.isPending) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center">
        <h1 className="text-5xl">Loading...</h1>
      </div>
    );
  }

  if (userFetch.isError) {
    return (
      <div>
        <h1 className="text-5xl">You must be logged in to use this page!</h1>
      </div>
    );
  }

  if (userFetch.isSuccess) {
    const theUser: fullUserType = userFetch.data.data as fullUserType;
    const doesDesignerHaveLocation =
      theUser.designer?.longtitude && theUser.designer?.latitude;

    return (
      <section>
        <div className="main-container">
          <div className="relative mb-[6rem] mt-24 flex h-[12.5rem] w-full items-end justify-between rounded-2xl bg-[#F3EBF1]">
            <div>
              <div className="absolute left-8 top-[6rem] h-[10rem] w-[10rem] rounded-full">
                {theUser.avatarUrl ? (
                  <img
                    src={theUser.avatarUrl + "?q=" + Math.random()}
                    className={cn(
                      "object-cove aspect-square h-full w-full rounded-full object-cover",
                      theUser.designer?.premiumSubscription
                        ? "border-8 border-primary"
                        : "",
                    )}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f3ebf1]">
                    <User />
                  </div>
                )}
              </div>
              <h1 className="relative left-[13rem] text-[2rem] font-normal">
                {theUser.firstName} {theUser.lastName}
              </h1>
            </div>
            <div className="inline-flex h-[2.375rem] items-center justify-center gap-[0.5rem] pr-6">
              <Input
                type="file"
                style={{ display: "none" }}
                id="photo-input"
                accept="image/png, image/jpeg, image/jpg, image/bmp, image/webp"
                onChange={handleFileChange}
              />
              <Label
                className="inline-flex h-[1.75rem] w-[10rem] text-xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                htmlFor="photo-input"
              >
                Edit photo
                <img src={edit} alt="Edit Icon" className="pl-2" />
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 pb-8 pt-[7.38rem]">
            <div className="">
              <PersonalForm fullUser={theUser} />
            </div>
            <div className="bg-green-700">
              {doesDesignerHaveLocation ? (
                <AboutMap
                  location={[
                    Number(theUser.designer?.longtitude),
                    Number(theUser.designer?.latitude),
                  ]}
                />
              ) : (
                <Button>Click here to select where you operate</Button>
              )}
            </div>
          </div>
          <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="flex items-center justify-between pb-2">
              <div className="h-[2.375rem] w-full">
                <p className="text-[2rem] font-normal leading-normal">
                  Daily Available Times
                </p>
              </div>
            </div>
            <div className="w-full pb-8">
              <p className="text-base font-normal leading-6 text-[#6C6C6C]">
                Choose a schedule below to edit your default hours that you can
                meet your clients in
              </p>
            </div>
            <AvailabilityTimes
              user={theUser}
              isLoadingData={userFetch.isLoading}
            />
          </div>
          <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="flex items-center justify-between pb-2">
              <div className="h-[2.375rem] w-[6.125rem]">
                <h2 className="text-[2rem] font-normal leading-normal">
                  Photos
                </h2>
              </div>
              <div>
                <Button
                  variant={"ghost"}
                  className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                >
                  Edit
                  <img src={edit} alt="Edit Icon" className="pl-2" />
                </Button>
              </div>
            </div>
            <div className="mb-8 h-6 w-full">
              <p className="text-base font-normal leading-6 text-[#6C6C6C]">
                Capture your craftsmanship in high-quality images to showcase
                your past designs, ensuring clarity in every detail for clients
                to trust and admire
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <img
                  className="h-[27.8125rem] w-[22rem]"
                  src={design3}
                  alt="Design-3"
                />
              </div>
              <div>
                <img
                  className="h-[27.8125rem] w-[22rem]"
                  src={design2}
                  alt="Design-2"
                />
              </div>
              <div>
                <img
                  className="h-[27.8125rem] w-[22rem]"
                  src={design4}
                  alt="Design-4"
                />
              </div>
            </div>
          </div>
          <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="flex items-center justify-between pb-2">
              <div className="h-[2.375rem] w-[6.3125rem]">
                <h2 className="text-[2rem] font-normal leading-normal">
                  Vidoes
                </h2>
              </div>
              <div>
                <Button
                  variant={"ghost"}
                  className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                >
                  Edit
                  <img src={edit} alt="Edit Icon" className="pl-2" />
                </Button>
              </div>
            </div>
            <div className="mb-8 h-6 w-full">
              <p className="text-base font-normal leading-6 text-[#6C6C6C]">
                Visualize Your Craft: upload video to share your process
              </p>
            </div>
            <ProfileVideos />
          </div>
          <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="flex items-center justify-between pb-2">
              <div className="h-[2.375rem] w-[7.5625rem]">
                <h2 className="text-[2rem] font-normal leading-normal">
                  Services
                </h2>
              </div>
              <div>
                <Button
                  variant={"ghost"}
                  className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                >
                  Edit
                  <img src={edit} alt="Edit Icon" className="pl-2" />
                </Button>
              </div>
            </div>
            <div className="mb-8 h-6 w-full">
              <p className="text-base font-normal leading-6 text-[#6C6C6C]">
                Visualize Your Craft: upload video to share your process
              </p>
            </div>
          </div>
          <div className="mb-8 rounded-2xl bg-[#F3EBF1] p-6">
            <div className="flex items-center justify-between pb-2">
              <div className="h-[2.375rem] w-[14rem]">
                <h2 className="text-[2rem] font-normal leading-normal">
                  Team Members
                </h2>
              </div>
              <div>
                <Button
                  variant={"ghost"}
                  className="inline-flex h-[1.75rem] w-[6.8rem] text-2xl font-medium text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                >
                  Edit
                  <img src={edit} alt="Edit Icon" className="pl-2" />
                </Button>
              </div>
            </div>
            <div className="mb-8 h-6 w-full">
              <p className="text-base font-normal leading-6 text-[#6C6C6C]">
                Visualize Your Craft: upload video to share your process
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div>
                  <img
                    className="h-[27.8125rem] w-[22rem] rounded-[0.5rem] object-cover"
                    src={member1}
                    alt="Team Member-1"
                  />
                </div>
                <div className="h-[2.375] w-full pb-4 pt-4">
                  <h3 className="text-center text-[2rem] font-medium leading-normal">
                    Nada
                  </h3>
                </div>
                <div className="h-6 w-full">
                  <p className="text-basw text-center font-normal leading-6 text-[#6C6C6C]">
                    Hand made specialist
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <img
                    className="h-[27.8125rem] w-[22rem] rounded-[0.5rem] object-cover"
                    src={member2}
                    alt="Team Member-2"
                  />
                </div>
                <div className="h-[2.375] w-full pb-4 pt-4">
                  <h3 className="text-center text-[2rem] font-medium leading-normal">
                    Mona
                  </h3>
                </div>
                <div className="h-6 w-full">
                  <p className="text-basw text-center font-normal leading-6 text-[#6C6C6C]">
                    Redesign specialist
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <img
                    className="h-[27.8125rem] w-[22rem] rounded-[0.5rem] object-cover"
                    src={member3}
                    alt="Team Member-3"
                  />
                </div>
                <div className="h-[2.375] w-full pb-4 pt-4">
                  <h3 className="text-center text-[2rem] font-medium leading-normal">
                    Mariam
                  </h3>
                </div>
                <div className="h-6 w-full">
                  <p className="text-basw text-center font-normal leading-6 text-[#6C6C6C]">
                    Sewing specialist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MyProfile;
