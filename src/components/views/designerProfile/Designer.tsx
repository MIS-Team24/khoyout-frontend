import { Inspiration } from "@/components/views/home";
import ProfileDetails from "./profileDetails/ProfileDetails";
import { Error, SectionHeader } from "@/components/custom";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import AboutDesigner from "./aboutDesigner/AboutDesigner";
import DesignerVideos from "./designerVideos/DesignerVideos";
import Service from "./service/Service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import {
  API_Designer,
  API_DesignerPortfolios,
} from "@/API/types/designer/designer";
import { getDesigner, getDesignerPortfolio } from "@/API/designer/designer";
import {
  AboutSkeleton,
  DesigenrProfileSkeleton,
  DesignerVideosSkeleton,
  InspirationSkeleton,
  ServiceSkeleton,
} from "./skeletons";

export default function Designer() {
  const id = useParams({ from: "/desginer/$designerId/" }).designerId;

  const getDesignerFn = () => getDesigner(String(id));
  const getDesignerPortfolioFn = () => getDesignerPortfolio(String(id));

  const DesignerQuery = useQuery({
    queryKey: ["designer", id],
    queryFn: getDesignerFn,
  });

  const DesignerPortfolioQuery = useQuery({
    queryKey: ["designer-portfolio", id],
    queryFn: getDesignerPortfolioFn,
  });

  let RenderInspiration = <></>;

  if (DesignerPortfolioQuery.isError)
    RenderInspiration = (
      <div className="my-10">
        <Error
          title="Designer Portfolio images are not avaialble!"
          description="Designer Portfolio images are not available at the moment. Please try again later."
        />
      </div>
    );

  if (DesignerPortfolioQuery.isPending)
    RenderInspiration = <InspirationSkeleton arrayLength={3} />;

  if (DesignerPortfolioQuery.isSuccess) {
    const transformedData = DesignerPortfolioQuery.data
      ?.data as API_DesignerPortfolios;

    RenderInspiration = (
      <Inspiration header={<Header />} portfolios={transformedData} />
    );
  }

  return (
    <>
      {DesignerQuery.isError ? (
        <div className="my-8">
          <Error
            title="Profile data is not avaialble!"
            description="Profile data is not available at the moment. Please try again later."
          />
        </div>
      ) : DesignerQuery.isPending ? (
        <DesigenrProfileSkeleton />
      ) : DesignerQuery.isSuccess ? (
        <ProfileDetails
          wishlisted={false}
          designerDetails={{
            avatarUrl: (DesignerQuery.data?.data as API_Designer).baseAccount
              .avatarUrl,
            name: (DesignerQuery.data?.data as API_Designer).baseAccount.name,
            ordersFinished: (DesignerQuery.data?.data as API_Designer)
              .ordersFinished,
            openNow: (DesignerQuery.data?.data as API_Designer).openNow,
            openUntil: (DesignerQuery.data?.data as API_Designer).openUntil,
            rating: (DesignerQuery.data?.data as API_Designer).rating,
          }}
        />
      ) : (
        <div className="my-8">
          <Error
            title="Profile data is not avaialble!"
            description="Profile data is not available at the moment. Please try again later."
          />
        </div>
      )}

      {DesignerQuery.isError ? (
        <div className="my-8">
          <Error
            title="About Profile data is not avaialble!"
            description="About Profile data is not available at the moment. Please try again later."
          />
        </div>
      ) : DesignerQuery.isPending ? (
        <AboutSkeleton />
      ) : DesignerQuery.isSuccess ? (
        <AboutDesigner
          aboutDesigner={{
            locationDetails: (DesignerQuery.data?.data as API_Designer)
              .locationDetails,
            workingDays: (DesignerQuery.data?.data as API_Designer).workingDays,
            about: (DesignerQuery.data?.data as API_Designer).about,
          }}
        />
      ) : (
        <div className="my-8">
          <Error
            title="About Profile data is not avaialble!"
            description="About Profile data is not available at the moment. Please try again later."
          />
        </div>
      )}

      {RenderInspiration}

      {DesignerQuery.isError ? (
        <div className="my-8">
          <Error
            title="Profile videos are not avaialble!"
            description="Profile videos are not avaialble at the moment. Please try again later."
          />
        </div>
      ) : DesignerQuery.isPending ? (
        <DesignerVideosSkeleton />
      ) : DesignerQuery.isSuccess ? (
        <DesignerVideos />
      ) : (
        <div className="my-8">
          <Error
            title="Profile videos are not avaialble!"
            description="Profile videos are not avaialble at the moment. Please try again later."
          />
        </div>
      )}

      {DesignerQuery.isError ? (
        <div className="my-8">
          <Error
            title="Services are not avaialble!"
            description="Services are not avaialble at the moment. Please try again later."
          />
        </div>
      ) : DesignerQuery.isPending ? (
        <ServiceSkeleton
          membersLength={3}
          reviewsLength={3}
          serviceLength={4}
        />
      ) : DesignerQuery.isSuccess ? (
        <Service
          services={(DesignerQuery.data?.data as API_Designer).services}
          teamMembers={(DesignerQuery.data?.data as API_Designer).teamMembers}
          reviews={(DesignerQuery.data?.data as API_Designer).reviews}
          ratingDetails={{
            rating: (DesignerQuery.data?.data as API_Designer).rating,
            ordersFinished: (DesignerQuery.data?.data as API_Designer)
              .ordersFinished,
          }}
          name={(DesignerQuery.data?.data as API_Designer).baseAccount.name}
          workingDays={(DesignerQuery.data?.data as API_Designer).workingDays}
        />
      ) : (
        <div className="my-8">
          <Error
            title="Services are not avaialble!"
            description="Services are not avaialble at the moment. Please try again later."
          />
        </div>
      )}
    </>
  );
}

function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <SectionHeader className="my-0" title="Photos" />
      <Link
        to="/gallery/images"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "flex items-center gap-x-1 text-base font-medium leading-normal text-primary hover:bg-transparent hover:text-primary md:text-[1.2rem]",
        )}
      >
        See more
        <ChevronRight size={25} />
      </Link>
    </div>
  );
}
