package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.vendasestoque.domain.entradaproduto.EntradaProduto;

public interface EntradaProdutoRepository extends JpaRepository<EntradaProduto, Long> {
  
}
