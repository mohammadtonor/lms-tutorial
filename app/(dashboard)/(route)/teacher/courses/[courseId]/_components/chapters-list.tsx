import { Chapter } from "@prisma/client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Grid, Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
  items: Chapter[];
}

export const ChaptersList = ({
  onEdit,
  onReorder,
  items,
}: ChaptersListProps) => {
  const [isMounted, setISMpunted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setISMpunted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(chapters);

    console.log(items)
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);

    console.log(reorderedItems);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endInsex = Math.max(result.source.index, result.destination.index);

    const updateChapters = items.slice(startIndex, endInsex + 1);

    setChapters(items);

    const bulkUpdateData = updateChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}>
                {(provided) => (
                  <div
                    className={cn(
                      "flex place-items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished && "bg-sky-100 border-sky-200"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div
                      className={cn(
                        "flex px-2 py-3 border-b border-slate-200 hover:bg-slate-300 rounded-md transition",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}>
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}>
                        {chapter.isPublished ? "Published" : "Free"}
                      </Badge>
                      <Pencil
                        onClick={() => {
                          onEdit(chapter.id);
                        }}
                        className="w-4 h-4 cursor-pointer hover:opacity-75"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
