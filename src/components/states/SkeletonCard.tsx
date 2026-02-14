import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface border border-border overflow-hidden",
        className,
      )}
    >
      {/* Image placeholder */}
      <div className="h-48 w-full bg-border animate-pulse" />

      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 w-3/4 rounded-lg bg-border animate-pulse" />
        {/* Description lines */}
        <div className="h-3 w-full rounded-lg bg-border animate-pulse" />
        <div className="h-3 w-5/6 rounded-lg bg-border animate-pulse" />
        {/* Tags */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-full bg-border animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-border animate-pulse" />
          <div className="h-6 w-14 rounded-full bg-border animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
