create database ecopuff;

use database ecopuff;

create table image(
    id int(10) not null auto_increment,
    title varchar(50) not null,
    description varchar(250) not null,
    imagen varchar(250) not null,
    public_id varchar(250) not null,
    CONSTRAINT pk_image PRIMARY KEY(id)
)ENGINE=InnoDB;

create table info(
    id int(10) not null auto_increment,
    who text not null,
    service varchar(250) not null,
    service2 varchar(250) not null,
    service3 varchar(250) not null,
    service4 varchar(250) not null,
    contact varchar(20) not null,
    CONSTRAINT pk_info PRIMARY KEY(id)
)ENGINE=InnoDB;