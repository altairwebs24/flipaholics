import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gallery, type GalleryItem } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { supabase } from "@/integrations/supabase/client";

function useProjectItems(): GalleryItem[] {
  const { data } = useQuery({
    queryKey: ["published-projects"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("projects")
        .select("title, caption, media_url, media_type, wide, published, sort_order, created_at")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows;
    },
  });

  return (data ?? []).map((p) => ({
    type: p.media_type === "video" ? "video" : "image",
    src: p.media_url,
    title: p.title,
    caption: p.caption ?? "",
    wide: p.wide,
  }));
}

function Media({ item, active }: { item: GalleryItem; active: boolean }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        muted
        loop
        playsInline
        autoPlay={active}
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
      />
    );
  }
  return (
    <img
      src={item.src}
      alt={`${item.title} — ${item.caption}`}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
    />
  );
}

export function Gallery() {
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const items = [...useProjectItems(), ...gallery];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal
            key={item.src}
            delay={i * 70}
            className={item.wide ? "sm:col-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setOpen(item)}
              className="group relative block h-full w-full overflow-hidden border border-border bg-card text-left"
            >
              <div className={item.wide ? "aspect-[16/10]" : "aspect-[4/5]"}>
                <Media item={item} active />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent p-5">
                <p className="script text-3xl text-background">{item.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-background/75">
                  {item.caption}
                </p>
              </div>
              <span className="pointer-events-none absolute inset-3 border border-accent/0 transition-colors duration-500 group-hover:border-accent/70" />
            </button>
          </Reveal>
        ))}
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 border border-accent/50 px-4 py-2 text-xs uppercase tracking-[0.25em] text-background hover:bg-accent hover:text-accent-foreground"
          >
            Close
          </button>
          <div
            className="max-h-[86vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {open.type === "video" ? (
              <video
                src={open.src}
                controls
                autoPlay
                loop
                playsInline
                className="max-h-[86vh] w-full object-contain"
              />
            ) : (
              <img
                src={open.src}
                alt={`${open.title} — ${open.caption}`}
                className="max-h-[86vh] w-full object-contain"
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
