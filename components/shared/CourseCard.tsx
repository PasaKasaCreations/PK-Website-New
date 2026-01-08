"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course.interface";
import { motion } from "framer-motion";
import { Clock, Users, Calendar, ArrowRight } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden group border-2 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-orange-50 dark:from-blue-950 dark:to-orange-950">
          <Image
            src={course.thumbnail_url || "/placeholder-course.jpg"}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">
                Next:{" "}
                {new Date(course.next_batch_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <CardContent className="flex-1 p-6 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/10">
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <span>{course.sessions_running} Active</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 bg-gradient-to-b from-blue-50/30 to-white dark:from-blue-950/10 dark:to-gray-900">
          <Link href={`/courses/${course.slug}`} className="w-full">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white group/btn"
              size="lg"
            >
              <span>View Course Details</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
