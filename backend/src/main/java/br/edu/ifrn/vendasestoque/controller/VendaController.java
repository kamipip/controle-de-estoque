package br.edu.ifrn.vendasestoque.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import br.edu.ifrn.vendasestoque.domain.venda.Venda;
import br.edu.ifrn.vendasestoque.repository.VendaRepository;
import br.edu.ifrn.vendasestoque.service.MovimentacaoEstoqueService;
import br.edu.ifrn.vendasestoque.service.RabbitMQSender;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendaController {

    @Autowired
    private VendaRepository repository;

    @Autowired
    private MovimentacaoEstoqueService service;

    @Autowired
    private RabbitMQSender rabbitMQSender;
    //@ResponseEntity 
    //@ResponseStatus(code=HttpStatus.CREATED)
    @PostMapping
    @Transactional
    public ResponseEntity<Object> cadastrar(@RequestBody @Valid Venda venda,
            UriComponentsBuilder uriBuilder) {
        Venda vendaLocal = repository.save(venda);
        service.reduzirEstoque(vendaLocal);

        // Envia mensagem para o RabbitMQ após a venda ser cadastrada com sucesso
        rabbitMQSender.enviarMensagem("Nova venda cadastrada com sucesso!");

        var uri = uriBuilder.path("/vendas/{id}").buildAndExpand(venda.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }
}
