import { UserDeleteAccountReason } from "@/API/types/user/user";
import { deleteUserAccount } from "@/API/user/user";
import {
  SegementationSteps,
  Segment,
  SegmentStep,
  Segmentator,
} from "@/components/custom";
import Loading from "@/components/custom/Loading";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Label,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { Clamp } from "@/utilities/clamp";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteAccount() {
  const [currentSegment, setCurrentSegment] = useState<number>(0);
  const [otherReason, setOtherReason] = useState<string>("");
  const [DeleteReason, setUserDeleteReason] =
    useState<UserDeleteAccountReason>();

  const [cb1, setcb1] = useState<boolean>(false);
  const [cb2, setcb2] = useState<boolean>(false);
  const { access_token } = useAuth();
  const deleteUserFn = () =>
    deleteUserAccount(
      access_token() ?? "",
      DeleteReason ?? UserDeleteAccountReason.AccountCreatedByMistake,
      otherReason,
    );

  const deleteMutation = useMutation({
    mutationKey: ["delete-mutation"],
    mutationFn: deleteUserFn,
    onSuccess: () => {
      setCurrentSegment(2);
    },
    onError: () => {
      toast.error(
        "Failed to delete Account, Please check your internet connection",
        {
          position: "top-center",
        },
      );
    },
  });

  function onOtherReasonChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setOtherReason(event.target.value);
  }

  function rewindSegment() {
    setCurrentSegment((prevValue: number) => Clamp(prevValue - 1, 0, 2));
  }

  function validateAndForwardSegment() {
    setCurrentSegment((prevValue: number) => Clamp(prevValue + 1, 0, 2));
  }

  function onReasonChange(value: string) {
    const r = value as UserDeleteAccountReason;
    setUserDeleteReason(r);
  }

  function onClickConfirmDelete() {
    deleteMutation.mutate();
  }

  return (
    <div className="justify-cente flex flex-col items-center">
      <div className="my-12 w-36">
        <SegementationSteps currentStep={currentSegment}>
          {Array.from({ length: 3 })
            .fill(0)
            .map((_, i) => (
              <SegmentStep key={i} />
            ))}
        </SegementationSteps>
      </div>
      <div className="h-full w-full">
        <Segmentator currentSegment={currentSegment}>
          <Segment>
            <div className="mb-8 flex w-full flex-col items-center text-center">
              <h1 className="text-3xl text-[##1F1F29]">
                We will be sorry to see you go
              </h1>
              <h2 className="text-lg text-[#49454F]">
                Please let us know the reason for deleting your account
              </h2>
            </div>
            <Card className="mx-4 max-w-[710px] sm:mx-auto">
              <CardContent className="px-2 py-4">
                <RadioGroup
                  className="flex flex-col gap-5"
                  onValueChange={onReasonChange}
                  value={DeleteReason}
                >
                  <div className="flex items-center gap-[10px] space-x-2 border-b px-2 pb-3">
                    <RadioGroupItem
                      value="ACCOUNT_CREATED_BY_MISTAKE"
                      id="r1"
                    />
                    <Label
                      htmlFor="r1"
                      className="w-full text-xl text-[#1F1F29]"
                    >
                      I created this account by mistake
                    </Label>
                  </div>
                  <div className="flex items-center gap-[10px] space-x-2 border-b px-2 pb-3">
                    <RadioGroupItem value="NO_LONGER_USEFUL" id="r2" />
                    <Label
                      htmlFor="r2"
                      className="w-full text-xl text-[#1F1F29]"
                    >
                      I don't want to use Khoyout anymore
                    </Label>
                  </div>
                  <div className="flex items-center gap-[10px] space-x-2 border-b px-2 pb-3">
                    <RadioGroupItem
                      value="CANT_FIND_SERVICES_OR_DESIGNERS"
                      id="r3"
                    />
                    <Label
                      htmlFor="r3"
                      className="w-full text-xl text-[#1F1F29]"
                    >
                      I can't find the designers or services i want
                    </Label>
                  </div>
                  <div className="flex items-center gap-[10px] space-x-2 px-2">
                    <RadioGroupItem value="OTHER" id="r4" />
                    <Label
                      htmlFor="r4"
                      className="w-full text-xl text-[#1F1F29]"
                    >
                      Other
                    </Label>
                  </div>
                </RadioGroup>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{
                    height:
                      DeleteReason === UserDeleteAccountReason.Other
                        ? "auto"
                        : 0,
                    borderTopWidth:
                      DeleteReason === UserDeleteAccountReason.Other
                        ? "1px"
                        : "0px",
                  }}
                  className="mt-3 flex flex-col gap-[10px] space-x-2 overflow-hidden"
                >
                  <div className="px-4 pb-2 pt-2">
                    <p>Please can you tell us what it is?</p>
                    <Textarea
                      placeholder="Type your reason"
                      value={otherReason}
                      onChange={onOtherReasonChange}
                    ></Textarea>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            <div className="flex w-full flex-wrap justify-center gap-8 pt-[7rem]">
              <Button
                variant="ghost"
                type="button"
                onClick={rewindSegment}
                className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={validateAndForwardSegment}
                className="w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal text-white disabled:bg-[#B1B1B1] disabled:text-[#F9F4F4]"
                disabled={DeleteReason === undefined}
              >
                Continue
              </Button>
            </div>
          </Segment>
          <Segment>
            <div className="mb-8 flex w-full flex-col items-center text-center">
              <h1 className="text-3xl text-[##1F1F29]">Delete your account</h1>
              <h2 className="text-lg text-[#49454F]">
                This action will delete your account and you won't be able to
                retrieve it
              </h2>
            </div>
            <Card className="mx-4 max-w-[710px] sm:mx-auto">
              <CardContent className="px-2 py-4">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-[10px] space-x-2 border-b px-2 pb-3">
                    <Checkbox
                      checked={cb1}
                      id="c1"
                      onCheckedChange={(e: boolean) => setcb1(e)}
                    />
                    <Label
                      htmlFor="c1"
                      className="w-full text-xl text-[#1F1F29]"
                    >
                      You won’t be able to access your appointments
                    </Label>
                  </div>
                  <div className="flex items-center gap-[10px] space-x-2 px-2 pb-3">
                    <Checkbox
                      checked={cb2}
                      id="c2"
                      onCheckedChange={(e: boolean) => setcb2(e)}
                    />
                    <Label
                      htmlFor="c2"
                      className="w-full text-xl text-[#1F1F29]"
                    >
                      You will no longer be able to book appointments via
                      Khoyout
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex w-full flex-wrap justify-center gap-8 pt-[8rem]">
              <Button
                variant="ghost"
                type="button"
                onClick={rewindSegment}
                className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                disabled={deleteMutation.isPending}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={onClickConfirmDelete}
                className="w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal text-white disabled:bg-[#B1B1B1] disabled:text-[#F9F4F4]"
                disabled={!(cb1 && cb2) || deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loading /> Confirm Deleting
                  </>
                ) : (
                  "Confirm Deleting"
                )}
              </Button>
            </div>
          </Segment>
          <Segment>
            <div className="mt-8 flex w-full flex-col items-center gap-12">
              <svg
                width="114"
                height="114"
                viewBox="0 0 114 114"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M81.9703 40.7797C82.3771 41.186 82.6998 41.6685 82.92 42.1996C83.1401 42.7308 83.2535 43.3001 83.2535 43.875C83.2535 44.4499 83.1401 45.0192 82.92 45.5504C82.6998 46.0815 82.3771 46.564 81.9703 46.9703L51.3453 77.5953C50.939 78.0021 50.4565 78.3248 49.9254 78.545C49.3943 78.7651 48.825 78.8784 48.25 78.8784C47.6751 78.8784 47.1058 78.7651 46.5747 78.545C46.0435 78.3248 45.561 78.0021 45.1547 77.5953L32.0297 64.4703C31.2088 63.6494 30.7476 62.536 30.7476 61.375C30.7476 60.214 31.2088 59.1006 32.0297 58.2797C32.8506 57.4588 33.9641 56.9976 35.125 56.9976C36.286 56.9976 37.3994 57.4588 38.2203 58.2797L48.25 68.3148L75.7797 40.7797C76.186 40.3729 76.6685 40.0502 77.1997 39.8301C77.7308 39.6099 78.3001 39.4966 78.875 39.4966C79.45 39.4966 80.0193 39.6099 80.5504 39.8301C81.0815 40.0502 81.564 40.3729 81.9703 40.7797ZM113.875 57C113.875 68.2488 110.539 79.245 104.29 88.5981C98.0404 97.9511 89.1577 105.241 78.7651 109.546C68.3726 113.85 56.9369 114.977 45.9043 112.782C34.8716 110.588 24.7374 105.171 16.7833 97.2167C8.82922 89.2626 3.4124 79.1284 1.21786 68.0958C-0.976672 57.0631 0.149643 45.6274 4.45438 35.2349C8.75911 24.8423 16.0489 15.9597 25.402 9.71017C34.755 3.46066 45.7512 0.125 57 0.125C72.0793 0.140924 86.5365 6.13821 97.1991 16.8009C107.862 27.4636 113.859 41.9207 113.875 57ZM105.125 57C105.125 47.4818 102.303 38.1773 97.0145 30.2632C91.7265 22.3491 84.2104 16.1808 75.4167 12.5383C66.623 8.89583 56.9466 7.94279 47.6113 9.79971C38.276 11.6566 29.7009 16.2401 22.9705 22.9705C16.2401 29.7009 11.6566 38.2759 9.79973 47.6113C7.94282 56.9466 8.89585 66.6229 12.5383 75.4166C16.1808 84.2103 22.3491 91.7264 30.2632 97.0145C38.1773 102.303 47.4818 105.125 57 105.125C69.7591 105.111 81.9915 100.036 91.0136 91.0135C100.036 81.9915 105.111 69.7591 105.125 57Z"
                  fill="#1EB717"
                />
              </svg>
              <div className="flex flex-col items-center justify-center gap-12 text-center">
                <h1 className="text-3xl text-[##1F1F29]">Done!</h1>
                <h2 className="max-w-[450px] text-center text-lg text-[#49454F]">
                  We’ll miss having you as part of our community. Remember,
                  you’re always welcome back!
                </h2>
              </div>
            </div>
            <div className="flex w-full flex-wrap justify-center gap-8 pt-[8rem]">
              <Link to="/home">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={rewindSegment}
                  className="bg-transparent py-[1.5rem] text-[1.5rem] font-medium leading-normal text-primary hover:bg-transparent hover:text-primary"
                >
                  Back to Khoyout
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  type="button"
                  onClick={validateAndForwardSegment}
                  className="w-[20rem] rounded-[1rem] py-[1.5rem] text-[1.5rem] font-medium leading-normal text-white"
                  disabled={!(cb1 && cb2)}
                >
                  Create Another Account
                </Button>
              </Link>
            </div>
          </Segment>
        </Segmentator>
      </div>
    </div>
  );
}
