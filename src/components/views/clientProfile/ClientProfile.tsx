import PersonalInfoForm from "./PersonalInfoForm";
import { edit, body } from "@/assets";
import { Button, Input, Label } from "@/components/ui";
import BodyMeasurmentform from "./BodyMeasurmentform";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserFullProfile,
  updateProfilePicture,
} from "@/API/profile/profile";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { fullUserType } from "../myProfile/MyProfile";
import { User } from "lucide-react";
import { logout } from "@/API/auth/login/login";
import { useNavigate } from "@tanstack/react-router";

function ClientProfile() {
  const auth = useAuth();
  // const isUser = auth.auth.user?.user.type === "user";
  const getMe = () => getUserFullProfile(auth.access_token() ?? "");
  const queryClient = useQueryClient();
  const userFetch = useQuery({ queryKey: ["user-me-client"], queryFn: getMe });
  const navigate = useNavigate();

  const uploadPFPMutation = useMutation({
    mutationKey: ["upload-pfp-mutation"],
    mutationFn: (file: File) =>
      updateProfilePicture(auth.access_token() ?? "", file),
    onSuccess: () => {
      toast.success("Successsfully changed your profile picture.");
      queryClient.invalidateQueries({
        queryKey: ["user-me-client"],
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

  const logoutFunction = () => logout(auth.access_token() ?? "");

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutFunction,
    onSuccess: () => {
      navigate({ to: "/home", from: "/home" });
      queryClient.invalidateQueries({ queryKey: ["active-user"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Successfully Logged Out");
    },
    onError: () => {
      toast.error("Failed to logged out");
      queryClient.invalidateQueries({ queryKey: ["active-user"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  function onClickLogout() {
    logoutMutation.mutate();
  }

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

    return (
      <section>
        <div className="main-container mb-16 mt-10">
          <div className="relative mb-[6rem] flex h-[12.5rem] w-full items-end justify-between rounded-2xl bg-[#F3EBF1]">
            <div>
              <div className="absolute left-8 top-[6rem] h-[10rem] w-[10rem] rounded-full">
                {theUser.avatarUrl ? (
                  <img
                    src={theUser.avatarUrl + "?q=" + Math.random()}
                    className="object-cove aspect-square h-full w-full rounded-full object-cover"
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
          <div className="flex w-full flex-col-reverse items-start justify-between gap-5 md:flex-row">
            <div className="flex w-full flex-col items-center gap-y-[1.06rem] lg:w-1/2 lg:items-start">
              <PersonalInfoForm user={theUser} />
              <BodyMeasurmentform user={theUser} />
              <div className="flex w-full items-center justify-end">
                <Button
                  variant={"outline"}
                  className="w-full text-xl font-medium text-primary hover:text-primary max-md:h-12 md:w-[15.375rem]"
                  onClick={onClickLogout}
                >
                  Log out
                </Button>
              </div>
            </div>
            <div className="mx-auto h-full w-full rounded-xl bg-[#F3EBF1] lg:w-1/2">
              <img
                src={body}
                alt="Body Measurments Image"
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ClientProfile;
