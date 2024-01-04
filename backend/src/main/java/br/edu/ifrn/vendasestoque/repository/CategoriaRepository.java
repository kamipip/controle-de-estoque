package br.edu.ifrn.vendasestoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.ifrn.vendasestoque.domain.categoria.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    
}
