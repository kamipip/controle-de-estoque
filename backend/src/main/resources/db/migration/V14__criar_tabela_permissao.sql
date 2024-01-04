create table permissao (
    id int primary key auto_increment,
    nome varchar(255) not null
);
create table usuario_permissao (
    id int primary key auto_increment,
    usuario_id int,
    permissao_id int,    
    foreign key (usuario_id) references usuario(id),
    foreign key (permissao_id) references permissao(id)
);
insert into permissao (nome) values ('ROLE_ADMIN');
insert into permissao (nome) values ('ROLE_USER');