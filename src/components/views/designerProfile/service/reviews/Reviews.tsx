import {clients} from "@/assets";
import {Rating} from "react-simple-star-rating";

export default function Reviews() {

    return (
        <section className="lg:mb-[4.25rem]">
            <div>
                <div className="mb-8">
                    <p className="text-foreground text-[2rem]">Reviews</p>
                    <Rating initialValue={5}
                            className="relative bottom-[2px] w-full my-3"
                            iconsCount={5}
                            readonly={true}
                            SVGclassName={`inline-block`}
                            allowFraction={true}
                            size={32}/>
                    {/*Store Rating*/}
                    <div className="flex gap-4">
                        <p className="text-foreground text-2xl">5.0</p>
                        <p className="text-primary text-2xl">(124)</p>
                    </div>
                </div>
                <div>
                    {clients.map(({src, alt, name, review}, i) => (
                        <div key={`client-${i}`} className="flex flex-col gap-2 mb-8 lg:w-11/12">
                            <div className="flex gap-2">
                                <div>
                                    <img src={src} alt={alt}
                                         className="rounded-full w-12 h-12 object-center object-cover"/>
                                </div>
                                <div>
                                    <p>{name}</p>
                                    <p className="text-secondary text-sm">6 days ago</p>
                                    <Rating initialValue={5}
                                            className="relative bottom-[2px] w-full"
                                            iconsCount={5}
                                            readonly={true}
                                            SVGclassName={`inline-block`}
                                            allowFraction={true}
                                            size={16}/>
                                </div>
                            </div>
                            <div>
                                <p className="text-secondary text-xl">{review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
        ;
}
