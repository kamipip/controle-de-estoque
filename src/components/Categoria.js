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

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState({ nome: '' });
  const [categoriaDetalhada, setCategoriaDetalhada] = useState(null);
  const [categoriaEditando, setCategoriaEditando] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const criarNovaCategoria = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/categorias', novaCategoria);

      const response = await axios.get('http://localhost:8080/categorias');
      setCategorias(response.data);

      setNovaCategoria({ nome: '' });
    } catch (error) {
      console.error('Erro ao criar nova categoria:', error);
    }
  };

  const detalharCategoria = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/categorias/${id}`);
      setCategoriaDetalhada(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da categoria:', error);
    }
  };

  const editarCategoria = (categoria) => {
    setCategoriaDetalhada(categoria);
    setCategoriaEditando(true);
  };

  const excluirCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/categorias/${id}`);

      const response = await axios.get('http://localhost:8080/categorias');
      setCategorias(response.data);

      if (categoriaDetalhada && categoriaDetalhada.id === id) {
        setCategoriaDetalhada(null);
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  const atualizarCategoria = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/categorias/${categoriaDetalhada.id}`, categoriaDetalhada);

      const response = await axios.get('http://localhost:8080/categorias');
      setCategorias(response.data);

      setCategoriaDetalhada(null);
      setCategoriaEditando(false);
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
    }
  };

  const cancelarEdicao = () => {
    setCategoriaDetalhada(null);
    setCategoriaEditando(false);
  };

  return (
    <Container>
      <FormContainer>
        <Title>Criar Nova Categoria</Title>
        <form onSubmit={criarNovaCategoria}>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={novaCategoria.nome}
            onChange={(e) => setNovaCategoria({ nome: e.target.value })}
            required
          />
          <Button type="submit">Criar Categoria</Button>
        </form>
      </FormContainer>

      <hr />

      <div>
        <Title>Lista de Categorias</Title>
        <ul>
          {categorias.map((categoria) => (
            <li key={categoria.id}>
              {categoria.nome}
              <Button onClick={() => detalharCategoria(categoria.id)}>Detalhar</Button>
              <Button onClick={() => editarCategoria(categoria)}>Editar</Button>
              <Button onClick={() => excluirCategoria(categoria.id)}>Excluir</Button>
            </li>
          ))}
        </ul>
      </div>

      {categoriaDetalhada && categoriaEditando && (
        <FormContainer>
          <Title>Editar Categoria</Title>
          <form onSubmit={atualizarCategoria}>
            <Input type="hidden" value={categoriaDetalhada.id} name="id" />
            <Label>Nome:</Label>
            <Input
              type="text"
              value={categoriaDetalhada.nome}
              onChange={(e) => setCategoriaDetalhada({ ...categoriaDetalhada, nome: e.target.value })}
              required
            />
            <div>
              <Button type="submit">Salvar Alterações</Button>
              <Button onClick={cancelarEdicao}>Cancelar</Button>
            </div>
          </form>
        </FormContainer>
      )}

      {categoriaDetalhada && !categoriaEditando && (
        <FormContainer>
          <Title>Detalhes da Categoria</Title>
          <p>ID: {categoriaDetalhada.id}</p>
          <p>Nome: {categoriaDetalhada.nome}</p>
        </FormContainer>
      )}
    </Container>
  );
};

export default Categoria;
