import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Button,
    Input
} from "@/components/ui";
import SideImg from "@/assets/images/side-img.jpg";
import Logo from "@/assets/images/logo.png";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address (user@xyz.com).",
    }),
    password: z.string().min(2, {
        message: "password must be at least 2 characters.",
    }),
})
export default function LoginHomePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <div className="flex h-screen">
            <div className="w-full md:w-3/5">
                <div className="p-11">
                    <img src={Logo} alt="Logo" className="object-cover"/>
                </div>
                <div className="flex justify-center place-items-center">
                    <div className="w-[23rem] flex flex-col gap-16 text-center">
                        <div>
                            <p className="text-[2.5rem] font-medium mb-4">Log In</p>
                            <span className="text-lg text-secondary">Welcome Back to Khoyout! Please enter you email and password</span>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email address" {...field}
                                                       className="focus-visible:ring-0 focus-visible:ring-offset-0"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password"
                                                       placeholder="Enter your email password" {...field}
                                                       className="focus-visible:ring-0 focus-visible:ring-offset-0"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full h-14 rounded-2xl text-2xl">Log In</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="w-2/5 hidden md:block">
                <img src={SideImg} className="object-cover w-full h-full"/>
            </div>
        </div>
    );
}