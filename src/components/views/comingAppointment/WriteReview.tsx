import { writeReviewForAppointment } from "@/API/appointments/appointments";
import Loading from "@/components/custom/Loading";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Textarea,
} from "@/components/ui";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";

type writereviewProps = {
  appointmentId: number;
  designerId: string;
  designerName: string;
  isOpen: boolean;
  onOpenChange: (v: boolean) => void;
};

export default function WriteAReview(props: writereviewProps) {
  const { access_token } = useAuth();
  const [comment, setComment] = useState("");
  const [rate, setRating] = useState(0);
  const query = useQueryClient();

  const postreviewFn = () =>
    writeReviewForAppointment(
      access_token() ?? "",
      props.designerId,
      props.appointmentId,
      comment,
      rate,
    );

  const mutationForReview = useMutation({
    mutationKey: ["mutate-review"],
    mutationFn: postreviewFn,
    onError: () => {
      toast.error(
        "Reviewing failed please make sure you did not already leave a review.",
      );
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Successfully left a review on " + props.designerName);
      props.onOpenChange(false);
    },
  });

  function onClose(v: boolean) {
    props.onOpenChange(v);
  }

  function OnClickReview() {
    mutationForReview.mutate();
  }

  useEffect(() => {
    if (!props.isOpen) {
      setComment("");
      setRating(0);
    }
  }, [props.isOpen]);

  return (
    <Dialog open={props.isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Write a review on your experience with {props.designerName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="gap flex flex-col items-center gap-2">
            <Rating
              initialValue={rate}
              className="relative w-fit"
              SVGclassName={`inline-block`}
              iconsCount={5}
              allowFraction={true}
              size={50}
              onClick={(v: number) => setRating(v)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="text-lg">
              Comment
            </Label>
            <Textarea
              id="username"
              defaultValue=""
              placeholder="This designer did a great job!"
              className="col-span-3 resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Textarea>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={OnClickReview}
            disabled={mutationForReview.isPending}
          >
            {mutationForReview.isPending ? (
              <>
                <Loading /> Reviewing
              </>
            ) : (
              "Review"
            )}
          </Button>
          <Button
            type="button"
            onClick={() => props.onOpenChange(false)}
            disabled={mutationForReview.isPending}
            variant={"outline"}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
