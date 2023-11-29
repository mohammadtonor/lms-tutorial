import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async({
    userId,
    courseId,
    chapterId,
}: GetChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        });

        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId
            },
            select: {
                price: true
            }
        });

        const chapter = await db.chapter.findUnique({
            where: {
                isPublished: true,
                id: chapterId
            }
        });

        if (!chapter || !course) {
           throw new Error("Chapter or course not found"); 
        }

        let muxData = null;
        let atachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        if (purchase) {
            atachments = await db.attachment.findMany({
                where: {
                    courseId
                }
            });
        }

        if (chapter.isFree || purchase) {

             muxData = await db.muxData.findUnique({
                where: {
                    chapterId
                }
            });

             nextChapter = await db.chapter.findFirst({
                where: {
                    courseId,
                    isPublished: true,
                    position: {
                        gte: chapter?.position
                    }
                },
                orderBy: {
                    position: "asc"
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            }
        });
        
        return {
            chapter,
            course,
            muxData,
            atachments,
            nextChapter,
            userProgress,
            purchase
        }
    } catch (err) {
        console.log("GET_CHAAPTER", err);
        return {
            chapter: null,
            course: null,
            muxData: null,
            nextChapter: null,
            userProgress: null,
            purchese: null,
        }
     }
}