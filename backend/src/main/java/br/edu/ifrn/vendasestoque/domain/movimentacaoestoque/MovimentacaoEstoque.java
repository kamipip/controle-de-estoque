package br.edu.ifrn.vendasestoque.domain.movimentacaoestoque;

import br.edu.ifrn.vendasestoque.domain.entradaproduto.EntradaProduto;
import br.edu.ifrn.vendasestoque.domain.produto.Produto;
import br.edu.ifrn.vendasestoque.domain.venda.Venda;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "movimentacao_estoque") // JPQL
@Table(name = "movimentacao_estoque") // SQL
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class MovimentacaoEstoque {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotNull
  private int quantidade;
  @ManyToOne
  @JoinColumn(name = "entrada_produto_id")
  private EntradaProduto entradaProduto;
  @ManyToOne
  @JoinColumn(name = "produto_id")
  private Produto produto;
  @ManyToOne
  @JoinColumn(name = "venda_id")
  private Venda venda;

}
