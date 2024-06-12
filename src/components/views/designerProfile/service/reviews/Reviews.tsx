import { Review } from "@/API/types/designer/designer";
import { SectionHeader } from "@/components/custom";
import { Rating } from "react-simple-star-rating";

type ReviewsProps = {
  reviews: Review[];
  ratingDetails: {
    rating: number;
    ordersFinished: number;
  };
};

export default function Reviews({ reviews, ratingDetails }: ReviewsProps) {
  return (
    <section className="lg:mb-[4.25rem]">
      <div>
        <div className="mb-8">
          <div className="flex gap-2">
            <SectionHeader title="Reviews" className="my-0 mb-8" />
            <p className="text-2xl text-primary">({reviews.length})</p>{" "}
          </div>
          <div className="flex items-center gap-4">
            <Rating
              initialValue={ratingDetails.rating}
              className="relative bottom-[2px] my-3 w-full"
              iconsCount={5}
              readonly={true}
              SVGclassName={`inline-block`}
              allowFraction={true}
              size={32}
            />
            <p className="text-2xl text-foreground">
              {ratingDetails.rating.toString().length > 3
                ? ratingDetails.rating.toFixed(1)
                : ratingDetails.rating}
            </p>
          </div>
          <div className="flex gap-4"></div>
        </div>
        <div>
          {reviews.map(({ avatarUrl, comment, postedOn, rating, name }, i) => (
            <div
              key={`client-${i}`}
              className="mb-8 flex flex-col gap-2 lg:w-11/12"
            >
              <div className="flex gap-2">
                <div>
                  <img
                    src={avatarUrl}
                    alt={`${name ?? "User"}`}
                    className="h-12 w-12 rounded-full object-cover object-center"
                  />
                </div>
                <div>
                  <p>{name ?? "N/A"}</p>
                  <p className="text-sm text-secondary">
                    {new Date(postedOn).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <Rating
                    initialValue={rating}
                    className="relative bottom-[2px] w-full"
                    iconsCount={5}
                    readonly={true}
                    SVGclassName={`inline-block`}
                    allowFraction={true}
                    size={16}
                  />
                </div>
              </div>
              <div>
                <p className="text-xl text-secondary">{comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
