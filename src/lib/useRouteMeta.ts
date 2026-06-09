import { useEffect } from "react";

const SITE_URL = "https://titanbuild.co";

export interface RouteMeta {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
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
      let el: HTMLMetaElement | null = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.querySelector(`meta[name="${property}"]`);
      }
      if (el) {
        el.setAttribute("content", content);
      }
    };

    const setCanonical = (href: string) => {
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = href;
    };

    const ogImage = meta.ogImage ?? defaults.ogImage!;
    const description = meta.description ?? defaults.description ?? "";
    const url = meta.canonicalPath ? `${SITE_URL}${meta.canonicalPath}` : `${SITE_URL}${window.location.pathname}`;

    setCanonical(url);
    setMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", ogImage);
    setMeta("og:url", url);
    setMeta("og:type", meta.ogType ?? defaults.ogType ?? "website");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
  }, [meta.title, meta.description, meta.ogImage, meta.ogType, meta.canonicalPath]);
}