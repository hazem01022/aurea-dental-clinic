import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useAdminGuard = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      setIsAdmin(!!data);
      setReady(true);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate("/auth");
    });
    return () => { cancelled = true; sub.subscription.unsubscribe(); };
  }, [navigate]);

  return { ready, isAdmin };
};
