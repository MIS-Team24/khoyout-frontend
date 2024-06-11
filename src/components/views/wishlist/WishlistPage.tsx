import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import DesignerCard from "@/components/views/designers/designersList/allDesigners/DesignerCard.tsx";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { selectWishlist } from "@/store/features/wishlist";
import { Error } from "@/components/custom";

export default function WishlistPage() {
  const wishlist = useSelector(selectWishlist);
  return (
    <div className="main-container">
      <Breadcrumb className="my-6 lg:my-12">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/home" className="text-foreground hover:underline">
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-foreground">
              My Wishlist
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-[2rem] font-medium text-foreground">My Wishlist</h1>
        <div className="my-8 flex flex-wrap place-items-center gap-6">
          {wishlist.length === 0 ? (
            <Error
              title="Wishlist is empty"
              description="
                You haven't added any designers to your wishlist yet. 
                Go to the designers page and start adding designers to your wishlist.
            "
            />
          ) : (
            wishlist.map((item) => (
              <DesignerCard
                id={item.id}
                name={item.name}
                // address={{ city: location, province: location }}
                address={item.address}
                ratings={{
                  average: item.ratings.average,
                  totalCount: item.ratings.totalCount,
                }}
                wishlisted={true}
                yearsOfExperienceCount={item.yearsOfExperienceCount}
                key={item.id}
                img={item.img}
                openNow={item.openNow}
                openUntil={item.openUntil}
                gender={item.gender}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
