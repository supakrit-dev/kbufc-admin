'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { SidebarTrigger } from "../ui/sidebar"

import { logout } from "@/actions/auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"
const AppHeader = () => {
    const router = useRouter()

    const handleClick = async () => {
        const result = await logout()
        if (!result.success) {
            toast.error(result.message)
        } else {
            router.replace('/login')
        }
    }
    return (
        <header>
            <div className="border-b w-full p-3 flex justify-between items-center">
                <SidebarTrigger />
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-transparent">
                                <Avatar>
                                    <AvatarImage src='/images/kbufc_logo.png'/>
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent asChild>
                                <Button variant='ghost' onClick={handleClick}>Logout</Button>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </header>
    )
}
export default AppHeader