create table produto (
    id int auto_increment primary key,
    nome varchar(200) not null,
    descricao varchar(300) not null,
    quantidade_estoque int not null,
    preco decimal not null,
    fabricante_id int ,
    categoria_id int ,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id),
    FOREIGN KEY (fabricante_id) REFERENCES fabricante(id)
);


