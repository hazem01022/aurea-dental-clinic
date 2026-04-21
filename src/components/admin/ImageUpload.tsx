import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
}

const ImageUpload = ({ value, onChange, folder = "uploads" }: Props) => {
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("cms-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-5 items-start">
      <div className="relative w-40 h-40 flex-shrink-0 border border-border bg-cream-deep overflow-hidden group">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
            <ImageIcon className="w-6 h-6" />
            <span className="text-[10px] tracking-luxe uppercase">No image</span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        />
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="gap-2"
        >
          {busy ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Uploading…
            </>
          ) : value ? (
            <>
              <RefreshCw className="w-4 h-4" /> Replace image
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Upload image
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          PNG or JPG. Recommended 1600×1000 for hero, 1200×1200 for gallery.
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;
