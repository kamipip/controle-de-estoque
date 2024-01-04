ALTER TABLE venda ADD cliente_id int; 
ALTER TABLE venda ADD FOREIGN KEY (cliente_id) REFERENCES cliente(id);