import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

  useEffect(() => { load(); }, []);

  const save = async (s: Service) => {
    const { error } = await supabase
      .from("services")
      .update({ title: s.title, items: s.items, sort_order: s.sort_order })
      .eq("id", s.id);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  };

  const add = async () => {
    const { error } = await supabase.from("services").insert({
      title: "New Service",
      items: [],
      sort_order: rows.length,
    });
    if (error) toast.error(error.message);
    else load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-3xl">Services</h2>
        <Button onClick={add}>+ Add service</Button>
      </div>
      {rows.map((s, i) => (
        <div key={s.id} className="border border-border p-6 space-y-4 bg-background">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={s.title}
                onChange={(e) => {
                  const next = [...rows];
                  next[i] = { ...s, title: e.target.value };
                  setRows(next);
                }}
              />
            </div>
            <div>
              <Label>Sort order</Label>
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
          <div>
            <Label>Items (one per line)</Label>
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
          <div className="flex gap-2">
            <Button onClick={() => save(s)}>Save</Button>
            <Button variant="outline" onClick={() => remove(s.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesAdmin;
