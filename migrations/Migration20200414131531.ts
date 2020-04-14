import { Migration } from 'mikro-orm';

export class Migration20200414131531 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
        create table users
        (
            id       integer not null
                primary key autoincrement,
            fullname varchar not null,
            email    varchar not null,
            password varchar not null
        );

        create table meetups
        (
            id           integer  not null
                primary key autoincrement,
            title        varchar  not null,
            description  varchar,
            cover        varchar,
            date         datetime not null,
            place        varchar  not null,
            organizer_id integer
                references users
                    on update cascade on delete cascade
        );

        create table agenda_items
        (
            id          integer not null
                primary key autoincrement,
            starts_at   varchar not null,
            ends_at     varchar not null,
            type        varchar not null,
            title       varchar,
            description varchar,
            speaker     varchar,
            language    varchar,
            meetup_id   integer
                references meetups
                    on update cascade on delete cascade
        );

        create index agenda_items_meetup_id_index
            on agenda_items (meetup_id);

        create index meetups_organizer_id_index
            on meetups (organizer_id);

        create table participation
        (
            meetup_id integer not null
                references meetups
                    on update cascade on delete cascade,
            user_id   integer not null
                references users
                    on update cascade on delete cascade,
            primary key (meetup_id, user_id)
        );

        create index participation_meetup_id_index
            on participation (meetup_id);

        create index participation_user_id_index
            on participation (user_id);

        create unique index users_email_unique
            on users (email);`);
  }
}
