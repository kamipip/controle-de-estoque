package br.edu.ifrn.vendasestoque.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.edu.ifrn.vendasestoque.domain.entradaproduto.EntradaProduto;
import br.edu.ifrn.vendasestoque.domain.venda.Venda;
import br.edu.ifrn.vendasestoque.repository.MovimentacaoEstoqueRepository;

@Service
public class MovimentacaoEstoqueService {

    @Autowired
    private MovimentacaoEstoqueRepository repository;

    @Transactional
    public void inserirEstoque(EntradaProduto entradaProduto){
        repository.inserirEstoque(entradaProduto.getQuantidade(), 
                                  entradaProduto.getProduto().getId(), 
                                  entradaProduto.getId());
    }

    @Transactional
    public void reduzirEstoque(Venda venda){
        /*
        for (int i=0;i<venda.getItensVendas().size();i++){
            venda.getItensVendas().get(i);
        }
        for (ItemVenda itemVenda : venda.getItensVendas()){

        }
        */
        if (venda.getItensVendas() != null) {
            venda.getItensVendas().forEach(itemVenda -> {
                repository.reduzirEstoque(itemVenda.getQuantidade() * -1, itemVenda.getProduto().getId(), venda.getId());
            });
        }
    }
    
}
