import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <p>ACCESSED!</p>
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Auth />} />
        <Route path='*' element={<p>404 not found</p>} status={404} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
