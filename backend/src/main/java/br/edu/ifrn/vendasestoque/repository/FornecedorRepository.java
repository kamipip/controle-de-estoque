package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.vendasestoque.domain.fornecedor.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long>{
    
}
