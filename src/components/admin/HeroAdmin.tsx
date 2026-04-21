import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { Save } from "lucide-react";

type Hero = {
  id?: string;
  eyebrow: string | null;
  headline: string | null;
  subheadline: string | null;
  image_url: string | null;
  badge_label: string | null;
  badge_text: string | null;
};

const empty: Hero = {
  eyebrow: "Aurea Dental Clinic",
  headline: "Your Smile, Perfected with Care.",
  subheadline: "Premium dental care with precision, comfort, and results you can trust.",
  image_url: "",
  badge_label: "Rated 5.0",
  badge_text: "Trusted by hundreds of patients across Cairo",
};

const HeroAdmin = () => {
  const [hero, setHero] = useState<Hero>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("hero_content").select("*").maybeSingle();
      if (error) toast.error(error.message);
      else if (data) setHero(data as Hero);
      setLoading(false);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const payload = { ...hero };
    const { error } = hero.id
      ? await supabase.from("hero_content").update(payload).eq("id", hero.id)
      : await supabase
          .from("hero_content")
          .insert(payload)
          .select()
          .single()
          .then((r) => {
            if (r.data) setHero(r.data as Hero);
            return { error: r.error };
          });
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Hero section saved");
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="max-w-3xl">
      <div className="bg-background border border-border shadow-soft p-8 md:p-10 space-y-7">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Eyebrow</Label>
            <Input
              value={hero.eyebrow ?? ""}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Badge label</Label>
            <Input
              value={hero.badge_label ?? ""}
              onChange={(e) => setHero({ ...hero, badge_label: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Headline</Label>
          <Textarea
            rows={3}
            value={hero.headline ?? ""}
            onChange={(e) => setHero({ ...hero, headline: e.target.value })}
            className="font-serif text-2xl leading-tight"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Subheadline</Label>
          <Textarea
            rows={2}
            value={hero.subheadline ?? ""}
            onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Badge text</Label>
          <Input
            value={hero.badge_text ?? ""}
            onChange={(e) => setHero({ ...hero, badge_text: e.target.value })}
          />
        </div>

        <div className="space-y-3 pt-4 border-t border-border">
          <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Hero image</Label>
          <ImageUpload
            value={hero.image_url}
            folder="hero"
            onChange={(url) => setHero({ ...hero, image_url: url })}
          />
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <Button onClick={save} disabled={saving} className="gap-2 px-8">
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroAdmin;
