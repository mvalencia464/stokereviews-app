import { useAuth } from './contexts/AuthContext';
import { Dashboard } from './components/Dashboard';
import { SignIn } from './components/SignIn';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Dashboard /> : <SignIn />;
}

export default App;