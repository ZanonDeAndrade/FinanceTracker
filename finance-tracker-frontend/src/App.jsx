import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './assets/components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
