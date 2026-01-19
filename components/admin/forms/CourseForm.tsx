"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DynamicListInput } from "../ui/DynamicListInput";
import { ImageUpload } from "../ui/ImageUpload";
import { WASABI_FOLDERS } from "@/lib/wasabi/client";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  createCourse,
  updateCourse,
  checkCourseSlugExists,
} from "@/lib/admin/actions/courses";
import type {
  CourseFormData,
  SyllabusModule,
  Testimonial,
} from "@/lib/admin/schemas/course.schema";
import type { Tables } from "@/types/database.types";

interface CourseFormProps {
  course?: Tables<"courses">;
}

export function CourseForm({ course }: CourseFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState(course?.title || "");
  const [slug, setSlug] = useState(course?.slug || "");
  const [description, setDescription] = useState(course?.description || "");
  const [longDescription, setLongDescription] = useState(
    course?.long_description || ""
  );
  const [instructor, setInstructor] = useState(course?.instructor || "");
  const [duration, setDuration] = useState(course?.duration || "");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced">(
    course?.skill_level || "beginner"
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(course?.thumbnail_url || "");
  const [location, setLocation] = useState(course?.location || "");
  const [price, setPrice] = useState(course?.price || 0);
  const [currency, setCurrency] = useState(course?.currency || "INR");
  const [maxStudents, setMaxStudents] = useState(course?.max_students || 20);
  const [currentStudents, setCurrentStudents] = useState(
    course?.current_students || 0
  );
  const [nextBatchDate, setNextBatchDate] = useState(
    course?.next_batch_date || ""
  );
  const [sessionsCompleted, setSessionsCompleted] = useState(
    course?.sessions_completed || 0
  );
  const [sessionsRunning, setSessionsRunning] = useState(
    course?.sessions_running || 0
  );
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>(
    course?.learning_outcomes || []
  );
  const [prerequisites, setPrerequisites] = useState<string[]>(
    course?.prerequisites || []
  );
  const [syllabus, setSyllabus] = useState<SyllabusModule[]>(
    (course?.syllabus as SyllabusModule[]) || []
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    (course?.testimonials as Testimonial[]) || []
  );
  const [isPublished, setIsPublished] = useState(course?.is_published || false);
  const [featured, setFeatured] = useState(course?.featured || false);

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!course) {
      setSlug(generateSlug(value));
    }
  };

  // Syllabus helpers
  const addSyllabusModule = () => {
    setSyllabus([...syllabus, { title: "", topics: [] }]);
  };

  const updateSyllabusModule = (
    index: number,
    field: keyof SyllabusModule,
    value: string | string[]
  ) => {
    const updated = [...syllabus];
    updated[index] = { ...updated[index], [field]: value };
    setSyllabus(updated);
  };

  const removeSyllabusModule = (index: number) => {
    setSyllabus(syllabus.filter((_, i) => i !== index));
  };

  // Testimonial helpers
  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      { name: "", role: "", content: "", avatar: "" },
    ]);
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string
  ) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check slug uniqueness
    if (!slug) {
      setError("Slug is required");
      return;
    }

    try {
      const slugExists = await checkCourseSlugExists(slug, course?.id);
      if (slugExists) {
        setError("A course with this slug already exists. Please use a different title.");
        return;
      }
    } catch {
      setError("Failed to validate slug. Please try again.");
      return;
    }

    const formData: CourseFormData = {
      title,
      slug,
      description,
      long_description: longDescription,
      instructor,
      duration,
      skill_level: skillLevel,
      thumbnail_url: thumbnailUrl,
      location,
      price,
      currency,
      max_students: maxStudents,
      current_students: currentStudents,
      next_batch_date: nextBatchDate || null,
      sessions_completed: sessionsCompleted,
      sessions_running: sessionsRunning,
      learning_outcomes: learningOutcomes,
      prerequisites,
      syllabus,
      testimonials,
      is_published: isPublished,
      featured,
    };

    startTransition(async () => {
      try {
        if (course) {
          await updateCourse(course.id, formData);
        } else {
          await createCourse(formData);
        }
      } catch (err) {
        // Ignore NEXT_REDIRECT errors (these are expected when redirect() is called)
        if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
          return;
        }
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    disabled
                    className="bg-slate-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500">
                    Auto-generated from title
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="long_description">Long Description *</Label>
                <Textarea
                  id="long_description"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Course Thumbnail *</Label>
                <ImageUpload
                  value={thumbnailUrl}
                  onChange={(key) => setThumbnailUrl(key || "")}
                  folder={WASABI_FOLDERS.courses}
                  placeholder="Upload course thumbnail image"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor *</Label>
                  <Input
                    id="instructor"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 8 weeks"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="skill_level">Skill Level *</Label>
                  <Select value={skillLevel} onValueChange={(v) => setSkillLevel(v as typeof skillLevel)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Online / Kathmandu"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    min={0}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_students">Max Students</Label>
                  <Input
                    id="max_students"
                    type="number"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(Number(e.target.value))}
                    min={1}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="current_students">Current Students</Label>
                  <Input
                    id="current_students"
                    type="number"
                    value={currentStudents}
                    onChange={(e) => setCurrentStudents(Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessions_completed">Sessions Completed</Label>
                  <Input
                    id="sessions_completed"
                    type="number"
                    value={sessionsCompleted}
                    onChange={(e) => setSessionsCompleted(Number(e.target.value))}
                    min={0}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessions_running">Sessions Running</Label>
                  <Input
                    id="sessions_running"
                    type="number"
                    value={sessionsRunning}
                    onChange={(e) => setSessionsRunning(Number(e.target.value))}
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="next_batch_date">Next Batch Date</Label>
                <Input
                  id="next_batch_date"
                  type="date"
                  value={nextBatchDate}
                  onChange={(e) => setNextBatchDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Outcomes & Prerequisites</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DynamicListInput
                label="Learning Outcomes"
                value={learningOutcomes}
                onChange={setLearningOutcomes}
                placeholder="What students will learn..."
              />
              <DynamicListInput
                label="Prerequisites"
                value={prerequisites}
                onChange={setPrerequisites}
                placeholder="Required knowledge..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Syllabus</CardTitle>
              <Button type="button" onClick={addSyllabusModule} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {syllabus.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No modules added yet
                </p>
              ) : (
                syllabus.map((module, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg space-y-4 relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => removeSyllabusModule(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="space-y-2">
                      <Label>Module Title</Label>
                      <Input
                        value={module.title}
                        onChange={(e) =>
                          updateSyllabusModule(index, "title", e.target.value)
                        }
                        placeholder="Module title..."
                      />
                    </div>
                    <DynamicListInput
                      label="Topics"
                      value={module.topics}
                      onChange={(topics) =>
                        updateSyllabusModule(index, "topics", topics)
                      }
                      placeholder="Topic..."
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Testimonials</CardTitle>
              <Button type="button" onClick={addTestimonial} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {testimonials.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No testimonials added yet
                </p>
              ) : (
                testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg space-y-4 relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => removeTestimonial(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) =>
                            updateTestimonial(index, "name", e.target.value)
                          }
                          placeholder="Student name..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Input
                          value={testimonial.role || ""}
                          onChange={(e) =>
                            updateTestimonial(index, "role", e.target.value)
                          }
                          placeholder="e.g., Student"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) =>
                          updateTestimonial(index, "content", e.target.value)
                        }
                        placeholder="Testimonial content..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Avatar URL</Label>
                      <Input
                        value={testimonial.avatar || ""}
                        onChange={(e) =>
                          updateTestimonial(index, "avatar", e.target.value)
                        }
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Published</Label>
                  <p className="text-sm text-slate-500">
                    Make this course visible on the public site
                  </p>
                </div>
                <Switch checked={isPublished} onCheckedChange={setIsPublished} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Featured</Label>
                  <p className="text-sm text-slate-500">
                    Show this course in featured sections
                  </p>
                </div>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/courses")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : course ? (
            "Update Course"
          ) : (
            "Create Course"
          )}
        </Button>
      </div>
    </form>
  );
}
