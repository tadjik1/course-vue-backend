pragma foreign_keys = off;

create table `users` (`id` integer not null primary key autoincrement, `fullname` varchar not null, `email` varchar not null, `password` varchar not null);
create unique index `users_email_unique` on `users` (`email`);

create table `meetups` (`id` integer not null primary key autoincrement, `title` varchar not null, `description` varchar null, `date` datetime not null, `place` varchar not null);

create table `agenda_items` (`id` integer not null primary key autoincrement, `starts_at` varchar not null, `ends_at` varchar not null, `type` varchar not null, `title` varchar null, `description` varchar null, `speaker` varchar null, `language` varchar null);

create table `images` (`id` integer not null primary key autoincrement, `data` blob not null, `mimetype` varchar not null, `size` integer not null);

create table `participation` (`meetup_id` integer not null references meetups on update cascade on delete cascade, `user_id` integer not null references users on update cascade on delete cascade, primary key (`meetup_id`, `user_id`));
create index `participation_meetup_id_index` on `participation` (`meetup_id`);
create index `participation_user_id_index` on `participation` (`user_id`);

alter table `meetups` add column `image_id` integer null references images on update cascade on delete set null;
alter table `meetups` add column `organizer_id` integer null references users on update cascade on delete cascade;
create index `meetups_image_id_index` on `meetups` (`image_id`);
create unique index `meetups_image_id_unique` on `meetups` (`image_id`);
create index `meetups_organizer_id_index` on `meetups` (`organizer_id`);

alter table `agenda_items` add column `meetup_id` integer null references meetups on update cascade on delete cascade;
create index `agenda_items_meetup_id_index` on `agenda_items` (`meetup_id`);

alter table `images` add column `user_id` integer null references users on update cascade on delete cascade;
create index `images_user_id_index` on `images` (`user_id`);

pragma foreign_keys = on;
