import { LogOut, User } from "lucide-react"

export type NavigationsLink = {
    label: string
    url: string
    icon?: any
}

export const sidebarNavigations: NavigationsLink[] = [
    { label: 'Users', url: '/admin/users', icon: User },
]

export const headerNavigations: NavigationsLink[] = [
    { label: 'Logout', url: '', icon: LogOut }
]
