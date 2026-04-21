import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";

type Item = { id: string; image_url: string; alt: string; sort_order: number };

const BeforeAfterAdmin = () => {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("before_after")
      .select("*")
      .order("sort_order");
    if (error) toast.error(error.message);
    else setRows(data as Item[]);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const save = async (it: Item) => {
    const { error } = await supabase
      .from("before_after")
      .update({ image_url: it.image_url, alt: it.alt, sort_order: it.sort_order })
      .eq("id", it.id);
    if (error) toast.error(error.message);
    else toast.success("Photo saved");
  };
  const add = async () => {
    const { error } = await supabase
      .from("before_after")
      .insert({ image_url: "", alt: "", sort_order: rows.length });
    if (error) toast.error(error.message);
    else load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this photo? The original gallery layout stays intact on the website.")) return;
    const { error } = await supabase.from("before_after").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Photo deleted");
      load();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "photo" : "photos"} · Removed slots fall back to the original gallery automatically.
        </p>
        <Button onClick={add} className="gap-2">
          <Plus className="w-4 h-4" /> Add photo
        </Button>
      </div>

      <div className="grid gap-5">
        {rows.map((it, i) => (
          <div
            key={it.id}
            className="bg-background border border-border shadow-soft p-7 md:p-8 space-y-5 transition-shadow hover:shadow-elegant"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-lg">{it.alt || "Untitled photo"}</span>
              </div>
              <span className="text-[10px] tracking-luxe uppercase text-muted-foreground">Photo</span>
            </div>

            <ImageUpload
              value={it.image_url}
              folder="before-after"
              onChange={(url) => {
                const next = [...rows];
                next[i] = { ...it, image_url: url };
                setRows(next);
              }}
            />

            <div className="grid md:grid-cols-[1fr_120px] gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Alt text</Label>
                <Input
                  value={it.alt}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...it, alt: e.target.value };
                    setRows(next);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Order</Label>
                <Input
                  type="number"
                  value={it.sort_order}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...it, sort_order: Number(e.target.value) };
                    setRows(next);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(it.id)}
                className="text-muted-foreground hover:text-destructive gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
              <Button onClick={() => save(it)} className="gap-2">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfterAdmin;
