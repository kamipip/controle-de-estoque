import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/SideBar';
import styled from 'styled-components';

const API_BASE_URL = 'http://localhost:8080/login';

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

  transition: box-shadow 0.3s ease; /* Adiciona uma transição suave para a mudança de sombra */

  &:hover {
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4); /* Altera a sombra ao passar o mouse */
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
  transition: transform 0.3s ease; /* Adiciona uma transição suave para a animação */

  &:hover {
    background-color: #303030; /* Altera a cor ao passar o mouse */
  }

  &:active {
    transform: scale(0.95); /* Reduz o tamanho ao clicar */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const Login = ({ setAuth }) => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}`, { username: login, password: senha });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuth(true);
    } catch (error) {
      setError('Login falhou. Por favor, verifique suas credenciais.');
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleLogin}>
        <Title>Login</Title>
        <Label>
          Nome:
          <Input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
        </Label>
        <Label>
          Senha:
          <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </Label>
        <Button type="submit">Entrar</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FormContainer>
    </Container>
  );
};

const PrivateRoute = ({ auth, element }) => (
  auth ? element : <Navigate to="/DSC" />
);

const App = () => {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setAuth={setAuth} />}
        />
        <Route
          path="/DSC"
          element={<PrivateRoute auth={auth} element={<Sidebar />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;