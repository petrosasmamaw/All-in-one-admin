import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../Slice/authSlice'

const Navbar = ({ user, userId, status }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isAuthenticated = !!user && status === 'succeeded'

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <header className="app-navbar">
      <div className="page-header-row" style={{margin:0}}>

        <div>
          <h3 style={{margin:0}}>ALL IN ONE</h3>
          <p className="muted" style={{margin:0}}>Admin quick actions</p>
        </div>
      </div>
      <div className="nav-brand">
        <Link to="/">Admin</Link>
      </div>

      <nav className="nav-links">
        {isAuthenticated ? (
          <>
            <Link to="/" className="nav-btn">Dashboard</Link>
            <Link to="/clients" className="nav-btn">Clients</Link>
            <Link to="/sellers" className="nav-btn">Sellers</Link>
          </>
        ) : null}
      </nav>

      <div className="nav-actions">
        {status === 'loading' ? (
          <div className="nav-loading nav-btn outline">Checking...</div>
        ) : !isAuthenticated ? (
          <>
            <Link to="/login" className="nav-btn outline">Login</Link>
            <Link to="/register" className="nav-btn primary">Register</Link>
          </>
        ) : (
          <>
            <div className="nav-user">
              <div className="nav-user-avatar">{user && user.email}</div>
            </div>
            <button onClick={handleLogout} className="nav-btn ghost">Logout</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
