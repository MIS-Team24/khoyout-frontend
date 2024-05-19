import {SideImg, Logo} from "@/assets/";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Button,
    Input,
} from "@/components/ui";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Lock, EyeOff, Eye, Check, X} from "lucide-react";
import {useState} from "react";

const formSchema = z.object({
    password: z
        .string(),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
export default function ResetPasswordPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>, event) {
        if (values.password !== '' || values.password == undefined) {
            if (values.password.length >= 8 && /[a-z]/.test(values.password) && /[A-Z]/.test(values.password) && /[0-9]/.test(values.password)) {
                console.log(values)
            } else {
                event.preventDefault();
            }
        }
    }

    const [value, setValue] = useState('');

    function handleInputChange(event) {
        setValue(`${event.value}`);
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
                            <p className="text-[2.5rem] font-medium mb-4">Reset Password</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div
                                                    className="flex items-center justify-center gap-x-0.5 rounded px-3 py-3 h-12 border border-input focus-within:border-primary">
                                                    <Lock size={24} className="text-secondary"/>
                                                    <Input onKeyUp={handleInputChange({...field})}
                                                           type={showPassword.password ? "text" : "password"}
                                                           placeholder="Enter your password" {...field}
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
                                    name="confirmPassword"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <div
                                                    className="flex items-center justify-center gap-x-0.5 rounded px-3 py-3 h-12 border border-input focus-within:border-primary">
                                                    <Lock size={24} className="text-secondary"/>
                                                    <Input type={showPassword.confirmPassword ? "text" : "password"}
                                                           placeholder="Confirm Password" {...field}
                                                           className="focus-visible:ring-0 focus-visible:ring-offset-0 border-0"/>
                                                    <div className="cursor-pointer">
                                                        {showPassword.confirmPassword ? (
                                                            <EyeOff
                                                                size={24}
                                                                className="text-secondary"
                                                                onClick={() =>
                                                                    setShowPassword({
                                                                        ...showPassword,
                                                                        confirmPassword: false,
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
                                                                        confirmPassword: true,
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
                                <div>
                                    <Button type="submit" className="w-full h-14 rounded-2xl text-2xl">Log In</Button>
                                </div>
                            </form>
                        </Form>
                        <div className="text-left">
                            <p className="text-foreground text-2xl mb-4">Password conditions</p>
                            <ul id="password-condition-list">
                                <li>
                                    {value.length >= 8 ? (
                                        <Check className="text-success duration-300" size={24}/>
                                    ) : (
                                        <X className="text-error duration-300" size={24}/>
                                    )}
                                    <span
                                        className={value.length >= 8 ? 'text-success duration-300' : 'text-error duration-300'}>At least 8 characters long</span>
                                </li>
                                <li>
                                    {/[a-z]/.test(value) ? (
                                        <Check className="text-success" size={24}/>
                                    ) : (
                                        <X className="text-error" size={24}/>
                                    )}
                                    <span
                                        className={/[a-z]/.test(value) ? 'text-success duration-300' : 'text-error duration-300'}>Include at least one lowercase letter (a-z)</span>
                                </li>
                                <li>
                                    {/[A-Z]/.test(value) ? (
                                        <Check className="text-success" size={24}/>
                                    ) : (
                                        <X className="text-error" size={24}/>
                                    )}
                                    <span
                                        className={/[A-Z]/.test(value) ? 'text-success duration-300' : 'text-error duration-300'}>Include at least one uppercase letter (A-Z)</span>
                                </li>
                                <li>
                                    {/[0-9]/.test(value) ? (
                                        <Check className="text-success" size={24}/>
                                    ) : (
                                        <X className="text-error" size={24}/>
                                    )}
                                    <span
                                        className={/[0-9]/.test(value) ? 'text-success duration-300' : 'text-error duration-300'}>Include at least one number (0-9)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-2/5 hidden md:block">
                <img src={SideImg} alt="sideImage" className="object-cover w-full h-full"/>
            </div>
        </div>
    )
        ;
}