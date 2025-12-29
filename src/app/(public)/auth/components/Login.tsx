"use client";

import loginSchema from "@/lib/validators/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<z.infer<typeof loginSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    const handleLogin = async (formData: z.infer<typeof loginSchema>) => {
        const data = await signIn("credentials", {
            ...formData,
            redirect: false,
        });
        if (data?.error) return toast.error(data.error);
        toast.success("লগইন সফলভাবে করা হয়েছে");
        router.push("/user");
    };

    return (
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    ইমেইল এড্রেস
                </label>
                <input
                    type="email"
                    required
                    className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="example@mail.com"
                    {...register("email", { required: true })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    পাসওয়ার্ড
                </label>
                <input
                    type="password"
                    required
                    className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="******"
                    {...register("password", { required: true })}
                />
            </div>

            <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition disabled:opacity-50"
                disabled={isSubmitting}
            >
                {isSubmitting && <Loader2 className="animate-spin me-2" />}
                লগইন
            </button>
        </form>
    );
};

export default Login;
