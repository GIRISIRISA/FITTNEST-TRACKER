import React from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authentication from "./pages/Authentication.jsx";
import NavBar from "./components/NavBar.jsx";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard.jsx";
import Workouts from "./pages/Workouts.jsx";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          {currentUser ? (
            <>
              <NavBar currentUser={currentUser} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </>
          ) : (
            <Authentication />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

