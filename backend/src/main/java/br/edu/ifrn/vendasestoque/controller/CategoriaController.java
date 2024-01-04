package br.edu.ifrn.vendasestoque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.edu.ifrn.vendasestoque.domain.categoria.Categoria;
import br.edu.ifrn.vendasestoque.repository.CategoriaRepository;
import jakarta.validation.Valid;


@RestController
@RequestMapping("categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    private CategoriaRepository repository;

    @PostMapping
    @Transactional
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    // @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public ResponseEntity<Object> cadastrar(@RequestBody @Valid Categoria categoria,
            UriComponentsBuilder uriBuilder) {
        Categoria categoriaLocal = repository.save(categoria);
        var uri = uriBuilder.path("/categorias/{id}").buildAndExpand(categoriaLocal.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> detalhar(@PathVariable Long id) {
        var categoria = repository.getReferenceById(id);
        return ResponseEntity.ok(categoria);
    }

    @GetMapping
    public ResponseEntity<Page<Categoria>> listar(@PageableDefault(size = 4, sort = { "nome" }) Pageable paginacao) {
        var categorias = repository.findAll(paginacao);
        return ResponseEntity.ok(categorias);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> excluir(@PathVariable Long id) {
        var categoria = repository.getReferenceById(id);
        repository.delete(categoria);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity<Categoria> atualizar(@RequestBody @Valid Categoria categoria) {
        Categoria categoriaLocal = repository.findById(categoria.getId()).get();

        categoriaLocal.setNome(categoria.getNome());

        return ResponseEntity.ok(categoriaLocal);
    }

}
