import { useState } from "react";
import { DialogRoot, DialogTrigger, DialogContent, DialogClose } from "../primitives/Dialog";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageLightbox({ src, alt, className }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogTrigger className={className} aria-haspopup="dialog">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover cursor-zoom-in hover:opacity-90 transition-opacity"
        />
      </DialogTrigger>
      <DialogContent className="!p-2 !max-w-5xl !bg-steel-950">
        <DialogClose className="!relative !top-0 !right-0 !absolute top-4 right-4 z-10" aria-label="Close lightbox">&times;</DialogClose>
        <img src={src} alt={alt} className="w-full h-auto rounded" />
      </DialogContent>
    </DialogRoot>
  );
}