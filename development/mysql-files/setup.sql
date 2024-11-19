drop schema if exists `service_db`;
create schema `service_db` default charset=utf8mb4 collate=utf8mb4_general_ci;
use `service_db`;

set names 'utf8mb4';
set foreign_key_checks = 0;

create table `person` (
    `id` int unsigned not null auto_increment,
    `_v` int unsigned not null default 1,

    `family_name` varchar(80) default null,
    `given_name` varchar(80) default null,
    `middle_name` varchar(80) default null,
    `birth_name` varchar(80) default null,
    `maternal_name` varchar(80) default null,
    `hon_prefixes` varchar(160) default null,
    `hon_suffixes` varchar(160) default null,
    `date_of_birth` date default null,

    `created` datetime not null default current_timestamp(),
    `updated` datetime not null default current_timestamp() on update current_timestamp(),
    `deleted` datetime default null,

    primary key (`id`)
) engine=innodb;

create table `_person` (
    `id` int unsigned not null,
    `_v` int unsigned not null,

    `family_name` varchar(80) default null,
    `given_name` varchar(80) default null,
    `middle_name` varchar(80) default null,
    `birth_name` varchar(80) default null,
    `maternal_name` varchar(80) default null,
    `hon_prefixes` varchar(160) default null,
    `hon_suffixes` varchar(160) default null,
    `date_of_birth` date default null,

    `created` datetime not null,
    `updated` datetime not null,
    `deleted` datetime null,

    primary key (`id`, `_v`),
    foreign key (`id`) references `person` (`id`) on delete cascade on update cascade
) engine=innodb;

set foreign_key_checks = 1;

delimiter //

create trigger `person_before_update` before update on `person` for each row begin
    set new.`_v` = old.`_v` + 1;
end //
create trigger `person_after_update` after update on `person` for each row begin
    insert into `_person` (`id`, `_v`, `family_name`, `given_name`, `middle_name`, `birth_name`, `maternal_name`, `hon_prefixes`, `hon_suffixes`, `date_of_birth`, `created`, `updated`, `deleted`)
    values (old.`id`, old.`_v`, old.`family_name`, old.`given_name`, old.`middle_name`, old.`birth_name`, old.`maternal_name`, old.`hon_prefixes`, old.`hon_suffixes`, old.`date_of_birth`, old.`created`, old.`updated`, old.`deleted`);
end //
create trigger `person_before_delete` before delete on `person` for each row begin
    if @allow_delete is null or @allow_delete = false then
        signal sqlstate '45000' set message_text = 'Deleting records from this table is not allowed. Please set the deleted date instead';
    end if;
end //
create trigger `person_after_delete` after delete on `person` for each row begin
    set @allow_delete = false;
end //

delimiter ;