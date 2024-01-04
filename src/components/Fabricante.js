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

const Fabricante = () => {
  const [novafabricante, setNovafabricante] = useState({
    nome: '',
  });

  const [fabricantes, setFabricantes] = useState([]);
  const [fabricanteDetalhada, setFabricanteDetalhada] = useState(null);
  const [fabricanteEditando, setFabricanteEditando] = useState(false);

  useEffect(() => {
    const fetchFabricantes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fabricantes');
        setFabricantes(response.data);
      } catch (error) {
        console.error('Erro ao buscar fabricantes:', error);
      }
    };
    fetchFabricantes();
  }, []);

  const criarNovaFabricante = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/fabricantes', novafabricante);
      const response = await axios.get('http://localhost:8080/fabricantes');
      setFabricantes(response.data);
      setNovafabricante({ nome: '' });
    } catch (error) {
      console.error('Erro ao criar nova fabricante:', error);
    }
  };

  const detalharFabricante = (id) => {
    const fabricanteDetalhada = fabricantes.find((fabricante) => fabricante.id === id);
    setFabricanteDetalhada(fabricanteDetalhada);
    setFabricanteEditando(false);
  };

  const editarFabricante = (fabricante) => {
    setNovafabricante({ ...fabricante });
    setFabricanteEditando(true);
  };

  const excluirFabricante = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fabricantes/${id}`);
      const response = await axios.get('http://localhost:8080/fabricantes');
      setFabricantes(response.data);

      if (fabricanteDetalhada && fabricanteDetalhada.id === id) {
        setFabricanteDetalhada(null);
      }
    } catch (error) {
      console.error('Erro ao excluir fabricante:', error);
    }
  };

  const atualizarFabricante = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/fabricantes/${novafabricante.id}`, novafabricante);

      const response = await axios.get('http://localhost:8080/fabricantes');
      setFabricantes(response.data);

      setFabricanteDetalhada(null);
      setFabricanteEditando(false);
      setNovafabricante({ nome: '' });
    } catch (error) {
      console.error('Erro ao atualizar fabricante:', error);
    }
  };

  const cancelarEdicao = () => {
    setNovafabricante({ nome: '' });
    setFabricanteEditando(false);
  };

  return (
    <Container>
      <FormContainer onSubmit={fabricanteEditando ? atualizarFabricante : criarNovaFabricante}>
        <Title>Novo Fabricante</Title>
        <Label htmlFor="nome">Nome:
          <Input
            type="text"
            id="nome"
            name="nome"
            value={novafabricante.nome}
            onChange={(e) => setNovafabricante({ ...novafabricante, nome: e.target.value })}
            required
          />
        </Label>
        <Button type="submit">{fabricanteEditando ? 'Salvar Alterações' : 'Criar Fabricante'}</Button>
      </FormContainer>

      <hr className="my-4" />

      <Title>Lista de Fabricantes</Title>
      <ul>
        {fabricantes.map((fabricante) => (
          <li key={fabricante.id} className="mb-2">
            {fabricante.nome}
            <Button onClick={() => detalharFabricante(fabricante.id)} className="ml-2 text-blue-500">Detalhar</Button>
            <Button onClick={() => editarFabricante(fabricante)} className="ml-2 text-yellow-500">Editar</Button>
            <Button onClick={() => excluirFabricante(fabricante.id)} className="ml-2 text-red-500">Excluir</Button>
          </li>
        ))}
      </ul>

      {fabricanteDetalhada && (
        <div>
          <Title>Detalhes da Fabricante</Title>
          <p>ID: {fabricanteDetalhada.id}</p>
          <p>Nome: {fabricanteDetalhada.nome}</p>
        </div>
      )}
    </Container>
  );
};

export default Fabricante;
