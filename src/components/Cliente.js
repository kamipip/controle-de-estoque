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

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    rua: '',
    numero: '',
    bairro: '',
    cep: '',
  });
  const [clienteDetalhado, setClienteDetalhado] = useState(null);
  const [clienteEditando, setClienteEditando] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const criarNovoCliente = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/clientes', novoCliente);

      const response = await axios.get('http://localhost:8080/clientes');
      setClientes(response.data);

      setNovoCliente({
        nome: '',
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
      });
    } catch (error) {
      console.error('Erro ao criar novo cliente:', error);
    }
  };

  const detalharCliente = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/clientes/${id}`);
      setClienteDetalhado(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do cliente:', error);
    }
  };

  const editarCliente = (cliente) => {
    setClienteDetalhado(cliente);
    setClienteEditando(true);
  };

  const excluirCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/clientes/${id}`);

      const response = await axios.get('http://localhost:8080/clientes');
      setClientes(response.data);

      if (clienteDetalhado && clienteDetalhado.id === id) {
        setClienteDetalhado(null);
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const atualizarCliente = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/clientes/${clienteDetalhado.id}`, clienteDetalhado);

      const response = await axios.get('http://localhost:8080/clientes');
      setClientes(response.data);

      setClienteDetalhado(null);
      setClienteEditando(false);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const cancelarEdicao = () => {
    setClienteDetalhado(null);
    setClienteEditando(false);
  };

  return (
    <Container>
      <FormContainer onSubmit={criarNovoCliente}>
        <Title>ovo Cliente</Title>
        <Label>Nome:</Label>
        <Input
          type="text"
          value={novoCliente.nome}
          onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
          required
        />
        <Label>Rua:</Label>
        <Input
          type="text"
          value={novoCliente.rua}
          onChange={(e) => setNovoCliente({ ...novoCliente, rua: e.target.value })}
          required
        />
        <Label>Numero:</Label>
        <Input
          type="number"
          value={novoCliente.numero}
          onChange={(e) => setNovoCliente({ ...novoCliente, numero: e.target.value })}
          required
        />
        <Label>Bairro:</Label>
        <Input
          type="text"
          value={novoCliente.bairro}
          onChange={(e) => setNovoCliente({ ...novoCliente, bairro: e.target.value })}
          required
        />
        <Label>CEP:</Label>
        <Input
          type="text"
          value={novoCliente.cep}
          onChange={(e) => setNovoCliente({ ...novoCliente, cep: e.target.value })}
          required
        />
        <Button type="submit">Criar Cliente</Button>
      </FormContainer>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id} className="mb-2">
              {cliente.nome}
              <button onClick={() => detalharCliente(cliente.id)} className="ml-2 text-blue-500">Detalhar</button>
              <button onClick={() => editarCliente(cliente)} className="ml-2 text-yellow-500">Editar</button>
              <button onClick={() => excluirCliente(cliente.id)} className="ml-2 text-red-500">Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      {clienteDetalhado && clienteEditando && (
        <FormContainer onSubmit={atualizarCliente}>
          <input type="hidden" value={clienteDetalhado.id} name="id" />
          <Title>Editar Cliente</Title>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={clienteDetalhado.nome}
            onChange={(e) => setClienteDetalhado({ ...clienteDetalhado, nome: e.target.value })}
            required
          />
          <Label>Rua:</Label>
          <Input
            type="text"
            value={clienteDetalhado.rua}
            onChange={(e) => setClienteDetalhado({ ...clienteDetalhado, rua: e.target.value })}
            required
          />
          <Label>Numero:</Label>
          <Input
            type="number"
            value={clienteDetalhado.numero}
            onChange={(e) => setClienteDetalhado({ ...clienteDetalhado, numero: e.target.value })}
            required
          />
          <Label>Bairro:</Label>
          <Input
            type="text"
            value={clienteDetalhado.bairro}
            onChange={(e) => setClienteDetalhado({ ...clienteDetalhado, bairro: e.target.value })}
            required
          />
          <Label>CEP:</Label>
          <Input
            type="text"
            value={clienteDetalhado.cep}
            onChange={(e) => setClienteDetalhado({ ...clienteDetalhado, cep: e.target.value })}
            required
          />
          <Button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
            Salvar Alterações
          </Button>
          <Button onClick={cancelarEdicao} className="bg-gray-500 text-white py-2 px-4 rounded">
            Cancelar
          </Button>
        </FormContainer>
      )}

      {clienteDetalhado && !clienteEditando && (
        <div className="mb-6 p-6 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Detalhes do Cliente</h2>
          <p>ID: {clienteDetalhado.id}</p>
          <p>Nome: {clienteDetalhado.nome}</p>
          <p>Rua: {clienteDetalhado.rua}</p>
          <p>Numero: {clienteDetalhado.numero}</p>
          <p>Bairro: {clienteDetalhado.bairro}</p>
          <p>CEP: {clienteDetalhado.cep}</p>
        </div>
      )}
    </Container>
  );
};

export default Cliente;
