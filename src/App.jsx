import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from './Components/Pages/navbar';
import Login from './Components/Pages/login';
import Register from './Components/Pages/register';
import Clients from './Components/Pages/clients';
import Dashboard from './Components/Pages/dashboard';
import Sellers from './Components/Pages/sellers';
import { fetchSession } from './Components/Slice/authSlice';
import AdminFooter from './Components/Pages/footer';

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector(s => s.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // fetch session on mount; routing decisions handled by route guards
    dispatch(fetchSession());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const currentUser = user?.user || user || null;
  const userId = currentUser?.id || null;
  const isAuthenticated = !!currentUser && status === 'succeeded';

  const RequireAuth = ({ children }) => {
    // while checking session, avoid flashing protected UI
    if (status === 'loading') return null;
    return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
  };

  return (
    <>
      <Navbar user={currentUser} userId={userId} status={status} />
      <div style={{ padding: 12 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
          />

          <Route
            path="/"
            element={<RequireAuth><Outlet /></RequireAuth>}
          >
            <Route path="dashboard" element={<Dashboard user={currentUser} userId={userId} />} />
            <Route path="clients" element={<Clients user={currentUser} userId={userId} />} />
            <Route path="sellers" element={<Sellers user={currentUser} userId={userId} />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AdminFooter />
      </div>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
