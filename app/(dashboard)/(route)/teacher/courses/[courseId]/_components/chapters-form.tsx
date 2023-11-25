"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DivideCircle, Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Chapter, Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ChaptersList } from "./chapters-list";

interface ChapterFormProps {
  initialData: Course & {chapters: Chapter[]};
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChapterForm = ({
  initialData,
  courseId,
}: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  

  const toggleCreating = () => {
    setIsCreating(!isCreating);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const onReorder = async (updatedData: { id: string, position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, { list: updatedData });
      toast.success("Chapter Reordered");
      router.refresh();
    } catch {
        toast.error("Something went wrong!"); 
    } finally {
      setIsUpdating(false);
    }
  }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute flex right-0 h-full w-full opa bg-slate-500/20 top-0 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700"/>
        </div>
      )}
      <div className="font-semibold flex items-center justify-between">
        Course chapters
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Create Chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Introduction of course" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
          {!initialData.chapters.length && "No chapters"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Drag and drop reorder the chapters
        </p>
      )}
    </div>
  );
};
