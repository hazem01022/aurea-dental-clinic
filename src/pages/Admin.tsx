import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import HeroAdmin from "@/components/admin/HeroAdmin";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import BeforeAfterAdmin from "@/components/admin/BeforeAfterAdmin";
import ReviewsAdmin from "@/components/admin/ReviewsAdmin";

const Admin = () => {
  const { ready, isAdmin } = useAdminGuard();
  const navigate = useNavigate();
  const [tab, setTab] = useState("hero");

  if (!ready) return <main className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</main>;

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-serif text-3xl">Not authorized</h1>
        <p className="text-muted-foreground">Your account is not an admin.</p>
        <Button onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>Sign out</Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container py-6 flex justify-between items-center">
          <h1 className="font-serif text-3xl">Aurea <span className="italic text-gold">CMS</span></h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>View site</Button>
            <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); navigate("/auth"); }}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-10">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="before-after">Before & After</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="hero"><HeroAdmin /></TabsContent>
          <TabsContent value="services"><ServicesAdmin /></TabsContent>
          <TabsContent value="before-after"><BeforeAfterAdmin /></TabsContent>
          <TabsContent value="reviews"><ReviewsAdmin /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
