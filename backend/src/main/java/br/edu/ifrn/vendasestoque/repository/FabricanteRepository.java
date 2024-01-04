package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.vendasestoque.domain.fabricante.Fabricante;

public interface FabricanteRepository extends JpaRepository<Fabricante, Long>{
    
}
