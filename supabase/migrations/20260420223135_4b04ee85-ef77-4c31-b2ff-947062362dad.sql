-- Fix: function search_path
create or replace function public.touch_updated_at()
returns trigger language plpgsql
set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

-- Fix: restrict listing on cms-media (keep individual file access via public URL)
drop policy if exists "cms-media public read" on storage.objects;
create policy "cms-media admin list" on storage.objects for select to authenticated
  using (bucket_id = 'cms-media' and public.has_role(auth.uid(),'admin'));