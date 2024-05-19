import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Button,
    Input,
    Checkbox
} from "@/components/ui";
/*
import {LoadingState} from "@/components/customUi";
*/
import SideImg from "@/assets/side-img.jpg";
import {Mail, Lock, EyeOff, Eye} from "lucide-react";
import {login} from "@/API/login/login";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import Logo from "@/assets/logo.png";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Link} from '@tanstack/react-router';

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address (user@xyz.com).",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    rememberMe: z.boolean().default(false).optional(),
})
export default function LoginHomePage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })
    const [showPassword, setShowPassword] = useState({
        password: false,
    });
    const loginMutation = useMutation({
        mutationFn: login,
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        loginMutation.mutate(values);
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
                                                <div
                                                    className="flex items-center justify-center gap-x-0.5 rounded px-3 py-3 h-12 border border-input focus-within:border-primary">
                                                    <Mail size={24} className="text-secondary"/>
                                                    <Input type="email"
                                                           placeholder="Enter your email address" {...field}
                                                           className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0"/>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-left"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div
                                                    className="flex items-center justify-center gap-x-0.5 rounded px-3 py-3 h-12 border border-input focus-within:border-primary">
                                                    <Lock size={24} className="text-secondary"/>
                                                    <Input type={showPassword.password ? "text" : "password"}
                                                           placeholder="Enter your email password" {...field}
                                                           className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0"/>
                                                    <div className="cursor-pointer">
                                                        {showPassword.password ? (
                                                            <EyeOff
                                                                size={24}
                                                                className="text-secondary"
                                                                onClick={() =>
                                                                    setShowPassword({
                                                                        ...showPassword,
                                                                        password: false,
                                                                    })
                                                                }
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={24}
                                                                className="text-secondary"
                                                                onClick={() =>
                                                                    setShowPassword({
                                                                        ...showPassword,
                                                                        password: true,
                                                                    })
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-left"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="rememberMe"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="flex justify-between place-items-center">
                                                    <div className="flex items-center space-x-2">
                                                        <Checkbox id="terms" checked={field.value}
                                                                  onCheckedChange={field.onChange}/>
                                                        <label
                                                            htmlFor="terms"
                                                            className="text-sm text-secondary leading-none peer-disabled:cursor-not-allowed"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <Link to="/forget-password" className="text-primary text-xs">
                                                        Forgot Password?
                                                    </Link>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <Button type="submit" className="w-full h-14 rounded-2xl text-2xl">Log In</Button>
                                    <p className="text-secondary text-base font-normal mt-6">Don’t have an
                                        account? <Link
                                            to="/register" className="text-primary font-semibold">Sign Up</Link></p>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="w-2/5 hidden md:block">
                <img src={SideImg} alt="sideImage" className="object-cover w-full h-full"/>
            </div>
        </div>
    );
}