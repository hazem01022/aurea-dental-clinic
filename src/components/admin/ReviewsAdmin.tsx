import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Review = { id: string; quote: string; name: string; sort_order: number };

const ReviewsAdmin = () => {
  const [rows, setRows] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("reviews").select("*").order("sort_order");
    if (error) toast.error(error.message);
    else setRows(data as Review[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (r: Review) => {
    const { error } = await supabase.from("reviews").update({
      quote: r.quote, name: r.name, sort_order: r.sort_order,
    }).eq("id", r.id);
    if (error) toast.error(error.message); else toast.success("Saved");
  };
  const add = async () => {
    const { error } = await supabase.from("reviews").insert({ quote: "", name: "", sort_order: rows.length });
    if (error) toast.error(error.message); else load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-3xl">Patient reviews</h2>
        <Button onClick={add}>+ Add review</Button>
      </div>
      {rows.map((r, i) => (
        <div key={r.id} className="border border-border p-6 space-y-4 bg-background">
          <div>
            <Label>Quote</Label>
            <Textarea rows={3} value={r.quote} onChange={(e) => {
              const next = [...rows]; next[i] = { ...r, quote: e.target.value }; setRows(next);
            }} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={r.name} onChange={(e) => {
                const next = [...rows]; next[i] = { ...r, name: e.target.value }; setRows(next);
              }} />
            </div>
            <div>
              <Label>Sort order</Label>
              <Input type="number" value={r.sort_order} onChange={(e) => {
                const next = [...rows]; next[i] = { ...r, sort_order: Number(e.target.value) }; setRows(next);
              }} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => save(r)}>Save</Button>
            <Button variant="outline" onClick={() => remove(r.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsAdmin;
