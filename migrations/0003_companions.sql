alter table conversations add column if not exists companion_id text not null default 'marcus';
alter table marcus_prefs add column if not exists companion_id text not null default 'marcus';
