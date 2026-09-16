import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const title = "Admin Sign In | Flipaholics SA";
const description = "Private sign-in for the Flipaholics SA team to manage projects and enquiries.";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AuthPage,
});

const fieldClass =
  "w-full border-b border-input bg-transparent px-1 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent";
const labelClass = "block text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim().toLowerCase();
    const password = String(data.get("password") ?? "");

    setBusy(true);
    setError("");

    const { error: authError } =
      mode === "signup"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
        : await supabase.auth.signInWithPassword({ email, password });

    setBusy(false);

    if (authError) {
      setError(authError.message);
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-20">
      <p className="script gold-text text-5xl">Private</p>
      <h1 className="mt-2 text-3xl font-medium">
        Studio <em className="italic">admin</em>
      </h1>
      <form onSubmit={onSubmit} className="mt-8 grid gap-6 border border-border bg-card p-6 sm:p-8">
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@email.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className={fieldClass}
            placeholder="••••••••"
          />
        </div>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="bg-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
        >
          {busy ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode(mode === "signup" ? "signin" : "signup");
            setError("");
          }}
          className="link-gold text-xs uppercase tracking-[0.22em] text-muted-foreground"
        >
          {mode === "signup" ? "I already have an account" : "Create an account"}
        </button>
      </form>
    </div>
  );
}
