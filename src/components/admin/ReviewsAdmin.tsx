import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";

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
  useEffect(() => {
    load();
  }, []);

  const save = async (r: Review) => {
    const { error } = await supabase
      .from("reviews")
      .update({ quote: r.quote, name: r.name, sort_order: r.sort_order })
      .eq("id", r.id);
    if (error) toast.error(error.message);
    else toast.success("Review saved");
  };
  const add = async () => {
    const { error } = await supabase
      .from("reviews")
      .insert({ quote: "", name: "", sort_order: rows.length });
    if (error) toast.error(error.message);
    else load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this review? The original layout will stay intact on the website.")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Review deleted");
      load();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "review" : "reviews"}
        </p>
        <Button onClick={add} className="gap-2">
          <Plus className="w-4 h-4" /> Add review
        </Button>
      </div>

      <div className="grid gap-5">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className="bg-background border border-border shadow-soft p-7 md:p-8 space-y-5 transition-shadow hover:shadow-elegant"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl text-gold leading-none">"</span>
                <span className="font-serif text-lg">{r.name || "Anonymous"}</span>
              </div>
              <span className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                #{i + 1}
              </span>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Quote</Label>
              <Textarea
                rows={3}
                value={r.quote}
                onChange={(e) => {
                  const next = [...rows];
                  next[i] = { ...r, quote: e.target.value };
                  setRows(next);
                }}
                className="font-serif text-lg leading-snug"
              />
            </div>

            <div className="grid md:grid-cols-[1fr_120px] gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Name</Label>
                <Input
                  value={r.name}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...r, name: e.target.value };
                    setRows(next);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Order</Label>
                <Input
                  type="number"
                  value={r.sort_order}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...r, sort_order: Number(e.target.value) };
                    setRows(next);
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(r.id)}
                className="text-muted-foreground hover:text-destructive gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
              <Button onClick={() => save(r)} className="gap-2">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsAdmin;
