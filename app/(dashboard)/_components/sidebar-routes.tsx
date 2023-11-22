'use client';

import { Layout, Compass } from "lucide-react"
import { SiddebarItem } from "./sidebar-item";

const routes = [
    {
        href: '/',
        icon: Layout,
        label: 'Dashboard'
    },
    {
        label:'Brows',
        href: '/search',
        icon: Compass
    }
]

export const SidebarRoutes = () => {
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SiddebarItem
                    key={route.href}
                    label={route.label}
                    href={route.href}
                    icon={route.icon}
                />
            ))}
        </div>
    );
}