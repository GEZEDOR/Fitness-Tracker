create table public.workouts (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  exercise text not null check (char_length(exercise) between 2 and 100),
  date date not null,
  sets int not null check (sets > 0),
  reps int not null check (reps > 0),
  weight numeric not null check (weight >= 0),
  note text,
  created_at timestamptz not null default now()
);

alter table public.workouts enable row level security;

create policy "workouts_select_all" on public.workouts
  for select using (true);

create policy "workouts_insert_own" on public.workouts
  for insert to authenticated
  with check (auth.uid() = user_id);

create policy "workouts_update_own" on public.workouts
  for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "workouts_delete_own" on public.workouts
  for delete to authenticated
  using (auth.uid() = user_id);
