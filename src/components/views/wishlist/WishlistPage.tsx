import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui";
import DesignerCard from "@/components/views/designers/designersList/allDesigners/DesignerCard.tsx";
import {Link} from "@tanstack/react-router";
import {useSelector} from 'react-redux';
import {selectWishlist} from '@/store/features/wishlist/index.ts';


export default function WishlistPage() {
    const wishlist = useSelector(selectWishlist);
    console.log(wishlist)
    return (
        <div className="main-container">
            <Breadcrumb className="my-6 lg:my-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link to="/home" className="text-foreground hover:underline">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold text-foreground">My Wishlist</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1 className="font-medium text-[2rem] text-foreground">My Wishlist</h1>
                <div className="my-8 flex place-items-center gap-6 flex-wrap">
                    {wishlist.map((item) => (
                        <DesignerCard
                            id={item.id}
                            name={item.name}
                            // address={{ city: location, province: location }}
                            address={item.address}
                            ratings={{average: item.ratings.average, totalCount: item.ratings.totalCount}}
                            wishlisted={true}
                            yearsOfExperienceCount={item.yearsOfExperienceCount}
                            key={item.id}
                            img={item.img}
                            openNow={item.openNow}
                            openUntil={item.openUntil}
                            gender={item.gender}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}