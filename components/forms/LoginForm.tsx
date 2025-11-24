"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { login } from "@/lib/api/auth"
import { loginSchema } from "@/schemas/auth/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircleIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Spinner } from "../ui/spinner"



const LoginForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        const result = await login(values)
        if (!result.success) {
            form.setError("root", {
                message: result.message
            })
        }else{
            router.push('/admin/dashboard')
        }
    }

    return (
        <Form {...form}>
            {form.formState.errors.root && (
                <Alert variant="destructive" className="my-4 bg-red-50 border-red-500">
                    <AlertCircleIcon />
                    <AlertTitle>{form.formState.errors.root.message}, Please try again.</AlertTitle>
                </Alert>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full text-md px-8 py-[18px]" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? <Spinner />
                        : "Login"
                    }
                </Button>
            </form>
        </Form>
    )
}
export default LoginForm