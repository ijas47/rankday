create extension if not exists pgcrypto;

create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  brand_name text not null,
  domain text not null,
  market text not null default 'Global',
  aliases text[] not null default '{}',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists competitors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  domain text,
  aliases text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists prompts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  prompt_text text not null,
  topic text not null default 'AI visibility',
  market text not null default 'Global',
  priority int not null default 1,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists tracking_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  status text not null default 'queued',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  error text
);

create table if not exists prompt_results (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  prompt_id uuid not null references prompts(id) on delete cascade,
  tracking_run_id uuid not null references tracking_runs(id) on delete cascade,
  provider text not null,
  prompt_text text not null,
  response_text text not null default '',
  mentioned_brands jsonb not null default '[]'::jsonb,
  cited_urls text[] not null default '{}',
  cited_domains text[] not null default '{}',
  raw_response jsonb not null default '{}'::jsonb,
  error text,
  created_at timestamptz not null default now()
);

create table if not exists recommendations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  tracking_run_id uuid references tracking_runs(id) on delete cascade,
  priority text not null default 'medium',
  title text not null,
  detail text not null,
  action text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table projects enable row level security;
alter table competitors enable row level security;
alter table prompts enable row level security;
alter table tracking_runs enable row level security;
alter table prompt_results enable row level security;
alter table recommendations enable row level security;

create policy "members can read organizations" on organizations for select
  using (exists (select 1 from organization_members m where m.organization_id = organizations.id and m.user_id = auth.uid()));

create policy "members can read memberships" on organization_members for select
  using (user_id = auth.uid());

create policy "members can read projects" on projects for select
  using (exists (select 1 from organization_members m where m.organization_id = projects.organization_id and m.user_id = auth.uid()));

create policy "members can read competitors" on competitors for select
  using (exists (
    select 1 from projects p
    join organization_members m on m.organization_id = p.organization_id
    where p.id = competitors.project_id and m.user_id = auth.uid()
  ));

create policy "members can read prompts" on prompts for select
  using (exists (
    select 1 from projects p
    join organization_members m on m.organization_id = p.organization_id
    where p.id = prompts.project_id and m.user_id = auth.uid()
  ));

create policy "members can read tracking runs" on tracking_runs for select
  using (exists (
    select 1 from projects p
    join organization_members m on m.organization_id = p.organization_id
    where p.id = tracking_runs.project_id and m.user_id = auth.uid()
  ));

create policy "members can read prompt results" on prompt_results for select
  using (exists (
    select 1 from projects p
    join organization_members m on m.organization_id = p.organization_id
    where p.id = prompt_results.project_id and m.user_id = auth.uid()
  ));

create policy "members can read recommendations" on recommendations for select
  using (exists (
    select 1 from projects p
    join organization_members m on m.organization_id = p.organization_id
    where p.id = recommendations.project_id and m.user_id = auth.uid()
  ));

create index if not exists projects_org_idx on projects(organization_id);
create index if not exists competitors_project_idx on competitors(project_id);
create index if not exists prompts_project_idx on prompts(project_id);
create index if not exists tracking_runs_project_started_idx on tracking_runs(project_id, started_at desc);
create index if not exists prompt_results_project_created_idx on prompt_results(project_id, created_at desc);
create index if not exists recommendations_project_status_idx on recommendations(project_id, status, created_at desc);
