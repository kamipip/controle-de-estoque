package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.vendasestoque.domain.venda.Venda;

public interface VendaRepository extends JpaRepository<Venda,Long>{
    
}
