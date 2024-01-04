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

const Fornecedor = () => {
  const [novofornecedor, setNovofornecedor] = useState({
    nome: '',
    rua: '',
    numero: '',
    bairro: '',
    cep: '',
  });

  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorDetalhado, setFornecedorDetalhado] = useState(null);
  const [fornecedorEditando, setFornecedorEditando] = useState(false);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };

    fetchFornecedores();
  }, []);

  const criarNovoFornecedor = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/fornecedores', novofornecedor);

      const response = await axios.get('http://localhost:8080/fornecedores');
      setFornecedores(response.data);

      setNovofornecedor({
        nome: '',
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
      });
    } catch (error) {
      console.error('Erro ao criar novo fornecedor:', error);
    }
  };

  const detalharFornecedor = (id) => {
    const fornecedorDetalhado = fornecedores.find((fornecedor) => fornecedor.id === id);
    setFornecedorDetalhado(fornecedorDetalhado);
    setFornecedorEditando(false);
  };

  const editarFornecedor = (fornecedor) => {
    setNovofornecedor({ ...fornecedor });
    setFornecedorEditando(true);
  };

  const excluirFornecedor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fornecedores/${id}`);

      const response = await axios.get('http://localhost:8080/fornecedores');
      setFornecedores(response.data);

      if (fornecedorDetalhado && fornecedorDetalhado.id === id) {
        setFornecedorDetalhado(null);
      }
    } catch (error) {
      console.error('Erro ao excluir fornecedor:', error);
    }
  };

  const atualizarFornecedor = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/fornecedores/${novofornecedor.id}`, novofornecedor);

      const response = await axios.get('http://localhost:8080/fornecedores');
      setFornecedores(response.data);

      setFornecedorDetalhado(null);
      setFornecedorEditando(false);
      setNovofornecedor({
        nome: '',
        rua: '',
        numero: '',
        bairro: '',
       

 cep: '',
      });
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
    }
  };

  const cancelarEdicao = () => {
    setNovofornecedor({
      nome: '',
      rua: '',
      numero: '',
      bairro: '',
      cep: '',
    }); 
    setFornecedorEditando(false);
  };

  return (
    <Container>
      <FormContainer onSubmit={fornecedorEditando ? atualizarFornecedor : criarNovoFornecedor}>
        <Title>Novo Fornecedor</Title>
        <Label htmlFor="nome">Nome:
          <Input
            type="text"
            id="nome"
            name="nome"
            value={novofornecedor.nome}
            onChange={(e) => setNovofornecedor({ ...novofornecedor, nome: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="rua">Rua:
          <Input
            type="text"
            id="rua"
            name="rua"
            value={novofornecedor.rua}
            onChange={(e) => setNovofornecedor({ ...novofornecedor, rua: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="numero">Numero:
          <Input
            type="text"
            id="numero"
            name="numero"
            value={novofornecedor.numero}
            onChange={(e) => setNovofornecedor({ ...novofornecedor, numero: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="bairro">Bairro:
          <Input
            type="text"
            id="bairro"
            name="bairro"
            value={novofornecedor.bairro}
            onChange={(e) => setNovofornecedor({ ...novofornecedor, bairro: e.target.value })}
            required
          />
        </Label>
        <Label htmlFor="cep">CEP:
          <Input
            type="text"
            id="cep"
            name="cep"
            value={novofornecedor.cep}
            onChange={(e) => setNovofornecedor({ ...novofornecedor, cep: e.target.value })}
            required
          />
        </Label>
        <Button type="submit">{fornecedorEditando ? 'Salvar Alterações' : 'Criar Fornecedor'}</Button>
        {fornecedorEditando && (
          <Button type="button" onClick={cancelarEdicao}>Cancelar</Button>
        )}
      </FormContainer>

      <hr className="my-4" />

      <Title>Lista de Fornecedores</Title>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id} className="mb-2">
            {fornecedor.nome}
            <Button onClick={() => detalharFornecedor(fornecedor.id)}>Detalhar</Button>
            <Button onClick={() => editarFornecedor(fornecedor)}>Editar</Button>
            <Button onClick={() => excluirFornecedor(fornecedor.id)}>Excluir</Button>
          </li>
        ))}
      </ul>

      {fornecedorDetalhado && (
        <div>
          <Title>Detalhes do Fornecedor</Title>
          <p>ID: {fornecedorDetalhado.id}</p>
          <p>Nome: {fornecedorDetalhado.nome}</p>
          <p>Rua: {fornecedorDetalhado.rua}</p>
          <p>Numero: {fornecedorDetalhado.numero}</p>
          <p>Bairro: {fornecedorDetalhado.bairro}</p>
          <p>CEP: {fornecedorDetalhado.cep}</p>
        </div>
      )}
    </Container>
  );
};

export default Fornecedor;
