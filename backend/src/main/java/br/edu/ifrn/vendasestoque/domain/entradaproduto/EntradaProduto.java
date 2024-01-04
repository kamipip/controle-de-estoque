package br.edu.ifrn.vendasestoque.domain.entradaproduto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import br.edu.ifrn.vendasestoque.domain.fornecedor.Fornecedor;
import br.edu.ifrn.vendasestoque.domain.produto.Produto;
import jakarta.persistence.Column;
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

@Entity(name = "entrada_produto")
@Table(name = "entrada_produto")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class EntradaProduto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotNull
  private int quantidade;
  @Column(name = "data_hora")
  private LocalDateTime dataHora;
  @NotNull
  @ManyToOne
  @JoinColumn(name = "fornecedor_id") //Chave estrangeira
  private Fornecedor fornecedor;
  @NotNull
  @ManyToOne
  @JoinColumn(name = "produto_id")
  private Produto produto;
  @NotNull
  private BigDecimal preco;

}
