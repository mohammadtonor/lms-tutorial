'use client';

import { usePathname } from 'next/navigation';
 
import { Layout, Compass, List, BarChart } from "lucide-react"
import { SiddebarItem } from "./sidebar-item";

const guestRoutes = [
    {
        href: '/',
        icon: Layout,
        label: 'Dashboard'
    },
    {
        label: 'Brows',
        href: '/search',
        icon: Compass
    }
];

const teacherRoutes = [
    {
        href: '/teacher/courses',
        icon: List,
        label: 'Courses'
    },
    {
        label: 'Analytist',
        href: '/teacher/analytics',
        icon: BarChart
    }
]

export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage? teacherRoutes : guestRoutes;
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