import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Save, Trash2 } from "lucide-react";

type Service = {
  id: string;
  title: string;
  items: string[];
  sort_order: number;
};

const ServicesAdmin = () => {
  const [rows, setRows] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    else setRows(data as Service[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (s: Service) => {
    const { error } = await supabase
      .from("services")
      .update({ title: s.title, items: s.items, sort_order: s.sort_order })
      .eq("id", s.id);
    if (error) toast.error(error.message);
    else toast.success("Service saved");
  };

  const add = async () => {
    const { error } = await supabase.from("services").insert({
      title: "New Service",
      items: [],
      sort_order: rows.reduce((m, r: any) => Math.max(m, r.sort_order ?? 0), -1) + 1,
    });
    if (error) toast.error(error.message);
    else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service? The original layout will stay intact on the website.")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Service deleted");
      load();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "service" : "services"}
        </p>
        <Button onClick={add} className="gap-2">
          <Plus className="w-4 h-4" /> Add service
        </Button>
      </div>

      <div className="grid gap-5">
        {rows.map((s, i) => (
          <div
            key={s.id}
            className="bg-background border border-border shadow-soft p-7 md:p-8 space-y-5 transition-shadow hover:shadow-elegant"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-xl">{s.title || "Untitled"}</span>
              </div>
              <span className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                {s.items.length} item{s.items.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="grid md:grid-cols-[1fr_120px] gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Title</Label>
                <Input
                  value={s.title}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...s, title: e.target.value };
                    setRows(next);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">Order</Label>
                <Input
                  type="number"
                  value={s.sort_order}
                  onChange={(e) => {
                    const next = [...rows];
                    next[i] = { ...s, sort_order: Number(e.target.value) };
                    setRows(next);
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                Items (one per line)
              </Label>
              <Textarea
                rows={4}
                value={s.items.join("\n")}
                onChange={(e) => {
                  const next = [...rows];
                  next[i] = { ...s, items: e.target.value.split("\n").filter(Boolean) };
                  setRows(next);
                }}
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(s.id)}
                className="text-muted-foreground hover:text-destructive gap-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
              <Button onClick={() => save(s)} className="gap-2">
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesAdmin;
