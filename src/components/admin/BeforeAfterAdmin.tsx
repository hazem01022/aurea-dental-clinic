import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";

type Item = { id: string; image_url: string; alt: string; sort_order: number };

const BeforeAfterAdmin = () => {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("before_after").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setRows(data as Item[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (it: Item) => {
    const { error } = await supabase.from("before_after").update({
      image_url: it.image_url, alt: it.alt, sort_order: it.sort_order,
    }).eq("id", it.id);
    if (error) toast.error(error.message); else toast.success("Saved");
  };
  const add = async () => {
    const { error } = await supabase.from("before_after").insert({ image_url: "", alt: "", sort_order: rows.length });
    if (error) toast.error(error.message); else load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    const { error } = await supabase.from("before_after").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-3xl">Before & After</h2>
        <Button onClick={add}>+ Add photo</Button>
      </div>
      {rows.map((it, i) => (
        <div key={it.id} className="border border-border p-6 space-y-4 bg-background">
          <ImageUpload
            value={it.image_url}
            folder="before-after"
            onChange={(url) => {
              const next = [...rows]; next[i] = { ...it, image_url: url }; setRows(next);
            }}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Alt text</Label>
              <Input value={it.alt} onChange={(e) => {
                const next = [...rows]; next[i] = { ...it, alt: e.target.value }; setRows(next);
              }} />
            </div>
            <div>
              <Label>Sort order</Label>
              <Input type="number" value={it.sort_order} onChange={(e) => {
                const next = [...rows]; next[i] = { ...it, sort_order: Number(e.target.value) }; setRows(next);
              }} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => save(it)}>Save</Button>
            <Button variant="outline" onClick={() => remove(it.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BeforeAfterAdmin;
