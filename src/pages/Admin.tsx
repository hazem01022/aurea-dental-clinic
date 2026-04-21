import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutGrid, Images, MessageSquareQuote, LogOut, ExternalLink } from "lucide-react";
import HeroAdmin from "@/components/admin/HeroAdmin";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import BeforeAfterAdmin from "@/components/admin/BeforeAfterAdmin";
import ReviewsAdmin from "@/components/admin/ReviewsAdmin";

const TABS = [
  { id: "hero", label: "Hero", icon: Sparkles, hint: "Headline, subheadline & cover image" },
  { id: "services", label: "Services", icon: LayoutGrid, hint: "Treatments offered by the clinic" },
  { id: "before-after", label: "Before & After", icon: Images, hint: "Patient transformation gallery" },
  { id: "reviews", label: "Reviews", icon: MessageSquareQuote, hint: "Patient testimonials" },
] as const;

const Admin = () => {
  const { ready, isAdmin } = useAdminGuard();
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("hero");

  if (!ready)
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground bg-cream">
        Loading…
      </main>
    );

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-cream">
        <h1 className="font-serif text-4xl">Not authorized</h1>
        <p className="text-muted-foreground">Your account does not have admin access.</p>
        <Button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate("/auth");
          }}
        >
          Sign out
        </Button>
      </main>
    );
  }

  const active = TABS.find((t) => t.id === tab)!;

  return (
    <main className="min-h-screen bg-cream">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-72 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-border bg-background/60 backdrop-blur">
          <div className="p-8 border-b border-border">
            <p className="text-[10px] tracking-luxe uppercase text-muted-foreground mb-2">
              Aurea Studio
            </p>
            <h1 className="font-serif text-3xl leading-tight">
              Content <span className="italic text-gold">Suite</span>
            </h1>
          </div>

          <nav className="p-4 space-y-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-sm transition-all duration-300 group ${
                    isActive
                      ? "bg-foreground text-background shadow-soft"
                      : "hover:bg-cream-deep text-foreground"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 mt-1 flex-shrink-0 ${
                      isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"
                    }`}
                  />
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{t.label}</span>
                    <span
                      className={`block text-[11px] mt-0.5 ${
                        isActive ? "text-background/60" : "text-muted-foreground"
                      }`}
                    >
                      {t.hint}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 mt-4 border-t border-border space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/")}
            >
              <ExternalLink className="w-4 h-4" /> View live site
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/auth");
              }}
            >
              <LogOut className="w-4 h-4" /> Sign out
            </Button>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1 min-w-0">
          <header className="px-6 md:px-12 py-8 md:py-10 border-b border-border bg-background">
            <p className="text-[10px] tracking-luxe uppercase text-gold mb-2">
              {active.label}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">
              Manage your <span className="italic text-gold">{active.label.toLowerCase()}</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">{active.hint}</p>
          </header>

          <div className="px-6 md:px-12 py-10 md:py-14">
            {tab === "hero" && <HeroAdmin />}
            {tab === "services" && <ServicesAdmin />}
            {tab === "before-after" && <BeforeAfterAdmin />}
            {tab === "reviews" && <ReviewsAdmin />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
