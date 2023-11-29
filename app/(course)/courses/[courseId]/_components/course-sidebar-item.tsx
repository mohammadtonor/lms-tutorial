"use client";

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidbarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseSidebareItem = ({
    label,
    id,
    isCompleted,
    courseId,
    isLocked,
}: CourseSidbarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }
    return (
        <button
            onClick={onClick}
            className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] " +
               "pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20"
            )}
        >
            <div className="flex items-center gap-x-2 py-2">
                <Icon
                    size={22}
                    className={cn("text-slate-500",
                            isActive && "text-slate-700",
                            isCompleted && "text-emerald-700"
                    )}
                />
                {label}
            </div>
            <div className={cn(
                "ml-auto border-2 transition-all border-slate-700 h-full opacity-0",
                isActive && "opacity-100",
            )}
            />
        </button>
    )
}