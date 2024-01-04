import React, { useState } from 'react';
import styled from 'styled-components';

import Categoria from './Categoria';
import Cliente from './Cliente';
import EntradaProduto from './EntradaProduto';
import Fabricante from './Fabricante';
import Fornecedor from './Fornecedor';
import Produto from './Produto';
import Venda from './Venda';





const Container = styled.div`
  background-color: #00BFFF;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SidebarContainer = styled.aside`
  width: 64px;
  background-color: #00BFFF;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

const SidebarTitle = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SidebarButton = styled.button`
  margin-bottom: 8px;
  padding: 8px;
  width: 100%;
  background-color: ${(props) => (props.selected ? '#303030' : 'inherit')};
  color: ${(props) => (props.selected ? 'white' : 'inherit')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #303030;
    color: white;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case 'Categoria':
        return <Categoria />;
      case 'Cliente':
        return <Cliente />;
      case 'Entrada Produto':
        return <EntradaProduto />;
      case 'Fabricante':
        return <Fabricante />;
      case 'Fornecedor':
        return <Fornecedor />;
      case 'Produto':
        return <Produto />;
      case 'Venda':
        return <Venda />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <SidebarContainer>
        <div>
          <SidebarTitle>Controle De Estoque</SidebarTitle>
        </div>
        <div>
          <SidebarButton onClick={() => handleItemClick('Categoria')} selected={selectedItem === 'Categoria'}>
            Categoria
          </SidebarButton>
          <SidebarButton onClick={() => handleItemClick('Cliente')} selected={selectedItem === 'Cliente'}>
            Cliente
          </SidebarButton>
          <SidebarButton onClick={() => handleItemClick('Entrada Produto')} selected={selectedItem === 'Entrada Produto'}>
            Entrada Produto
          </SidebarButton>
          <SidebarButton onClick={() => handleItemClick('Fabricante')} selected={selectedItem === 'Fabricante'}>
            Fabricante
          </SidebarButton>
          <SidebarButton onClick={() => handleItemClick('Fornecedor')} selected={selectedItem === 'Fornecedor'}>
            Fornecedor
          </SidebarButton>
          <SidebarButton onClick={() => handleItemClick('Produto')} selected={selectedItem === 'Produto'}>
            Produto
          </SidebarButton>
          <SidebarButton onClick={() => handleItemClick('Venda')} selected={selectedItem === 'Venda'}>
            Venda
          </SidebarButton>
        </div>
      </SidebarContainer>

      <ContentContainer>
        <main>{selectedItem && renderComponent()}</main>
      </ContentContainer>
    </Container>
  );
};

export default Sidebar;
