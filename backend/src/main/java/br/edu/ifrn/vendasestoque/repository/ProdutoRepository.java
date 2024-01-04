package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.vendasestoque.domain.produto.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
  Page<Produto> findAllByAtivoTrue(Pageable pageable);
  Produto findByNome(String nome);
}
