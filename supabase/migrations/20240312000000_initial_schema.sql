-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text unique,
  parish text,
  phone text,
  role text check (role in ('admin', 'organizer', 'participant')),
  permissions text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create events table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  date date not null,
  time text not null,
  location text not null,
  parish text not null,
  category text not null,
  price numeric(10,2) not null,
  image_url text,
  organizer_id uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create tickets table
create table public.tickets (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  status text check (status in ('valid', 'used', 'cancelled', 'refunded')) default 'valid',
  purchase_date timestamp with time zone default timezone('utc'::text, now()) not null,
  price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  color text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create coupons table
create table public.coupons (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  type text check (type in ('percentage', 'fixed')) not null,
  value numeric(10,2) not null,
  event_id uuid references events(id) on delete cascade,
  usage_limit integer not null,
  usage_count integer default 0,
  expiry_date date not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.tickets enable row level security;
alter table public.categories enable row level security;
alter table public.coupons enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Events are viewable by everyone"
  on public.events for select
  using (true);

create policy "Organizers and admins can create events"
  on public.events for insert
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'organizer')
    )
  );

create policy "Organizers and admins can update own events"
  on public.events for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'organizer')
      and id = organizer_id
    )
  );

create policy "Users can view own tickets"
  on public.tickets for select
  using (auth.uid() = user_id);

create policy "Users can purchase tickets"
  on public.tickets for insert
  using (auth.uid() = user_id);

create policy "Users can update own tickets"
  on public.tickets for update
  using (auth.uid() = user_id);

create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

create policy "Only admins can manage categories"
  on public.categories for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  );

create policy "Coupons are viewable by everyone"
  on public.coupons for select
  using (true);

create policy "Only admins and organizers can manage coupons"
  on public.coupons for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role in ('admin', 'organizer')
    )
  );

-- Insert initial admin user
insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
values (
  '00000000-0000-0000-0000-000000000000',
  'admin@example.com',
  crypt('admin123', gen_salt('bf')),
  now(),
  '{"name": "Admin User"}'
);

-- Insert admin profile
insert into public.profiles (id, name, email, role, permissions)
values (
  '00000000-0000-0000-0000-000000000000',
  'Admin User',
  'admin@example.com',
  'admin',
  array['manage_users', 'manage_events', 'manage_settings', 'view_reports', 'manage_billing']
);

-- Insert initial organizer user
insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
values (
  '11111111-1111-1111-1111-111111111111',
  'organizer@example.com',
  crypt('organizer123', gen_salt('bf')),
  now(),
  '{"name": "Organizer User"}'
);

-- Insert organizer profile
insert into public.profiles (id, name, email, role, permissions)
values (
  '11111111-1111-1111-1111-111111111111',
  'Organizer User',
  'organizer@example.com',
  'organizer',
  array['create_events', 'manage_tickets', 'view_reports']
);