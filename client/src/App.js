import { useState, useEffect } from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    checkAuthStatus();
    
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  const checkAuthStatus = () => {
    const localUser = localStorage.getItem('user');
    const hasUser = localUser !== null && localUser !== 'null';
                     
    setIsAuthenticated(hasUser);
  };

  return (
      <div className="App">
        {isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
      </div>
  );
}

export default App;