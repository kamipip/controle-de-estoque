package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import br.edu.ifrn.vendasestoque.domain.movimentacaoestoque.MovimentacaoEstoque;

public interface MovimentacaoEstoqueRepository extends JpaRepository<MovimentacaoEstoque, Long> {

    @Query(value = "insert into movimentacao_estoque (quantidade, produto_id, entrada_produto_id) values (?1, ?2, ?3)", nativeQuery = true)
    void inserirEstoque(int quantidade, Long produtoId, Long entradaProdutoId);

    @Modifying
    @Query(value = "insert into movimentacao_estoque (quantidade, produto_id, venda_id) values (?1, ?2, ?3)", nativeQuery = true)
    void reduzirEstoque(int quantidade, Long produtoId, Long vendaId);
  
}
