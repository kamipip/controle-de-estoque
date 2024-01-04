create table entrada_produto (
    id int auto_increment primary key,
    quantidade int not null,
    preco decimal not null,
    produto_id int not null,
    fornecedor_id int not null,
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    FOREIGN KEY (fornecedor_id) REFERENCES fornecedor(id)
);