import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui";
import DesignerCard from "@/components/views/designers/designersList/allDesigners/DesignerCard.tsx";
import {Link} from "@tanstack/react-router";
import {API_Designer} from "@/API/types/designers/designers";


type DesignerProps = {
    desigenrs: API_Designer[];
};
export default function WishlistPage({desigenrs}: DesignerProps) {
    return (
        <div className="main-container">
            <Breadcrumb className="my-6 lg:my-12">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/home" className="text-foreground hover:underline">Home</Link>
                        </BreadcrumbLink>
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
                    {desigenrs?.map(
                        ({
                             baseAccountId,
                             ordersFinished,
                             address,
                             yearsExperience,
                             rating,
                             avatarUrl,
                             gender,
                             name,
                             openNow,
                             openUntil,
                         }) => (
                            <DesignerCard
                                id={baseAccountId}
                                name={name}
                                // address={{ city: location, province: location }}
                                address={address}
                                ratings={{average: rating, totalCount: ordersFinished}}
                                wishlisted={false}
                                yearsOfExperienceCount={yearsExperience}
                                key={baseAccountId}
                                img={avatarUrl}
                                openNow={openNow}
                                openUntil={openUntil}
                                gender={gender}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}