import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthContextProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<p>Accessing public route</p>} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Auth />} />
          <Route path='*' element={<p>404 not found</p>} status={404} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
