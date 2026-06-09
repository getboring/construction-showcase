import { Avatar as BaseAvatar } from "@base-ui/react";
import { cn } from "../../../lib/cn";

interface AvatarNativeProps {
  src?: string | null;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

export function AvatarNative({ src, alt, initials, size = "md", className }: AvatarNativeProps) {
  return (
    <BaseAvatar.Root className={cn("relative inline-flex rounded-full overflow-hidden flex-shrink-0", sizeMap[size], className)}>
      <BaseAvatar.Image
        src={src ?? undefined}
        alt={alt ?? initials ?? "User avatar"}
        className="w-full h-full object-cover rounded-full"
      />
      <BaseAvatar.Fallback
        className="w-full h-full flex items-center justify-center bg-steel-800 border border-steel-700 rounded-full font-mono font-medium text-amber-500 uppercase tracking-wider"
        delay={300}
      >
        {initials ?? "?"}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  );
}