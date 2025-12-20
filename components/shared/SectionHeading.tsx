import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  gradient?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = false,
  gradient = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", centered && "text-center", className)}>
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight",
          gradient && "gradient-text"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
