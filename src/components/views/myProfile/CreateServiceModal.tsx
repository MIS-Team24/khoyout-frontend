import { createNewService } from "@/API/designers/designers";
import Loading from "@/components/custom/Loading";
import { Textarea } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

type createServiceProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export function CreateServiceModal(props: createServiceProps) {
  const [serviceTitle, setServiceTitle] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [serviceDescription, setServiceDescription] = useState<string>("");
  const { access_token } = useAuth();
  const queryControl = useQueryClient();

  const createNewFn = () =>
    createNewService(
      access_token() ?? "",
      serviceTitle,
      serviceDescription,
      servicePrice,
    );

  const createNewMutation = useMutation({
    mutationFn: createNewFn,
    mutationKey: ["mutation-fn"],
    onSuccess: () => {
      props.setIsOpen(false);
      toast.success(
        "Successfully added a new service in your arsenal of services!",
      );
      queryControl.invalidateQueries({ queryKey: ["user-me"] });
    },
    onError: () => {
      toast.error(
        "Failed to create service please make sure your connection is ok.",
      );
    },
  });

  function onClickCreateService() {
    createNewMutation.mutate();
  }

  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>
            Fill in the information for the new service. Click Create when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
            />
          </div>
          <div className=" flex items-center justify-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={servicePrice}
              defaultValue="@peduarte"
              className="col-span-3"
              type="number"
              onChange={(e) => setServicePrice(e.target.valueAsNumber)}
            />
            <Label>EGP</Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              value={serviceDescription}
              className="resize-none"
              onChange={(e) => setServiceDescription(e.target.value)}
            ></Textarea>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onClickCreateService}
            disabled={createNewMutation.isPending}
          >
            {createNewMutation.isPending ? (
              <>
                <Loading /> Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
