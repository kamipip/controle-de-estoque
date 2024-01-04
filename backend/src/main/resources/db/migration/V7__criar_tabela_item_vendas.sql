
create table item_venda (
    id int auto_increment primary key,
    produto_id int not null,
    venda_id int not null,
    preco decimal not null,
    quantidade int not null,    
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    FOREIGN KEY (venda_id) REFERENCES venda(id)
);


