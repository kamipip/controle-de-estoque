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

import br.edu.ifrn.vendasestoque.domain.cliente.Cliente;
import br.edu.ifrn.vendasestoque.repository.ClienteRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

  @Autowired
  private ClienteRepository repository;

  @PostMapping
    @Transactional
    public ResponseEntity<Object> cadastrar(@RequestBody @Valid Cliente cliente,
            UriComponentsBuilder uriBuilder) {
        Cliente clienteLocal = repository.save(cliente);
        var uri = uriBuilder.path("/clientes/{id}").buildAndExpand(clienteLocal.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> detalhar(@PathVariable Long id) {
        Cliente cliente = repository.getReferenceById(id);
        return ResponseEntity.ok(cliente);
    }

    @GetMapping
    public ResponseEntity<Page<Cliente>> listar(@PageableDefault(size = 30, sort = { "nome" }) Pageable paginacao) {
        var clientes = repository.findAll(paginacao);
        return ResponseEntity.ok(clientes);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Object> excluir(@PathVariable Long id) {
        var cliente = repository.getReferenceById(id);
        repository.delete(cliente);
        return ResponseEntity.noContent().build();
    }

    @PutMapping
    @Transactional
    public ResponseEntity<Cliente> atualizar(@RequestBody @Valid Cliente cliente) {
    Cliente clienteLocal = repository.findById(cliente.getId()).orElse(null);

        if (clienteLocal != null) {
            clienteLocal.setNome(cliente.getNome());
            clienteLocal.setRua(cliente.getRua());
            clienteLocal.setNumero(cliente.getNumero());
            clienteLocal.setBairro(cliente.getBairro());
            clienteLocal.setCep(cliente.getCep());

        // Salvar no repositório após todas as alterações
            clienteLocal = repository.save(clienteLocal);
    }

        return ResponseEntity.ok(clienteLocal);
}


  
}
