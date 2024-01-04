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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.edu.ifrn.vendasestoque.domain.entradaproduto.EntradaProduto;
import br.edu.ifrn.vendasestoque.repository.EntradaProdutoRepository;
import br.edu.ifrn.vendasestoque.service.MovimentacaoEstoqueService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("entradaprodutos")
@CrossOrigin(origins = "*")
public class EntradaProdutoController {

  @Autowired
  private EntradaProdutoRepository repository;

  @Autowired
  private MovimentacaoEstoqueService service;

  @PostMapping
  @Transactional
  public ResponseEntity<Object> cadastrar(@RequestBody @Valid EntradaProduto entradaProduto,
      UriComponentsBuilder uriBuilder) {
    EntradaProduto entradaProdutoLocal = repository.save(entradaProduto);
    service.inserirEstoque(entradaProdutoLocal);
    var uri = uriBuilder.path("/entradaprodutos/{id}").buildAndExpand(entradaProdutoLocal.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<EntradaProduto> detalhar(@PathVariable Long id) {
    EntradaProduto entradaProduto = repository.getReferenceById(id);
    return ResponseEntity.ok(entradaProduto);
  }

  @GetMapping
  public ResponseEntity<Page<EntradaProduto>> listar(
      @PageableDefault(size = 30, sort = { "id" }) Pageable paginacao) {
    var entradaProdutos = repository.findAll(paginacao);
    return ResponseEntity.ok(entradaProdutos);
  }

  @DeleteMapping("/{id}")
  @Transactional
  public ResponseEntity<Object> excluir(@PathVariable Long id) {
    var entradaProduto = repository.getReferenceById(id);
    repository.delete(entradaProduto);
    return ResponseEntity.noContent().build();
  }

}
