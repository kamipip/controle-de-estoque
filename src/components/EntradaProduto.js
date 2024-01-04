import React, { useState, useEffect } from 'react';
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

const EntradaProduto = () => {
  const [novaEntradaProduto, setNovaEntradaProduto] = useState({
    dataHora: '',
    quantidade: '',
    fornecedor: '',
    produto: '',
    preco: '',
  });

  const [entradasProduto, setEntradasProduto] = useState([]);
  const [fabricantes, setFabricantes] = useState([]); 

  const [entradaProdutoDetalhado, setEntradaProdutoDetalhado] = useState(null);

  useEffect(() => {

    const fetchFabricantes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/entradaprodutos');
        setFabricantes(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchFabricantes();
  }, []);

  const criarNovaEntradaProduto = async (e) => {
    e.preventDefault();

    try {

      await axios.post('http://localhost:8080/entradaprodutos', novaEntradaProduto);

      const response = await axios.get('http://localhost:8080/entradaprodutos');
      setEntradasProduto(response.data);

      setNovaEntradaProduto({
        dataHora: '',
        quantidade: '',
        fornecedor: '',
        produto: '',
        preco: '',
      });
    } catch (error) {
      console.error('Erro ao criar nova entrada de produto:', error);
    }
  };

  const detalharFornecedor = (id) => {
    const entradaDetalhada = entradasProduto.find((entrada) => entrada.id === id);
    setEntradaProdutoDetalhado(entradaDetalhada);
  };

  const excluirFornecedor = async (id) => {
    try {

      await axios.delete(`http://localhost:8080/entradaprodutos/${id}`);

      const response = await axios.get('http://localhost:8080/entradaprodutos');
      setEntradasProduto(response.data);

      if (entradaProdutoDetalhado && entradaProdutoDetalhado.id === id) {
        setEntradaProdutoDetalhado(null);
      }
    } catch (error) {
      console.error('Erro ao excluir entrada de produto:', error);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={criarNovaEntradaProduto}>
        <Title>Nova Entrada de Produto</Title>
        <Label htmlFor="dataHora">Data e Hora:
          <Input
            type="datetime-local"
            id="dataHora"
            name="dataHora"
            value={novaEntradaProduto.dataHora}
            onChange={(e) => setNovaEntradaProduto({ ...novaEntradaProduto, dataHora: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="quantidade">Quantidade:
          <Input
            type="number"
            id="quantidade"
            name="quantidade"
            value={novaEntradaProduto.quantidade}
            onChange={(e) => setNovaEntradaProduto({ ...novaEntradaProduto, quantidade: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="fornecedor">Fornecedor:
          <select
            id="fornecedor"
            name="fornecedor"
            value={novaEntradaProduto.fornecedor}
            onChange={(e) => setNovaEntradaProduto({ ...novaEntradaProduto, fornecedor: e.target.value })}
            required
          >
            {fabricantes.map((fabricante) => (
              <option key={fabricante.id} value={fabricante.nome}>
                {fabricante.nome}
              </option>
            ))}
          </select>
        </Label>
        <Label htmlFor="produto">Produto:
          <Input
            type="text"
            id="produto"
            name="produto"
            value={novaEntradaProduto.produto}
            onChange={(e) => setNovaEntradaProduto({ ...novaEntradaProduto, produto: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="preco">Preço:
          <Input
            type="number"
            id="preco"
            name="preco"
            value={novaEntradaProduto.preco}
            onChange={(e) => setNovaEntradaProduto({ ...novaEntradaProduto, preco: e.target.value })}
            required
          />
        </Label>
        <Button type="submit">Criar Entrada</Button>
      </FormContainer>

      <hr className="my-4" />

      <Title>Lista de Entradas de Produtos</Title>
      <ul>
        {entradasProduto.map((entrada) => (
          <li key={entrada.id} className="mb-2">
            {entrada.id}
            <button onClick={() => detalharFornecedor(entrada.id)} className="ml-2 text-blue-500">Detalhar</button>
            <button onClick={() => excluirFornecedor(entrada.id)} className="ml-2 text-red-500">Excluir</button>
          </li>
        ))}
      </ul>

      {entradaProdutoDetalhado && (
        <div>
          <Title>Detalhes da Entrada de Produto</Title>
          <p>ID: {entradaProdutoDetalhado.id}</p>
          <p>Data e Hora: {entradaProdutoDetalhado.dataHora}</p>
          <p>Quantidade: {entradaProdutoDetalhado.quantidade}</p>
          <p>Fornecedor: {entradaProdutoDetalhado.fornecedor}</p>
          <p>Produto: {entradaProdutoDetalhado.produto}</p>
          <p>Preço: {entradaProdutoDetalhado.preco}</p>
        </div>
      )}
    </Container>
  );
};

export default EntradaProduto;
