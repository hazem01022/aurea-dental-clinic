-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

create policy "admins manage roles" on public.user_roles
  for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Trigger: first signup becomes admin
create or replace function public.assign_first_user_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.user_roles where role = 'admin') = 0 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_assign_admin
  after insert on auth.users
  for each row execute function public.assign_first_user_admin();

-- Updated-at helper
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- SERVICES
create table public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  items text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.services enable row level security;
create policy "services public read" on public.services for select using (true);
create policy "services admin write" on public.services for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger services_touch before update on public.services for each row execute function public.touch_updated_at();

-- HERO (single row)
create table public.hero_content (
  id uuid primary key default gen_random_uuid(),
  eyebrow text,
  headline text,
  subheadline text,
  image_url text,
  badge_label text,
  badge_text text,
  updated_at timestamptz not null default now()
);
alter table public.hero_content enable row level security;
create policy "hero public read" on public.hero_content for select using (true);
create policy "hero admin write" on public.hero_content for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger hero_touch before update on public.hero_content for each row execute function public.touch_updated_at();

-- BEFORE / AFTER
create table public.before_after (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.before_after enable row level security;
create policy "ba public read" on public.before_after for select using (true);
create policy "ba admin write" on public.before_after for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger ba_touch before update on public.before_after for each row execute function public.touch_updated_at();

-- REVIEWS
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
create policy "reviews public read" on public.reviews for select using (true);
create policy "reviews admin write" on public.reviews for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger reviews_touch before update on public.reviews for each row execute function public.touch_updated_at();

-- Storage bucket for CMS media
insert into storage.buckets (id, name, public) values ('cms-media','cms-media', true)
  on conflict (id) do nothing;

create policy "cms-media public read" on storage.objects for select using (bucket_id = 'cms-media');
create policy "cms-media admin write" on storage.objects for all to authenticated
  using (bucket_id = 'cms-media' and public.has_role(auth.uid(),'admin'))
  with check (bucket_id = 'cms-media' and public.has_role(auth.uid(),'admin'));