"use client"

import { deleteUsersAction } from "@/actions/users"
import { ConfirmActionDialog } from "@/components/dialog/ConfirmActionDialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/date"

import { ColumnDef } from "@tanstack/react-table"
import { CircleCheck, CircleX, MoreHorizontal, SquarePen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export type User = {
    id: string
    username: string
    password: string
    role: 'ADMIN' | 'USER'
    status: 'ACTIVE' | 'INACTIVE'
    createdAt: string
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge variant="outline" className="text-muted-foreground px-1.5">
                    {status === "ACTIVE" ? (
                        <CircleCheck className="fill-green-500" />
                    ) : (
                        <CircleX className="fill-red-500" />
                    )}
                    {status}
                </Badge>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const fommattedDate = formatDate(row.original.createdAt)
            return <div className="font-medium">{fommattedDate}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id
            const pathName = usePathname()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${id}`}>
                                <SquarePen />Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <ConfirmActionDialog
                                title="Delete User"
                                description="Are you sure you want to delete this user? This action cannot be undone."
                                onConfirm={() => deleteUsersAction({ id, pathName })}
                                triggerElement={
                                    <Button variant='ghost' className="w-full text-muted-foreground justify-start">
                                        <CircleX />Delete
                                    </Button>}
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]