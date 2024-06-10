import {Button, buttonVariants} from "@/components/ui";
import {Card} from "@/components/ui/card";
import {Briefcase, Clock, Heart, MapPin, User} from "lucide-react";
import {Rating} from "react-simple-star-rating";
import {cn} from "@/lib/utils";
import {Link} from "@tanstack/react-router";

type DesignerCardProps = {
    id: string;
    name: string;
    ratings: {
        average: number;
        totalCount: number;
    };
    yearsOfExperienceCount: number;
    wishlisted: boolean;
    // address: {
    //   province: string;
    //   city: string;
    // };
    img: string;
    address: string;
    openNow: boolean;
    openUntil: string;
    gender: string;
};
import {addItem, removeItem} from '@/store/features/wishlist';
import {WishlistItem} from '@/store/features/wishlist/index.ts';
import {useDispatch} from 'react-redux';

export default function DesignerCard(props: DesignerCardProps) {
    const dispatch = useDispatch();
    const handleAddItem = () => {
        const newItem: WishlistItem = {
            id: props.id,
            name: props.name,
            ratings: {
                average: props.ratings.average,
                totalCount: props.ratings.totalCount,
            },
            yearsOfExperienceCount: props.yearsOfExperienceCount,
            wishlisted: true,
            // address: {
            //   province: string;
            //   city: string;
            // };
            img: props.img,
            address: props.address,
            openNow: props.openNow,
            openUntil: props.openUntil,
            gender: props.gender
        };
        dispatch(addItem(newItem));
    };
    const handleRemoveItem = () => {
        dispatch(removeItem(props.id));
    };
    return (
        <div>
            <Card className="flex h-full w-full flex-col items-center gap-4 overflow-hidden border-gray-300 pb-4">
                <div className="h-[280px] w-full rounded-lg">
                    <img
                        className="h-full w-full rounded-t-lg object-cover"
                        src={props.img}
                        alt={`${props.name} image`}
                    />
                </div>
                <div className="flex w-full flex-col gap-2 px-4">
                    <div className="flex items-center justify-between">
                        <h3 className="whitespace-nowrap text-2xl">{props.name}</h3>
                        {props.wishlisted ? (
                            <Button className="group m-0 h-fit bg-transparent p-0 hover:bg-transparent"
                                    onClick={handleRemoveItem}>
                                <Heart
                                    className={cn(
                                        "text-primary transition-all",
                                        props.wishlisted ? "fill-primary" : "fill-none",
                                    )}
                                    strokeWidth={1.5}
                                />
                                <Heart
                                    className="absolute fill-primary text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:active:fill-muted-foreground"
                                    strokeWidth={1.5}
                                />
                            </Button>
                        ) : (
                            <Button className="group m-0 h-fit bg-transparent p-0 hover:bg-transparent"
                                    onClick={handleAddItem}>
                                <Heart
                                    className={cn(
                                        "text-primary transition-all",
                                        props.wishlisted ? "fill-primary" : "fill-none",
                                    )}
                                    strokeWidth={1.5}
                                />
                                <Heart
                                    className="absolute fill-primary text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:active:fill-muted-foreground"
                                    strokeWidth={1.5}
                                />
                            </Button>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <Rating
                            initialValue={props.ratings.average}
                            className="relative bottom-[2px] w-full"
                            iconsCount={5}
                            readonly={true}
                            SVGclassName={`inline-block`}
                            allowFraction={true}
                            size={20}
                        />
                        <p className="text-[12px]">({props.ratings.totalCount})</p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-[12px]">
                        <p className="flex items-center gap-2">
              <span>
                <MapPin size={12}/>
              </span>
                            {/* {props.address.province}, {props.address.city} */}
                            <span className="whitespace-nowrap text-sm text-[#49454F]">
                {props.address}
              </span>
                        </p>
                        <p className="flex items-center gap-2 whitespace-nowrap text-sm text-[#49454F]">
              <span>
                <Clock size={12}/>
              </span>
                            <span>
                {props.openNow ? (
                    <span className="text-green-500">Opened</span>
                ) : (
                    <span className="text-red-500">Closed</span>
                )}
              </span>
                            {props.openNow ? (
                                <span>until - {props.openUntil}</span>
                            ) : (
                                <span>now</span>
                            )}
                        </p>
                        <p className="flex items-center gap-2 whitespace-nowrap text-sm text-[#49454F]">
              <span>
                <Briefcase size={12}/>
              </span>
                            {props.yearsOfExperienceCount} Years Of Experience
                        </p>
                        <p className="flex items-center gap-2 whitespace-nowrap text-sm text-[#49454F]">
              <span>
                <User size={13}/>
              </span>
                            {props.gender}
                        </p>
                    </div>
                </div>
                <div className="w-full px-4">
                    <Link
                        to="/desginer/$designerId"
                        params={{designerId: props.id}}
                        className={cn(
                            buttonVariants({variant: "default"}),
                            "mt-auto h-8 w-full rounded-full py-5 text-base font-medium leading-normal",
                        )}
                    >
                        View Profile
                    </Link>
                </div>
            </Card>
        </div>
    )
        ;
}
