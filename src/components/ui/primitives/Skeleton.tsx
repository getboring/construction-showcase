import { cn } from "../../../lib/cn";

interface SkeletonProps extends React.ComponentProps<"div"> {
  width?: string;
  height?: string;
}

export function Skeleton({ width, height, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-steel-800",
        className,
      )}
      style={{ width, height }}
      {...props}
    />
  );
}