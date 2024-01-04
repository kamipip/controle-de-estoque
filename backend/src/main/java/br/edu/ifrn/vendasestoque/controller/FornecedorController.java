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

import br.edu.ifrn.vendasestoque.domain.fornecedor.Fornecedor;
import br.edu.ifrn.vendasestoque.repository.FornecedorRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("fornecedores")
@CrossOrigin(origins = "*")
public class FornecedorController {

    @Autowired
    private FornecedorRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity<Object> cadastrar(@RequestBody @Valid Fornecedor fornecedor,
            UriComponentsBuilder uriBuilder) {
        Fornecedor fornecedorLocal = repository.save(fornecedor);
        var uri = uriBuilder.path("/fornecedores/{id}").buildAndExpand(fornecedorLocal.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fornecedor> detalhar(@PathVariable Long id) {
        Fornecedor fornecedor = repository.getReferenceById(id);
        return ResponseEntity.ok(fornecedor);
    }

    @GetMapping
    public ResponseEntity<Page<Fornecedor>> listar(@PageableDefault(size = 30, sort = { "nome" }) Pageable paginacao) {
        var fornecedores = repository.findAll(paginacao);
        return ResponseEntity.ok(fornecedores);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> excluir(@PathVariable Long id) {
        var fornecedor = repository.getReferenceById(id);
        repository.delete(fornecedor);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity<Fornecedor> atualizar(@RequestBody @Valid Fornecedor fornecedor) {
        Fornecedor fornecedorLocal = repository.findById(fornecedor.getId()).get();

        if (fornecedorLocal != null) {
            fornecedorLocal.setNome(fornecedor.getNome());
            fornecedorLocal.setRua(fornecedor.getRua());
            fornecedorLocal.setNumero(fornecedor.getNumero());
            fornecedorLocal.setBairro(fornecedor.getBairro());
            fornecedorLocal.setCep(fornecedor.getCep());

           fornecedorLocal = repository.save(fornecedorLocal);
    }
    
        return ResponseEntity.ok(fornecedorLocal);
    }

}
