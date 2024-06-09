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
import { API_Designer } from "@/API/types/designer/designer";
import { getDesigner, getDesignerPortfolio } from "@/API/designer/designer";
// import { clients, inspirationImages } from "@/assets";
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

  // if (DesignerQuery.isSuccess) {
  //   const transformedData = DesignerQuery.data.data as API_Designer;
  // }

  let RenderElement = <></>;
  let RenderInspiration = <></>;

  if (DesignerPortfolioQuery.isError) {
    RenderInspiration = (
      <div className="my-8">
        <Error
          title="Designer Portfolio images are not avaialble!"
          description="Designer Portfolio images are not available at the moment. Please try again later."
        />
      </div>
    );
  }

  if (DesignerPortfolioQuery.isPending) {
    RenderInspiration = <InspirationSkeleton arrayLength={3} />;
  }

  if (DesignerPortfolioQuery.isSuccess) {
    RenderInspiration = <Inspiration header={<Header />} />;
  }

  if (DesignerQuery.isError) {
    RenderElement = (
      <div className="my-8">
        <Error
          title="Profile data is not avaialble!"
          description="Profile data is not available at the moment. Please try again later."
        />
      </div>
    );
  }

  if (DesignerQuery.isPending) {
    RenderElement = (
      <>
        <DesigenrProfileSkeleton />
        <AboutSkeleton />
        <DesignerVideosSkeleton />
        <ServiceSkeleton
          membersLength={3}
          reviewsLength={3}
          serviceLength={4}
        />
      </>
    );
  }

  if (DesignerQuery.isSuccess) {
    const transformedData = DesignerQuery.data?.data as API_Designer;
    // Profile details of the designer
    const designerDetails = {
      avatarUrl: transformedData.baseAccount.avatarUrl,
      name: transformedData.baseAccount.name,
      ordersFinished: transformedData.ordersFinished,
      openNow: transformedData.openNow,
      openUntil: transformedData.openUntil,
      rating: transformedData.rating,
    };
    // About details of the designer
    const aboutDesigner = {
      locationDetails: transformedData.locationDetails,
      workingDays: transformedData.workingDays,
      about: transformedData.about,
    };

    RenderElement = (
      <>
        <ProfileDetails designerDetails={designerDetails} wishlisted={false} />
        <AboutDesigner aboutDesigner={aboutDesigner} />
        {RenderInspiration}
        <DesignerVideos />
        <Service
          services={transformedData.services}
          teamMembers={transformedData.teamMembers}
          reviews={transformedData.reviews}
          ratingDetails={{
            rating: transformedData.rating,
            ordersFinished: transformedData.ordersFinished,
          }}
        />
      </>
    );
  }

  return RenderElement;
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

/*
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
        <ProfileDetails />
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
        <AboutDesigner />
      ) : (
        <div className="my-8">
          <Error
            title="About Profile data is not avaialble!"
            description="About Profile data is not available at the moment. Please try again later."
          />
        </div>
      )}

      {DesignerPortfolioQuery.isError ? (
        <div className="my-8">
          <Error
            title="Designer Portfolio images are not avaialble!"
            description="Designer Portfolio images are not available at the moment. Please try again later."
          />
        </div>
      ) : DesignerPortfolioQuery.isPending ? (
        <InspirationSkeleton arrayLength={3} />
      ) : DesignerPortfolioQuery.isSuccess ? (
        <Inspiration header={<Header />} />
      ) : (
        <div className="my-8">
          <Error
            title="Designer Portfolio images are not avaialble!"
            description="Designer Portfolio images are not available at the moment. Please try again later."
          />
        </div>
      )}

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
        <Service />
      ) : (
        <div className="my-8">
          <Error
            title="Services are not avaialble!"
            description="Services are not avaialble at the moment. Please try again later."
          />
        </div>
      )}
    </>
*/
