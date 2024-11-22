drop schema if exists `service_db`;
create schema `service_db` default charset=utf8mb4 collate=utf8mb4_general_ci;
use `service_db`;

set names 'utf8mb4';
set foreign_key_checks = 0;

create table `client` (
    `id` int unsigned not null auto_increment,
    `version` int unsigned not null default 1,
    `base_version` int unsigned default null,

    `name` varchar(255) not null unique,
    `api_key` varchar(255) not null unique,

    `created` datetime not null default current_timestamp(),
    `updated` datetime not null default current_timestamp() on update current_timestamp(),
    `deleted` datetime default null,

    primary key (`id`)
) engine=innodb;

create table `_client` (
    `id` int unsigned not null,
    `version` int unsigned not null,
    `base_version` int unsigned null,

    `name` varchar(255) not null,
    `api_key` varchar(255) not null,

    `created` datetime not null,
    `updated` datetime not null,
    `deleted` datetime null,

    primary key (`id`, `version`),
    foreign key (`id`) references `client` (`id`) on delete cascade
) engine=innodb;

create table `person` (
    `id` int unsigned not null auto_increment,
    `version` int unsigned not null default 1,
    `base_version` int unsigned default null,

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

    primary key (`id`),
    constraint `chk_family_or_given_name` check (`family_name` is not null or `given_name` is not null)
) engine=innodb;

create table `_person` (
    `id` int unsigned not null,
    `version` int unsigned not null,
    `base_version` int unsigned null,

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

    primary key (`id`, `version`),
    foreign key (`id`) references `person` (`id`) on delete cascade on update cascade
) engine=innodb;

create table `user` (
    `id` int unsigned not null auto_increment,
    `version` int unsigned not null default 1,
    `base_version` int unsigned default null,

    `email` varchar(255) not null unique,
    `password` varchar(255) not null,

    `created` datetime not null default current_timestamp(),
    `updated` datetime not null default current_timestamp() on update current_timestamp(),
    `deleted` datetime default null,

    primary key (`id`)
) engine=innodb;

create table `_user` (
    `id` int unsigned not null,
    `version` int unsigned not null,
    `base_version` int unsigned null,

    `email` varchar(255) not null,
    `password` varchar(255) not null,

    `created` datetime not null,
    `updated` datetime not null,
    `deleted` datetime null,

    primary key (`id`, `version`),
    foreign key (`id`) references `user` (`id`) on delete cascade
) engine=innodb;

set foreign_key_checks = 1;

delimiter //

create trigger `client_before_update` before update on `client` for each row begin
    set new.`version` = old.`version` + 1;
end //
create trigger `client_after_update` after update on `client` for each row begin
    insert into `_client` (`id`, `version`, `base_version`, `name`, `api_key`, `created`, `updated`, `deleted`)
    values (old.`id`, old.`version`, old.`base_version`, old.`name`, old.`api_key`, old.`created`, old.`updated`, old.`deleted`);
end //
create trigger `client_before_delete` before delete on `client` for each row begin
    if @allow_delete is null or @allow_delete = false then
        signal sqlstate '45000' set message_text = 'Deleting records from this table is not allowed. Please set the deleted date instead';
    end if;
end //
create trigger `client_after_delete` after delete on `client` for each row begin
    set @allow_delete = false;
end //

create trigger `person_before_update` before update on `person` for each row begin
    set new.`version` = old.`version` + 1;
end //
create trigger `person_after_update` after update on `person` for each row begin
    insert into `_person` (`id`, `version`, `base_version`, `family_name`, `given_name`, `middle_name`, `birth_name`, `maternal_name`, `hon_prefixes`, `hon_suffixes`, `date_of_birth`, `created`, `updated`, `deleted`)
    values (old.`id`, old.`version`, old.`base_version`, old.`family_name`, old.`given_name`, old.`middle_name`, old.`birth_name`, old.`maternal_name`, old.`hon_prefixes`, old.`hon_suffixes`, old.`date_of_birth`, old.`created`, old.`updated`, old.`deleted`);
end //
create trigger `person_before_delete` before delete on `person` for each row begin
    if @allow_delete is null or @allow_delete = false then
        signal sqlstate '45000' set message_text = 'Deleting records from this table is not allowed. Please set the deleted date instead';
    end if;
end //
create trigger `person_after_delete` after delete on `person` for each row begin
    set @allow_delete = false;
end //

create trigger `user_before_update` before update on `user` for each row begin
    set new.`version` = old.`version` + 1;
end //
create trigger `user_after_update` after update on `user` for each row begin
    insert into `_user` (`id`, `version`, `base_version`, `email`, `password`, `created`, `updated`, `deleted`)
    values (old.`id`, old.`version`, old.`base_version`, old.`email`, old.`password`, old.`created`, old.`updated`, old.`deleted`);
end //
create trigger `user_before_delete` before delete on `user` for each row begin
    if @allow_delete is null or @allow_delete = false then
        signal sqlstate '45000' set message_text = 'Deleting records from this table is not allowed. Please set the deleted date instead';
    end if;
end //
create trigger `user_after_delete` after delete on `user` for each row begin
    set @allow_delete = false;
end //

delimiter ;

insert into `client` (`id`, `name`, `api_key`)
values (1, 'Test Client', md5('test'));

insert into `user` (`id`, `email`, `password`)
values (1, 'info@test.com', '$2b$10$5ca3viGkgEuLofngZjMjnePsymUfgFA.LB921rhBzwkL/7F7VnUDK');