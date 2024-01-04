package br.edu.ifrn.vendasestoque.domain.produto;

import java.math.BigDecimal;

import br.edu.ifrn.vendasestoque.domain.categoria.Categoria;
import br.edu.ifrn.vendasestoque.domain.fabricante.Fabricante;


public record ProdutoRequestDTO(String nome,
                                String descricao,
                                int quantidadeEstoque,
                                BigDecimal preco,
                                Categoria categoria,
                                Fabricante fabricante) {
  
}
