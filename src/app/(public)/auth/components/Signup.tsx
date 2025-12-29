"use client";

import signupSchema from "@/lib/validators/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import createUser from "../actions/create-user";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<z.infer<typeof signupSchema>>({
        defaultValues: {
            name: "",
            phone: "",
            address: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(signupSchema),
    });
    const router = useRouter();

    const handleSignup = async (formData: z.infer<typeof signupSchema>) => {
        const data = await createUser(formData);
        if (!data.success) {
            toast.error(data.message);
            return;
        }
        const loggedInData = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        if (!loggedInData?.error) {
            toast.success("রেজিস্ট্রেশন সফলভাবে করা হয়েছে");
            router.push("/user");
        } else {
            toast.error(loggedInData?.error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(handleSignup)}
            className="flex flex-col gap-y-6"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    পুরো নাম
                </label>
                <input
                    type="text"
                    required
                    className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="আপনার নাম"
                    {...register("name", { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    মোবাইল নাম্বার
                </label>
                <input
                    type="tel"
                    required
                    className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="017xxxxxxxx"
                    {...register("phone", { required: true })}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    ঠিকানা
                </label>
                <textarea
                    required
                    className="mt-1 appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="বাড়ির নং, রাস্তা, এলাকা"
                    {...register("address", { required: true })}
                />
            </div>
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
                রেজিস্ট্রেশন করুন
            </button>
        </form>
    );
};

export default Signup;
