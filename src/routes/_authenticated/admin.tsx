import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/useAdminSession";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Flipaholics SA" },
      { name: "description", content: "Manage Flipaholics SA projects, admins and enquiries." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const BUCKET = "site-media";

const fieldClass =
  "w-full border-b border-input bg-transparent px-1 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";
const labelClass = "block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground";
const btnClass =
  "bg-foreground px-7 py-3 text-xs uppercase tracking-[0.28em] text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60";
const ghostBtn =
  "border border-border px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent";

type Tab = "projects" | "admins" | "enquiries";

function AdminPage() {
  const { isAdmin, loading, session } = useAdminSession();
  const [tab, setTab] = useState<Tab>("projects");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (loading) {
    return <div className="mx-auto max-w-5xl px-5 py-24 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <p className="script gold-text text-5xl">Hold on</p>
        <h1 className="mt-2 text-2xl font-medium">This account isn't an admin</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Ask an existing admin to add {session?.user.email} to the admin list, then sign in again.
        </p>
        <button type="button" onClick={signOut} className={`${ghostBtn} mt-6`}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="script gold-text text-5xl">Studio</p>
          <h1 className="mt-1 text-3xl font-medium">
            Website <em className="italic">admin</em>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{session?.user.email}</span>
          <button type="button" onClick={signOut} className={ghostBtn}>
            Sign out
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-2 border-b border-border">
        {(
          [
            ["projects", "Projects"],
            ["admins", "Admins"],
            ["enquiries", "Enquiries"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-5 py-3 text-[0.65rem] uppercase tracking-[0.26em] transition-colors ${
              tab === key ? "border-b-2 border-accent text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "projects" ? <ProjectsPanel /> : null}
        {tab === "admins" ? <AdminsPanel /> : null}
        {tab === "enquiries" ? <EnquiriesPanel /> : null}
      </div>
    </div>
  );
}

function ProjectsPanel() {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error: e } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (e) throw e;
      return data;
    },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin-projects"] });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("file") as File | null;
    const urlInput = String(data.get("media_url") ?? "").trim();

    setError("");
    if (!file?.size && !urlInput) {
      setError("Add a photo or video file, or paste a media link.");
      return;
    }

    setBusy(true);
    let mediaUrl = urlInput;
    let mediaType = urlInput.match(/\.(mp4|mov|webm)$/i) ? "video" : "image";

    if (file && file.size > 0) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `projects/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (upErr) {
        setBusy(false);
        setError(`Upload failed: ${upErr.message}`);
        return;
      }
      mediaUrl = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      mediaType = file.type.startsWith("video") ? "video" : "image";
    }

    const { error: insertErr } = await supabase.from("projects").insert({
      title: String(data.get("title") ?? "").trim(),
      caption: String(data.get("caption") ?? "").trim() || null,
      description: String(data.get("description") ?? "").trim() || null,
      media_url: mediaUrl,
      media_type: mediaType,
      wide: data.get("wide") === "on",
      published: true,
      sort_order: Number(data.get("sort_order") ?? 0) || 0,
    });

    setBusy(false);
    if (insertErr) {
      setError(insertErr.message);
      return;
    }
    form.reset();
    void refresh();
  }

  async function togglePublished(id: string, published: boolean) {
    await supabase.from("projects").update({ published: !published }).eq("id", id);
    void refresh();
  }

  async function remove(id: string) {
    await supabase.from("projects").delete().eq("id", id);
    void refresh();
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={onSubmit} className="grid gap-6 border border-border bg-card p-6">
        <h2 className="text-xl font-medium">Add a project</h2>
        <div>
          <label className={labelClass} htmlFor="title">
            Title *
          </label>
          <input id="title" name="title" required className={fieldClass} placeholder="Kitchen in Midstream" />
        </div>
        <div>
          <label className={labelClass} htmlFor="caption">
            Short caption
          </label>
          <input id="caption" name="caption" className={fieldClass} placeholder="Backlit glass cabinetry" />
        </div>
        <div>
          <label className={labelClass} htmlFor="description">
            Description
          </label>
          <textarea id="description" name="description" rows={3} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="file">
            Photo or video
          </label>
          <input id="file" name="file" type="file" accept="image/*,video/*" className={`${fieldClass} file:mr-3 file:border-0 file:bg-transparent file:text-xs`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="media_url">
            …or paste a media link
          </label>
          <input id="media_url" name="media_url" className={fieldClass} placeholder="https://…" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            <input type="checkbox" name="wide" className="accent-current" /> Wide tile
          </label>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Order
            <input type="number" name="sort_order" defaultValue={0} className="w-16 border-b border-input bg-transparent py-1 text-center text-foreground outline-none" />
          </label>
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button type="submit" disabled={busy} className={btnClass}>
          {busy ? "Saving…" : "Add project"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Projects ({projects.length})</h2>
        {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
        {projects.map((p) => (
          <div key={p.id} className="flex items-center gap-4 border border-border bg-card p-3">
            <div className="h-16 w-20 shrink-0 overflow-hidden bg-muted">
              {p.media_type === "video" ? (
                <video src={p.media_url} muted playsInline className="h-full w-full object-cover" />
              ) : (
                <img src={p.media_url} alt={p.title} className="h-full w-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{p.title}</p>
              <p className="truncate text-xs text-muted-foreground">{p.caption ?? p.media_type}</p>
            </div>
            <button type="button" onClick={() => togglePublished(p.id, p.published)} className={ghostBtn}>
              {p.published ? "Hide" : "Show"}
            </button>
            <button type="button" onClick={() => remove(p.id)} className={`${ghostBtn} text-destructive`}>
              Delete
            </button>
          </div>
        ))}
        {!isLoading && projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet — add your first one.</p>
        ) : null}
      </div>
    </div>
  );
}

function AdminsPanel() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const { data: emails = [] } = useQuery({
    queryKey: ["admin-emails"],
    queryFn: async () => {
      const { data, error: e } = await supabase
        .from("admin_emails")
        .select("*")
        .order("created_at", { ascending: true });
      if (e) throw e;
      return data;
    },
  });

  async function add(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "")
      .trim()
      .toLowerCase();
    if (!email) return;
    setBusy(true);
    setError("");
    const { error: insertErr } = await supabase.from("admin_emails").insert({ email });
    setBusy(false);
    if (insertErr) {
      setError(insertErr.message);
      return;
    }
    form.reset();
    void queryClient.invalidateQueries({ queryKey: ["admin-emails"] });
  }

  async function remove(email: string) {
    await supabase.from("admin_emails").delete().eq("email", email);
    void queryClient.invalidateQueries({ queryKey: ["admin-emails"] });
  }

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <form onSubmit={add} className="grid gap-6 border border-border bg-card p-6">
        <h2 className="text-xl font-medium">Add an admin</h2>
        <p className="text-sm text-muted-foreground">
          Add the email address first. When that person creates an account with it, they get admin
          access straight away.
        </p>
        <div>
          <label className={labelClass} htmlFor="admin-email">
            Email
          </label>
          <input id="admin-email" name="email" type="email" required className={fieldClass} placeholder="name@email.com" />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button type="submit" disabled={busy} className={btnClass}>
          {busy ? "Adding…" : "Add admin"}
        </button>
      </form>

      <div className="space-y-3">
        <h2 className="text-xl font-medium">Admin emails ({emails.length})</h2>
        {emails.map((a) => (
          <div key={a.email} className="flex items-center justify-between gap-4 border border-border bg-card px-4 py-3">
            <span className="truncate text-sm">{a.email}</span>
            <button type="button" onClick={() => remove(a.email)} className={`${ghostBtn} text-destructive`}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnquiriesPanel() {
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error: e } = await supabase
        .from("consultation_bookings")
        .select("*")
        .order("created_at", { ascending: false });
      if (e) throw e;
      return data;
    },
  });

  const count = useMemo(() => bookings.length, [bookings]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">Consultation requests ({count})</h2>
      {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
      {bookings.map((b) => (
        <div key={b.id} className="border border-border bg-card p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-base font-medium">{b.full_name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(b.created_at).toLocaleDateString("en-ZA")}
            </p>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] gold-text">{b.service}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {b.email} · {b.phone}
            {b.area ? ` · ${b.area}` : ""}
            {b.budget ? ` · ${b.budget}` : ""}
            {b.preferred_date ? ` · prefers ${b.preferred_date}` : ""}
          </p>
          {b.message ? <p className="mt-3 text-sm leading-relaxed">{b.message}</p> : null}
        </div>
      ))}
      {!isLoading && count === 0 ? (
        <p className="text-sm text-muted-foreground">No enquiries yet.</p>
      ) : null}
    </div>
  );
}
