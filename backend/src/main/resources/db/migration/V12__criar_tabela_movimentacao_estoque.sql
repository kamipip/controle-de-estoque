create table movimentacao_estoque (
    id int auto_increment primary key,
    quantidade int not null,
    produto_id int not null,
    entrada_produto_id int,
    venda_id int,
    FOREIGN KEY (produto_id) REFERENCES produto(id),
    FOREIGN KEY (entrada_produto_id) REFERENCES entrada_produto(id)  ON DELETE CASCADE ON UPDATE NO ACTION,
    FOREIGN KEY (venda_id) REFERENCES venda(id)  ON DELETE CASCADE ON UPDATE NO ACTION
);