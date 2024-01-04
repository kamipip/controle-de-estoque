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

const Produto = () => {
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    descricao: '',
    quantidadeEstoque: 0,
    preco: 0,
    categoria: { id: 0 },
    fabricante: { id: 0 },
  });

  const [produtos, setProdutos] = useState([]);
  const [produtoDetalhado, setProdutoDetalhado] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  const criarNovoProduto = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/produtos', novoProduto);

      const response = await axios.get('http://localhost:8080/produtos');
      setProdutos(response.data);

      setNovoProduto({
        nome: '',
        descricao: '',
        quantidadeEstoque: 0,
        preco: 0,
        categoria: { id: 0 },
        fabricante: { id: 0 },
      });
    } catch (error) {
      console.error('Erro ao criar novo produto:', error);
    }
  };

  const detalharProduto = (id) => {
    const produtoDetalhado = produtos.find((produto) => produto.id === id);
    setProdutoDetalhado(produtoDetalhado);
  };

  const excluirProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/produtos/${id}`);

      const response = await axios.get('http://localhost:8080/produtos');
      setProdutos(response.data);

      if (produtoDetalhado && produtoDetalhado.id === id) {
        setProdutoDetalhado(null);
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={criarNovoProduto}>
        <Title>Novo Produto</Title>
        <Label htmlFor="nome">Nome:
          <Input
            type="text"
            id="nome"
            name="nome"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="descricao">Descrição:
          <Input
            type="text"
            id="descricao"
            name="descricao"
            value={novoProduto.descricao}
            onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="quantidadeEstoque">Quantidade em Estoque:
          <Input
            type="number"
            id="quantidadeEstoque"
            name="quantidadeEstoque"
            value={novoProduto.quantidadeEstoque}
            onChange={(e) => setNovoProduto({ ...novoProduto, quantidadeEstoque: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="preco">Preço:
          <Input
            type="number"
            id="preco"
            name="preco"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="categoria">Categoria:
          <Input
            type="number"
            id="categoria"
            name="categoria"
            value={novoProduto.categoria.id}
            onChange={(e) => setNovoProduto({ ...novoProduto, categoria: { id: e.target.value } })}
            required
          />
        </Label>
        <Label htmlFor="fabricante">Fabricante:
          <Input
            type="number"
            id="fabricante"
            name="fabricante"
            value={novoProduto.fabricante.id}
            onChange={(e) => setNovoProduto({ ...novoProduto, fabricante: { id: e.target.value } })}
            required
          />
        </Label>
        <Button type="submit">Criar Produto</Button>
      </FormContainer>

      <hr className="my-4" />

      <Title>Lista de Produtos</Title>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} className="mb-2">
            {produto.nome}
            <Button onClick={() => detalharProduto(produto.id)}>Detalhar</Button>
            <Button onClick={() => excluirProduto(produto.id)}>Excluir</Button>
          </li>
        ))}
      </ul>

      {produtoDetalhado && (
        <div>
          <Title>Detalhes do Produto</Title>
          <p>ID: {produtoDetalhado.id}</p>
          <p>Nome: {produtoDetalhado.nome}</p>
          <p

>Descrição: {produtoDetalhado.descricao}</p>
          <p>Quantidade em Estoque: {produtoDetalhado.quantidadeEstoque}</p>
          <p>Preço: {produtoDetalhado.preco}</p>
          <p>Categoria: {produtoDetalhado.categoria.id}</p>
          <p>Fabricante: {produtoDetalhado.fabricante.id}</p>
        </div>
      )}
    </Container>
  );
};

export default Produto;
