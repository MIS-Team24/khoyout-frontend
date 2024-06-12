import { useState } from "react";

import { Button, Checkbox, Input } from "@/components/ui";
import { initiateCheckout } from "@/API/subscriptions/subscriptions";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Loading from "@/components/custom/Loading";

function Standard() {
  const [fieldAppear, setFieldAppear] = useState(false);
  const auth = useAuth();
  const [forceLoading, setForceLoading] = useState<boolean>(false);
  const [check, setCheck] = useState(false);

  function appear() {
    setFieldAppear(!fieldAppear);
  }

  const requestFn = () =>
    initiateCheckout(auth.access_token() ?? "", "Standard");

  const checkoutMutation = useMutation({
    mutationKey: ["checkout-premium"],
    mutationFn: requestFn,
    onSuccess: (data) => {
      setForceLoading(true);
      const responseData = data.data as { paymentURL: string };
      window.location.href = responseData.paymentURL;
    },
    onError: () => {
      toast.error(
        "Error submitting the form, please make sure the information is written properly.",
      );
    },
  });

  function onClickCheckout() {
    checkoutMutation.mutate();
  }

  return (
    <section className="mt-24">
      <div>
        <div className="main-container grid gap-[6.3rem] lg:grid-cols-2">
          <div className=" lg:mb-[4.25rem]">
            <div>
              <div className="mb-6 h-8 w-[20.625rem]">
                <h2 className="pb-6 text-2xl font-normal leading-8">
                  Subscribe to Khoyout Standard
                </h2>
              </div>
              <p className="text-[2rem] font-medium leading-normal">
                200 EGP{" "}
                <span className="text-2xl font-normal leading-8">/ month</span>
              </p>
            </div>
            <div className="mb-8 mt-7 rounded-[0.5rem] border">
              <div className="p-6">
                <div className="pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-normal leading-8">
                      Khoyout standard
                    </h3>
                    <p className="text-2xl font-normal leading-8">200 EGP</p>
                  </div>
                  <p className="w-[19.9375rem] text-base font-normal leading-6 text-[#6C6C6C]">
                    To elevate your business and reach more clients
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      checked={check}
                      onCheckedChange={() => setCheck(!check)}
                      className="h-4 w-4 rounded-none"
                    />
                    <p className="text-sm font-normal text-[#49454F]">
                      <Button
                        size={"sm"}
                        variant={"ghost"}
                        className="text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                      >
                        Save 400 EGP
                      </Button>
                      with annual billing
                    </p>
                  </div>
                  <p className="text-base leading-6 text-[#49454F]">2000 EGP</p>
                </div>
              </div>
            </div>
            <div>
              <div className="">
                <div className="flex items-center justify-between pb-6">
                  <h3 className="text-xl font-normal leading-8">Subtotal</h3>
                  <p className="text-xl font-normal leading-8">200 EGP</p>
                </div>
                <div className="">
                  <Button
                    onClick={appear}
                    size={"icon"}
                    variant={"ghost"}
                    className="flex items-center justify-start pb-6 text-xl font-normal leading-8 text-[#8C236C] hover:bg-transparent hover:text-[#8C236C]"
                  >
                    Add promotion code
                  </Button>
                  {fieldAppear && (
                    <Input
                      placeholder="Add promotional code"
                      className="h-[3.5rem] w-[23rem] items-center gap-2 rounded border border-[#B1B1B1] bg-transparent p-4 text-base font-normal leading-6 text-foreground ring-0 ring-transparent placeholder:text-secondary focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    />
                  )}
                </div>
                <div className="border-b pt-6"></div>
                <div className="flex items-center justify-between pt-6">
                  <h3 className="text-xl font-normal leading-8">
                    Total due today
                  </h3>
                  <p className="text-xl font-normal leading-8">200 EGP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant={"default"}
          className="mx-auto mb-[6.62rem] flex h-[3.75rem] w-[20rem] items-center justify-center text-2xl font-medium leading-normal lg:w-[35.25rem]"
          type="submit"
          onClick={onClickCheckout}
          disabled={checkoutMutation.isPending || forceLoading}
        >
          {checkoutMutation.isPending || forceLoading ? (
            <>
              <Loading /> Loading ...
            </>
          ) : (
            "Confirm Subscribtion"
          )}
        </Button>
      </div>
    </section>
  );
}

export default Standard;
