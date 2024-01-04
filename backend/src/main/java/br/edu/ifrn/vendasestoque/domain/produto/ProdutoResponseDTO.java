package br.edu.ifrn.vendasestoque.domain.produto;

public record ProdutoResponseDTO(Long id, 
                                String nome, 
                                String descricao) {
    
    public ProdutoResponseDTO(Produto produto){
      this(produto.getId(), produto.getNome(), produto.getDescricao());
    }
  
}
