import NavigatablePageWrapper from "@/components/custom/NavigatablePageWrapper";
import { ImagesPagination } from "@/components/views/imagesPagination";

function ImagePagination() {
  return (
    <main>
      <NavigatablePageWrapper>
        <ImagesPagination />
      </NavigatablePageWrapper>
    </main>
  );
}

export default ImagePagination;
