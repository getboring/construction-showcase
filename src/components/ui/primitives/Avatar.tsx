import { cn } from "../../../lib/cn";

interface AvatarProps extends React.ComponentProps<"div"> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({ src, alt, initials, size = "md", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden flex items-center justify-center bg-steel-800 border border-steel-700 flex-shrink-0",
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? initials ?? "User avatar"} loading="lazy" width={40} height={40} className="w-full h-full object-cover" />
      ) : (
        <span className="font-mono font-medium text-amber-500 uppercase tracking-wider">
          {initials ?? "?"}
        </span>
      )}
    </div>
  );
}