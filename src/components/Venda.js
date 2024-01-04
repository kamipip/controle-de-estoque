import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #00BFFF;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  background-color: #00BFFF;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  width: 300px;
  margin: 0 auto;
  margin-top: 50px;

  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: black;
`;

const Label = styled.label`
  color: black;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin: 8px 0;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    background-color: #303030;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const Venda = () => {
  const [novaVenda, setNovaVenda] = useState({
    dataHora: '',
    totalVenda: 0,
    itensVendas: [
      { quantidade: 0, produto: '', preco: 0 },
    ],
    cliente: { id: 0 },
  });

  const cadastrarVenda = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/vendas', novaVenda);

      setNovaVenda({
        dataHora: '',
        totalVenda: 0,
        itensVendas: [
          { quantidade: 0, produto: '', preco: 0 },
        ],
        cliente: { id: 0 },
      });
    } catch (error) {
      console.error('Erro ao cadastrar nova venda:', error);
    }
  };

  const adicionarItem = () => {
    setNovaVenda({
      ...novaVenda,
      itensVendas: [...novaVenda.itensVendas, { quantidade: 0, produto: '', preco: 0 }],
    });
  };

  const removerItem = (index) => {
    const novosItens = [...novaVenda.itensVendas];
    novosItens.splice(index, 1);
    setNovaVenda({ ...novaVenda, itensVendas: novosItens });
  };

  const setNovaVendaQuantidade = (index, value) => {
    const novosItens = [...novaVenda.itensVendas];
    novosItens[index].quantidade = value;
    setNovaVenda({ ...novaVenda, itensVendas: novosItens });
  };

  const setNovaVendaProduto = (index, value) => {
    const novosItens = [...novaVenda.itensVendas];
    novosItens[index].produto = value;
    setNovaVenda({ ...novaVenda, itensVendas: novosItens });
  };

  const setNovaVendaPreco = (index, value) => {
    const novosItens = [...novaVenda.itensVendas];
    novosItens[index].preco = value;
    setNovaVenda({ ...novaVenda, itensVendas: novosItens });
  };

  const setNovaVendaCliente = (value) => {
    setNovaVenda({ ...novaVenda, cliente: { id: value } });
  };

  return (
    <Container>
      <FormContainer onSubmit={cadastrarVenda}>
        <Title>Nova Venda</Title>
        <div className="mb-4">
          <Label>Data e Hora da Venda:</Label>
          <Input
            type="datetime-local"
            value={novaVenda.dataHora}
            onChange={(e) => setNovaVenda({ ...novaVenda, dataHora: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <Label>Total da Venda:</Label>
          <Input
            type="number"
            step="0.01"
            value={novaVenda.totalVenda}
            onChange={(e) => setNovaVenda({ ...novaVenda, totalVenda: e.target.value })}
            required
          />
        </div>
        <fieldset className="mb-4 border p-4 rounded-md">
          <legend>Itens da Venda:</legend>
          {novaVenda.itensVendas.map((item, index) => (
            <div key={index} className="mb-2 p-2 border rounded-md">
              <Label>Quantidade do Item {index + 1}:</Label>
              <Input
                type="number"
                value={item.quantidade}
                onChange={(e) => setNovaVendaQuantidade(index, e.target.value)}
                required
              />
              <Label>ID do produto {index + 1}:</Label>
              <Input
                type="text"
                value={item.produto}
                onChange={(e) => setNovaVendaProduto(index, e.target.value)}
                required
              />
              <Label>Preço do Item {index + 1}:</Label>
              <Input
                type="number"
                value={item.preco}
                onChange={(e) => setNovaVendaPreco(index, e.target.value)}
                required
              />
              <Button type="button" onClick={() => removerItem(index)}>
                Remover
              </Button>
            </div>
          ))}
          <Button type="button" onClick={adicionarItem}>
            Adicionar Item
          </Button>
        </fieldset>
        <div className="mb-4">
          <Label>ID do Cliente:</Label>
          <Input
            type="number"
            value={novaVenda.cliente.id}
            onChange={(e) => setNovaVendaCliente(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Cadastrar Venda</Button>
      </FormContainer>
    </Container>
  );
};

export default Venda;
