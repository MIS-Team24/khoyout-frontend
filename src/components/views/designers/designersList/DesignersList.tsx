import Designers from "./allDesigners/Designers";
import DesignerFilter from "./designersFilter/DesignerFilter";
import { useQuery } from "@tanstack/react-query";
import {
  API_Designer,
  API_DesignersResponse,
} from "@/API/types/designers/designers";
import { getDesigners } from "@/API/designers/designers";

export default function DesignersList() {
  const designersQuery = useQuery({
    queryKey: ["designers"],
    queryFn: getDesigners,
  });

  let RenderElement = <></>;

  if (designersQuery.isLoading) {
    RenderElement = <div>Loading...</div>;
  }

  if (designersQuery.isSuccess) {
    const tansformedData = designersQuery.data?.data as API_DesignersResponse;
    RenderElement = (
      <>
        <div>DesignersSorting</div>
        <Designers desigenrs={tansformedData.designers as API_Designer[]} />
      </>
    );
  }

  return (
    <div className="main-container">
      {RenderElement}
      <DesignerFilter />
      <div>DesignersPagination</div>
    </div>
  );
}
