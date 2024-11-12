import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Dashboard } from './components/Dashboard';
import { SignIn } from './components/SignIn';
import { Demo } from './components/Demo';
import { LoadingSpinner } from './components/LoadingSpinner';

export function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/demo" element={<Demo />} />
        <Route path="/" element={user ? <Dashboard /> : <SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}