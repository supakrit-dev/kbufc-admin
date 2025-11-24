"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "../ui/spinner"

interface ConfirmActionDialogProps {
    title: string
    description: string
    actionText?: string
    cancelText?: string
    onConfirm: () => Promise<{
        success: boolean,
        message: any
    }>
    triggerElement?: React.ReactNode // ตัว trigger อะไรก็ได้ เช่น Button, Icon
    destructive?: boolean
}

export function ConfirmActionDialog({
    title,
    description,
    actionText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    triggerElement,
    destructive = true,
}: ConfirmActionDialogProps) {
    const [loading, setLoading] = useState(false)

    async function handleConfirm() {
        setLoading(true)
        const state = await onConfirm()
        if(!state.success){
            toast.error(state.message)
        }
        setLoading(false)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerElement || <Button variant={destructive ? "destructive" : "default"}>{actionText}</Button>}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={loading}>
                        {loading ? <Spinner /> : actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
