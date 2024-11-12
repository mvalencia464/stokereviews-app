import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App'; // Change this line to use curly braces

import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <AuthProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AuthProvider>
  </StrictMode>
);
