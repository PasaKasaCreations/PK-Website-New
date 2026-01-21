import { jsPDF } from "jspdf";
import type { Tables } from "@/types/database.types";
import type { SyllabusItem } from "@/types/course.interface";

// Brand colors
const COLORS = {
  primary: [31, 60, 255] as [number, number, number], // #1f3cff
  orange: [249, 115, 22] as [number, number, number], // #f97316 - orange-500 for CTA
  dark: [15, 23, 42] as [number, number, number], // #0f172a - main text
  text: [51, 65, 85] as [number, number, number], // #334155 - body text
  muted: [100, 116, 139] as [number, number, number], // #64748b
  light: [241, 245, 249] as [number, number, number], // #f1f5f9
  border: [226, 232, 240] as [number, number, number], // #e2e8f0
  white: [255, 255, 255] as [number, number, number],
};

const COMPANY = {
  name: "Pasakasa Creations",
  tagline: "Building the Future of Gaming & Technology",
  website: "www.pasakasacreations.com",
  email: "contact@pasakasacreations.com",
  phone: "+977-986-2751805",
  location: "Kshitij Marg, Kathmandu, Nepal",
};

interface PDFPosition {
  y: number;
}

// Load and convert logo to base64
async function loadLogo(): Promise<string | null> {
  try {
    const response = await fetch("/logos/pk_long_Logo.webp");
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          } else {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function addHeader(
  doc: jsPDF,
  pos: PDFPosition,
  logoData: string | null,
): void {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Logo
  if (logoData) {
    doc.addImage(logoData, "PNG", 20, 8, 55, 20);
  } else {
    // Fallback text if logo fails
    doc.setTextColor(...COLORS.dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(COMPANY.name, 20, 18);
  }

  // Contact info - right side
  doc.setTextColor(...COLORS.text);
  doc.setFontSize(7);
  doc.text(COMPANY.website, pageWidth - 20, 14, { align: "right" });
  doc.text(COMPANY.email, pageWidth - 20, 19, { align: "right" });
  doc.text(COMPANY.phone, pageWidth - 20, 24, { align: "right" });

  // Separator line
  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(20, 32, pageWidth - 20, 32);

  pos.y = 42;
}

function addFooter(doc: jsPDF, pageNum: number, totalPages: number): void {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setDrawColor(...COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);

  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(6);
  doc.text(`© ${new Date().getFullYear()} ${COMPANY.name}`, 20, pageHeight - 8);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 20, pageHeight - 8, {
    align: "right",
  });
}

function addSection(doc: jsPDF, title: string, pos: PDFPosition): void {
  if (pos.y > doc.internal.pageSize.getHeight() - 30) {
    doc.addPage();
    pos.y = 20;
  }

  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(title, 20, pos.y);
  pos.y += 6;
}

function addText(
  doc: jsPDF,
  text: string,
  pos: PDFPosition,
  maxWidth: number,
): void {
  if (pos.y > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage();
    pos.y = 20;
  }

  doc.setTextColor(...COLORS.text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, 20, pos.y);
  pos.y += lines.length * 4 + 4;
}

function addBulletList(doc: jsPDF, items: string[], pos: PDFPosition): void {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setTextColor(...COLORS.text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  items.forEach((item) => {
    if (pos.y > doc.internal.pageSize.getHeight() - 15) {
      doc.addPage();
      pos.y = 20;
    }

    doc.setFillColor(...COLORS.dark);
    doc.circle(23, pos.y - 1, 1, "F");

    const lines = doc.splitTextToSize(item, pageWidth - 50);
    doc.text(lines, 28, pos.y);
    pos.y += lines.length * 4 + 2;
  });

  pos.y += 3;
}

function addSyllabus(
  doc: jsPDF,
  syllabus: SyllabusItem[],
  pos: PDFPosition,
): void {
  const pageWidth = doc.internal.pageSize.getWidth();

  syllabus.forEach((module, index) => {
    if (pos.y > doc.internal.pageSize.getHeight() - 25) {
      doc.addPage();
      pos.y = 20;
    }

    doc.setTextColor(...COLORS.dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(`${index + 1}. ${module.title}`, 20, pos.y);
    pos.y += 5;

    doc.setTextColor(...COLORS.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    module.topics?.forEach((topic) => {
      if (pos.y > doc.internal.pageSize.getHeight() - 15) {
        doc.addPage();
        pos.y = 20;
      }

      const lines = doc.splitTextToSize(`• ${topic}`, pageWidth - 50);
      doc.text(lines, 25, pos.y);
      pos.y += lines.length * 3.5 + 1;
    });

    pos.y += 3;
  });
}

export async function generateCoursePDF(
  course: Tables<"courses">,
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pos: PDFPosition = { y: 0 };

  // Load logo
  const logoData = await loadLogo();

  addHeader(doc, pos, logoData);

  // Course Title
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  const titleLines = doc.splitTextToSize(course.title, pageWidth - 40);
  doc.text(titleLines, 20, pos.y);
  pos.y += titleLines.length * 6 + 5;

  // Quick info bar
  doc.setFillColor(...COLORS.light);
  doc.roundedRect(20, pos.y - 2, pageWidth - 40, 8, 1, 1, "F");

  doc.setTextColor(...COLORS.text);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Duration: ${course.duration}`, 25, pos.y + 3);
  doc.text(`Location: ${course.location}`, 80, pos.y + 3);
  if (course.max_students) {
    doc.text(`Max ${course.max_students} students`, pageWidth - 25, pos.y + 3, {
      align: "right",
    });
  }
  pos.y += 14;

  // Next batch
  if (course.next_batch_date) {
    doc.setTextColor(...COLORS.dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    const batchDate = new Date(course.next_batch_date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
    doc.text(`Next Batch: ${batchDate}`, 20, pos.y);
    pos.y += 8;
  }

  // About
  addSection(doc, "About This Course", pos);
  addText(doc, course.description, pos, pageWidth - 40);

  if (course.long_description) {
    addText(doc, course.long_description, pos, pageWidth - 40);
  }

  // Learning Outcomes
  if (course.learning_outcomes?.length > 0) {
    addSection(doc, "What You Will Learn", pos);
    addBulletList(doc, course.learning_outcomes, pos);
  }

  // Prerequisites
  if (course.prerequisites?.length > 0) {
    addSection(doc, "Prerequisites", pos);
    addBulletList(doc, course.prerequisites, pos);
  }

  // Syllabus
  const syllabus = course.syllabus as SyllabusItem[] | null;
  if (syllabus && syllabus.length > 0) {
    addSection(doc, "Course Syllabus", pos);
    addSyllabus(doc, syllabus, pos);
  }

  // Contact CTA - Minimal Line (Top Line variant)
  if (pos.y > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage();
    pos.y = 20;
  }

  pos.y += 10;

  // Black top line
  doc.setDrawColor(...COLORS.dark);
  doc.setLineWidth(1);
  doc.line(20, pos.y, pageWidth - 20, pos.y);

  // Title
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Ready to Enroll?", 20, pos.y + 10);

  // Contact info
  doc.setTextColor(...COLORS.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(
    `${COMPANY.email}  •  ${COMPANY.phone}  •  ${COMPANY.website}`,
    20,
    pos.y + 18,
  );

  // Footers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save(`${course.slug || "course"}-details.pdf`);
}

export async function generateAllCoursesPDF(
  courses: Tables<"courses">[],
): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pos: PDFPosition = { y: 0 };

  // Load logo
  const logoData = await loadLogo();

  addHeader(doc, pos, logoData);

  // Title
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Course Catalog", 20, pos.y);
  pos.y += 6;

  doc.setTextColor(...COLORS.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`${courses.length} courses available`, 20, pos.y);
  pos.y += 10;

  // Courses
  courses.forEach((course, index) => {
    if (pos.y > doc.internal.pageSize.getHeight() - 35) {
      doc.addPage();
      pos.y = 20;
    }

    // Card
    doc.setFillColor(...COLORS.light);
    doc.roundedRect(20, pos.y - 2, pageWidth - 40, 28, 2, 2, "F");

    // Left accent
    doc.setFillColor(...COLORS.dark);
    doc.rect(20, pos.y - 2, 2, 28, "F");

    // Number
    doc.setTextColor(...COLORS.muted);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text(`${String(index + 1).padStart(2, "0")}`, 26, pos.y + 4);

    // Title
    doc.setTextColor(...COLORS.dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(
      course.title.substring(0, 50) + (course.title.length > 50 ? "..." : ""),
      36,
      pos.y + 4,
    );

    // Meta
    doc.setTextColor(...COLORS.text);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(`${course.duration} • ${course.location}`, 36, pos.y + 10);

    // Description
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(7);
    const desc =
      course.description.substring(0, 100) +
      (course.description.length > 100 ? "..." : "");
    doc.text(desc, 36, pos.y + 16);

    pos.y += 34;
  });

  // Contact CTA - Minimal Line (Top Line variant)
  if (pos.y > doc.internal.pageSize.getHeight() - 40) {
    doc.addPage();
    pos.y = 20;
  }

  pos.y += 10;

  // Black top line
  doc.setDrawColor(...COLORS.dark);
  doc.setLineWidth(1);
  doc.line(20, pos.y, pageWidth - 20, pos.y);

  // Title
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Interested? Contact us!", 20, pos.y + 10);

  // Contact info
  doc.setTextColor(...COLORS.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`${COMPANY.email}  •  ${COMPANY.phone}`, 20, pos.y + 18);

  // Footers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(doc, i, totalPages);
  }

  doc.save("pasakasa-course-catalog.pdf");
}
