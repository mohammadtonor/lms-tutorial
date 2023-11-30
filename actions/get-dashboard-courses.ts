import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgresswithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
}

type DashboardCourses = {
    completedCourses: CourseWithProgresswithCategory[];
    courseInProgress: CourseWithProgresswithCategory[];
}

export const getDashboardCourses = async (userId: string):
Promise<DashboardCourses> => {
    try {
        const purchesedCourses = await db.purchase.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        });
        
        const courses = purchesedCourses.map((purchase) => purchase.course) as CourseWithProgresswithCategory[];

        for (let course of courses) { 
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter((course) => course.progress === 100); 
        const courseInProgress = courses.filter((course) => course.progress !== 100); 

        return {
            completedCourses,
            courseInProgress
        }
    } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            courseInProgress: [],
        }
    }
 }