import { useEffect } from "react";

export interface RouteMeta {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
}

const defaults: RouteMeta = {
  title: "TITAN Build Co. | Commercial Construction, Done Right.",
  description: "Industrial construction since 1998. Commercial, healthcare, industrial, and residential construction across the Southeast.",
  ogImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop",
  ogType: "website",
};

export function useRouteMeta(meta: RouteMeta) {
  useEffect(() => {
    const title = meta.title ? `${meta.title} | Titan Build Co.` : defaults.title;
    document.title = title;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null;
      }
      if (el) {
        el.setAttribute("content", content);
      }
    };

    setMeta("description", meta.description ?? defaults.description ?? "");
    setMeta("og:title", title);
    setMeta("og:description", meta.description ?? defaults.description ?? "");
    setMeta("og:image", meta.ogImage ?? defaults.ogImage ?? "");
    setMeta("og:type", meta.ogType ?? defaults.ogType ?? "website");
    setMeta("twitter:title", title);
    setMeta("twitter:description", meta.description ?? defaults.description ?? "");
    setMeta("twitter:image", meta.ogImage ?? defaults.ogImage ?? "");
  }, [meta.title, meta.description, meta.ogImage, meta.ogType]);
}