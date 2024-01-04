package br.edu.ifrn.vendasestoque.domain.endereco;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Endereco {

    private String rua;
    private int numero;
    private String bairro;
    @Pattern(regexp = "\\d{5}-\\d{3}")
    private String cep;
}
