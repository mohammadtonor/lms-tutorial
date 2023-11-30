"use client";

import { Button } from "@/components/ui/button";
import { useConfettistore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    isComplated?: Boolean;
    nextChapterId?: string;
}


export const CourseProgressButton = ({
    courseId,
    chapterId,
    isComplated,
    nextChapterId
}: CourseProgressButtonProps) => {
    const Icon = isComplated ? XCircle : CheckCircle;
    const confeti = useConfettistore();
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const onClick = async () => {
        try {
            setisLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isComplated
            });

            if (!isComplated && !nextChapterId) {
                confeti.onOpen();
            }

            if (!isComplated && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                router.refresh();
            }

            toast.success("progress completed");
            router.refresh();
        } catch {
            toast.error("something went wrong");
        } finally {
            setisLoading(false);
        }
    }
    return (
        <Button
            type="button"
            variant={isComplated ? "outline" : "success"}
            className="w-full md:w-auto"
            onClick={onClick}
            disabled={isLoading}
        >
            {isComplated ? "Not Comleted" : "Mark as Completed"}
            <Icon className="w-4 h-4 ml-2"/>
        </Button>
    );
}