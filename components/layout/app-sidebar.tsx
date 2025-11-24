'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from "@/components/ui/sidebar"
import { NavigationsLink, sidebarNavigations } from "@/lib/navigations"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SidebarNagivationMenuProps = {
    links: NavigationsLink[]
}

const SidebarNagivationMenu = ({ links }: SidebarNagivationMenuProps) => {
    const pathName = usePathname()
    const activeStyle = "bg-gray-200 rounded-md"
    return (
        <SidebarMenu>
            {links.map((item) => {
                const isActive = pathName.includes(item.url)
                return (
                    <SidebarMenuItem key={item.label} className={isActive ? activeStyle : ''}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <div className="w-5 h-6 relative m-4">
                    <Image src={'/images/kbufc_logo.png'} alt="Kbufc logo picture" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupLabel>User Mangement</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarNagivationMenu links={sidebarNavigations} />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}