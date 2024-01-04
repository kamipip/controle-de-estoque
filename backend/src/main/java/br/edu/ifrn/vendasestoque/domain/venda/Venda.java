package br.edu.ifrn.vendasestoque.domain.venda;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import br.edu.ifrn.vendasestoque.domain.cliente.Cliente;
import br.edu.ifrn.vendasestoque.domain.itemvenda.ItemVenda;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "venda")
@Table(name = "venda")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "data_hora")
    private LocalDateTime dataHora;
    @Column(name = "total_venda")
    private BigDecimal totalVenda;
    @OneToMany(mappedBy = "venda", fetch = FetchType.EAGER)
    private List<ItemVenda> itensVendas;
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    
}
