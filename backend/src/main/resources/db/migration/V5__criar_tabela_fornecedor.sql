create table fornecedor (
    id int auto_increment primary key,
    nome varchar(200) not null,
    rua varchar(300) not null,
    numero int not null,
    bairro varchar(300) not null,
    cep varchar(20) not null
);
