'use client'
import { createUserAction, updateUserAction } from "@/actions/user"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { userSchema } from "@/schemas/user/user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircleIcon, CircleCheck, CircleX } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert, AlertTitle } from "../ui/alert"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Spinner } from "../ui/spinner"

type UserFormProps = {
    initialValues?: z.infer<typeof userSchema>;
    id?: string
}

const UserForm = ({ initialValues, id }: UserFormProps) => {
    const router = useRouter()
    const isDisabledPassword = initialValues ? true : false

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: initialValues || {
            username: "",
            password: "",
            role: "ADMIN",
            status: "ACTIVE"
        },
    })

    async function onSubmit(values: z.infer<typeof userSchema>) {
        const result = initialValues && id
            ? await updateUserAction(values, id)
            : await createUserAction(values)
        if (!result.success) {
            form.setError("root", {
                message: result.message
            })
        } else {
            router.push('/admin/users')
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white rounded-md">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
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
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>
                                        {initialValues
                                            ? 'New Password'
                                            : 'Password'
                                        }
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} disabled={isDisabledPassword} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-2">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} {...field}>
                                        <SelectTrigger className="w-full py-[22px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                            <SelectItem value="USER">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} {...field}>
                                        <SelectTrigger className="w-full py-[22px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ACTIVE">
                                                <Badge variant="outline" className="text-muted-foreground px-1.5">
                                                    <CircleCheck className="fill-green-500" />
                                                    ACTIVE
                                                </Badge>
                                            </SelectItem>
                                            <SelectItem value="INACTIVE">
                                                <Badge variant='outline' className="text-muted-foreground px-1.5">
                                                    <CircleX className="fill-red-500" />
                                                    INACTIVE
                                                </Badge>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex gap-4 justify-end">
                    <Button variant='outline' type='button' className="text-md px-8 py-[18px]" onClick={() => router.replace('/admin/users')}>
                        Cancel
                    </Button>
                    <Button type="submit" className="text-md px-8 py-[18px]" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting
                            ? <Spinner />
                            : "Submit"
                        }
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default UserForm