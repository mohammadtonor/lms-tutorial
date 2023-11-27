"use client"

import { useState } from "react";
import { ConfirmModal } from "@/components/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const Actions = ({
    disabled,
    courseId,
    isPublished
}: ActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
   
    const onClick = async () => {
        try {
            setIsLoading(true);
            console.log(isPublished);
            
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course Unpublished");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course Published");
            }
            
            router.refresh();
        } catch {
            toast.error("SomeThing went wrong!");
        } finally {
            setIsLoading(false);
        }
    } 
   
    const onDelete = async () => { 
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}/`);
            toast.success("Chapter Deleted");
            router.refresh();
            router.push(`/teacher/courses/`);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished? "Unpublished" : "Published"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    );
}