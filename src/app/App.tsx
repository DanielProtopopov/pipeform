import * as React from "react";
import { useState } from "react";
import {
  Mail,
  ShieldCheck,
  Upload,
  Webhook,
  Plug,
  LayoutDashboard,
  CornerDownRight,
  Lock,
  Code2,
  BarChart2,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

const FEATURES = [
  {
    id: "email-notifications",
    icon: Mail,
    title: "Email Notifications",
    description:
      "Instant submission alerts delivered to your inbox with fully customizable HTML templates and CC support for up to five recipients.",
  },
  {
    id: "spam-protection",
    icon: ShieldCheck,
    title: "Spam Protection",
    description:
      "Multi-layer defense: reCAPTCHA v3, hCaptcha, Cloudflare Turnstile, and invisible honeypot fields — stop bots before they reach your inbox.",
  },
  {
    id: "file-uploads",
    icon: Upload,
    title: "File Uploads",
    description:
      "Accept attachments up to 25 MB per submission across 50+ MIME types. Files are stored encrypted with configurable retention policies.",
  },
  {
    id: "webhooks",
    icon: Webhook,
    title: "Webhooks",
    description:
      "Real-time JSON payloads forwarded to any endpoint the moment a form is submitted. Automatic retry with exponential backoff on failure.",
  },
  {
    id: "integrations",
    icon: Plug,
    title: "Third-party Integrations",
    description:
      "Native connectors for Slack, Discord, Google Sheets, Zapier, and Make — route submissions into your existing workflow without code.",
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Submission Dashboard",
    description:
      "Search, filter, star, and annotate every submission. Export full history as CSV or JSON at any time for offline analysis.",
  },
  {
    id: "redirects",
    icon: CornerDownRight,
    title: "Redirects & Autoresponders",
    description:
      "Send visitors to any URL after submission and fire branded confirmation emails with dynamic placeholders from your own domain.",
  },
  {
    id: "gdpr",
    icon: Lock,
    title: "GDPR Compliance",
    description:
      "Built-in consent tracking, IP anonymization, data export, and one-click deletion. Hosted on AWS EU (Ireland) — stay compliant by default.",
  },
  {
    id: "multi-framework",
    icon: Code2,
    title: "Multi-framework Support",
    description:
      "Drop a single endpoint URL into any HTML form. Works seamlessly with React, Next.js, Vue, Svelte, Webflow, or plain HTML — no SDK required.",
  },
  {
    id: "analytics",
    icon: BarChart2,
    title: "Form Analytics",
    description:
      "Track submission volume, bounce rates, device breakdowns, and UTM attribution. Automatic capture of gclid and fbclid ad click IDs.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Point your form at us",
    body: "Set your form's action to your unique endpoint URL. Works with any form tag, fetch call, or framework.",
    code: '<form action="https://api.pipeform.dev/f/your-key" method="POST">',
  },
  {
    number: "02",
    title: "Submissions land in your dashboard",
    body: "Every field, file, and metadata is captured, stored, and instantly searchable — no database setup on your end.",
    code: undefined,
  },
  {
    number: "03",
    title: "Route data wherever you need it",
    body: "Email, Slack, webhooks, Google Sheets — configure destinations once and let every submission flow through automatically.",
    code: undefined,
  },
];

export default function App() {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleFeature(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formIdDiv = form.querySelector('div[data-apiforms-id]');
    const formId = formIdDiv?.getAttribute('data-apiforms-id') || "";

    const formDataObj: Record<string, any> = {email: email};

    FEATURES.forEach(f => {
      const alt = f.title.toLowerCase().replace(/\s+/g, "-");
      formDataObj[alt] = checked.has(f.id);
    });

    // Display thank-you immediately
    setSubmitted(true);

   try {
       const response = fetch(form.action, {
         method: "POST",
         headers: {"Content-Type": "application/json","Accept": "application/json"},
         body: JSON.stringify({formId,formData: formDataObj}),
       });
     } catch (error) {
       console.error("Submission error:", error);
     }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'Figtree', sans-serif" }}
    >
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="text-xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Pipe<span className="text-accent">Form</span>
          </span>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <button
              onClick={() => scrollTo("features")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              How it works
            </button>
            <button
              onClick={() => scrollTo("waitlist")}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Waitlist
            </button>
          </nav>

          <button
            onClick={() => scrollTo("waitlist")}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Join Waitlist <ArrowRight size={14} />
          </button>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 text-sm">
            <button
              onClick={() => scrollTo("features")}
              className="text-left text-muted-foreground hover:text-foreground"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo("how-it-works")}
              className="text-left text-muted-foreground hover:text-foreground"
            >
              How it works
            </button>
            <button
              onClick={() => scrollTo("waitlist")}
              className="text-left text-muted-foreground hover:text-foreground"
            >
              Waitlist
            </button>
            <button
              onClick={() => scrollTo("waitlist")}
              className="w-full text-center px-4 py-2 rounded-md bg-accent text-accent-foreground font-semibold"
            >
              Join Waitlist
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-40 pb-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-8"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Lead to inbox. Done.
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Never lose
            <br />
            <span className="text-accent">another lead.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            PipeForm sends every form submission and button click straight to
            your inbox. No backend needed.
            <br /> Just drop a single API endpoint into
            any HTML form or JavaScript and ship in minutes, not sprints.
          </p>

          <div
            className="mb-10 bg-card border border-border rounded-lg px-5 py-4 text-sm overflow-x-auto"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-muted-foreground select-none mr-3">{">"}</span>
            <span className="text-accent">{"<form"}</span>
            <span className="text-secondary"> action</span>
            <span className="text-foreground/40">{"="}</span>
            <span className="text-amber-400/90">
              {'"https://api.pipeform.dev/f/'}
              <span className="text-accent">your-key</span>
              {'"'}
            </span>
            <span className="text-accent">{" method"}</span>
            <span className="text-foreground/40">{"="}</span>
            <span className="text-amber-400/90">{'"POST"'}</span>
            <span className="text-accent">{">"}</span>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => scrollTo("waitlist")}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Join Waitlist <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="flex items-center gap-2 px-6 py-3 rounded-md border border-border text-foreground text-sm hover:border-primary/40 transition-colors cursor-pointer"
            >
              See features ↓
            </button>
          </div>

          <p
            className="mt-8 text-xs text-muted-foreground"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            200+ developers on the waitlist
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs text-accent mb-3 tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            How it works
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-16 max-w-lg leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Live in three steps.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
            {STEPS.map((step) => (
              <div key={step.number} className="bg-background p-8">
                <span
                  className="block text-4xl font-bold text-accent mb-4 leading-none"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {step.number}
                </span>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {step.body}
                </p>
                {step.code && (
                  <div
                    className="bg-card border border-border rounded px-3 py-2 text-xs text-accent/80 overflow-x-auto"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {step.code}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Features */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs text-accent mb-3 tracking-widest uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Features
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 max-w-lg leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Everything you need to handle forms at scale.
          </h2>
          <p className="text-muted-foreground mb-16 max-w-xl text-sm leading-relaxed">
            Researched from the best tools in the space — StaticForms,
            Formspree, Web3Forms, Forminit, APIForms, Formbricks — and built
            into one clean API.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  className="bg-background p-8 group hover:bg-card transition-colors duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 w-9 h-9 flex items-center justify-center rounded-md border border-border bg-card group-hover:border-accent/30 group-hover:bg-accent/5 transition-colors duration-200 shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <h3
                        className="font-semibold mb-2 text-foreground"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}
                      >
                        {f.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* And many others */}
          <div className="mt-px bg-border rounded-b-lg overflow-hidden">
            <div className="bg-background px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent"
                      style={{ opacity: 1 - i * 0.15 }}
                    />
                  ))}
                </div>
                <p
                  className="text-sm font-semibold text-foreground"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  And many others — this is just the beginning.
                </p>
              </div>
              <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
                Custom domain sending, multi-step forms, server-side validation,
                domain restrictions, team workspaces, and more are on the
                roadmap. Tell us what you need most in the waitlist form below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Waitlist */}
      <section id="waitlist" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p
              className="text-xs text-accent mb-3 tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Early access
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Be first to know when we launch.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {"We're building PipeForm in public. Leave your email and tell us which features matter most — your input directly shapes what we build first."}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "No credit card required to get early access",
                "Launch pricing locked in for waitlist members",
                "Direct line to the founding team",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {submitted ? (
              <div className="bg-card border border-border rounded-xl p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={24} className="text-accent" />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {"You're on the list!"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {"We'll notify you at "}
                  <span className="text-foreground font-medium">{email}</span>
                  {" the moment PipeForm is ready. Thank you for your interest."}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-xl p-8 space-y-6"
                action="https://apiforms.com/api/forms/submit"
              >
              <div data-apiforms-id="XcAmlRrMLQu3NyhKnPcT"></div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Your email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 rounded-md bg-input-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium mb-3">
                    What matters most to you?
                    <span className="text-muted-foreground font-normal ml-1">
                      (select all that apply)
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {FEATURES.map((f) => {
                      const isChecked = checked.has(f.id);
                      return (
                        <label
                          key={f.id}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-sm cursor-pointer transition-colors duration-150 ${
                            isChecked
                              ? "border-accent/50 bg-accent/5 text-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-border/60 hover:text-foreground"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name="features"
                            value={f.id}
                            checked={isChecked}
                            onChange={() => toggleFeature(f.id)}
                            className="accent-primary w-3.5 h-3.5 shrink-0"
                          />
                          <span className="truncate">
                            {f.title}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Notify me when we launch <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span
            className="font-bold text-base text-foreground"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            Pipe<span className="text-accent">Form</span>
          </span>
          <p className="text-xs">
            &copy; {new Date().getFullYear()} PipeForm. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>

      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  );
}
