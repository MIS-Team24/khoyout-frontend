import { Inspiration } from "@/components/views/home";
import ProfileDetails from "./profileDetails/ProfileDetails";
import { SectionHeader } from "@/components/custom";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import AboutDesigner from "./aboutDesigner/AboutDesigner";
import DesignerVideos from "./designerVideos/DesignerVideos";
import Service from "./service/Service";
// import { useQuery } from "@tanstack/react-query";
// import { useParams } from "@tanstack/react-router";
// import { API_Designer } from "@/API/types/designer/designer";
// import { getDesigner, getDesignerPortfolio } from "@/API/designer/designer";
// // import { clients, inspirationImages } from "@/assets";
// import {
//   AboutSkeleton,
//   DesigenrProfileSkeleton,
//   DesignerVideosSkeleton,
//   InspirationSkeleton,
//   ServiceSkeleton,
// } from "./skeletons";

export default function Designer() {
  //   const id = useParams({ from: "/desginer/$designerId/" }).designerId;

  //   const getDesignerFn = () => getDesigner(String(id));
  //   const getDesignerPortfolioFn = () => getDesignerPortfolio(String(id));

  //   const DesignerQuery = useQuery({
  //     queryKey: ["designer", id],
  //     queryFn: getDesignerFn,
  //   });

  //   const DesignerPortfolioQuery = useQuery({
  //     queryKey: ["designer-portfolio", id],
  //     queryFn: getDesignerPortfolioFn,
  //   });

  //    // let RenderElement = <></>;

  //   // if (DesignerQuery.isLoading) {
  //   //   RenderElement = <div>Loading...</div>;
  //   // }

  //   // if (DesignerQuery.isError) {
  //   //   RenderElement = <div>Error...</div>;
  //   // }

  //   // if (DesignerQuery.isSuccess) {
  //   //   const transformedData = DesignerQuery.data.data as API_Designer;
  //   // }

  //   // const date = new Date();
  //   // const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //  if (DesignerQuery.isError) {
  //     return <div>Error...</div>;
  //   }

  return (
    <>
      {/* {DesignerQuery.isError ? (
        <div>error.....</div>
      ) : DesignerQuery.isPending ? (
        <div>Loading...</div>
      ) : (
        <div>Success...</div>
      )} */}
      <ProfileDetails wishlisted={false} />
      <AboutDesigner />
      <Inspiration header={<Header />} />
      <DesignerVideos />
      <Service />
      {/* <DesigenrProfileSkeleton />
      <AboutSkeleton />
      <InspirationSkeleton arrayLength={3} />
      <DesignerVideosSkeleton />
      <ServiceSkeleton membersLength={3} reviewsLength={3} serviceLength={4} /> */}
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

/*
if DesignerQuery.isError
=> Error
 else if DesignerQuery.data?.data as API_Designer.length === 0
=> Error   
else if DesignerQuery.isPending || DesignerQuery.isLoading 
 => All Skeletons 
*/
