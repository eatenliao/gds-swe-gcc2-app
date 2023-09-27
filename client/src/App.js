// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';  
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

function App() {

  const colors = {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  }

  const theme = extendTheme({ colors })

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
