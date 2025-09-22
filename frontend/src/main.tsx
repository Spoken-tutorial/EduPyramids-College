import { useMemo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// create a client
const queryClient = new QueryClient();

function Root() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  //Remember choice
  useEffect(() => {
    const saved = localStorage.getItem('mode') as 'light' | 'dark' | null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', mode)
  }, [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        
      </BrowserRouter>
      
    </ThemeProvider>
  );
  
}
ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);