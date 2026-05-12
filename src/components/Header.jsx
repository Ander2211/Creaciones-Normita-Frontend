import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Error calling logout API", err);
    }
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  // Close menu when clicking outside (mobile)
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen]);

  const NavItem = ({ to, children, onClick }) => (
    <NavLink
      to={to}
      onClick={() => {
        setMenuOpen(false);
        if (onClick) onClick();
      }}
      className={({ isActive }) =>
        `block text-sm font-bold uppercase tracking-widest transition-colors py-2 px-4 ${
          isActive ? "text-pink-600" : "text-slate-700 hover:text-pink-600"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-pink-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-pink-200">
            N
          </div>
          <span className="text-xl font-black text-slate-800 uppercase tracking-tighter">
            Creaciones Normita
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Productos
          </NavLink>
          <NavLink
            to="/nosotros"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Nosotros
          </NavLink>
          <NavLink
            to="/contacto"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Contacto
          </NavLink>
          <NavLink
            to="/ordenar"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                  : "text-slate-500 hover:text-pink-600"
              }`
            }
          >
            Como Ordenar?
          </NavLink>
          {user?.role === "Administrador" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "text-pink-600 border-b-2 border-pink-500 pb-1"
                    : "text-slate-500 hover:text-pink-600"
                }`
              }
            >
              Panel Admin
            </NavLink>
          )}
        </nav>

        {/* Mobile actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-medium text-slate-700 hidden lg:inline-block">
                Hola,{" "}
                <span className="font-bold text-pink-600">{user.nombre}</span>
              </span>
              <button
                onClick={handleLogout}
                className="hidden md:inline-block bg-slate-800 text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-md"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="hidden md:inline-block bg-pink-500 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-md"
            >
              Login
            </NavLink>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="md:hidden p-2 rounded-md bg-white/50 backdrop-blur-sm border border-pink-50 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div ref={menuRef} className="md:hidden">
          <div className="absolute right-4 top-20 z-50 w-[90vw] max-w-xs bg-white rounded-2xl shadow-2xl border border-pink-50 p-4">
            <nav className="flex flex-col gap-1">
              <NavItem to="/">Inicio</NavItem>
              <NavItem to="/productos">Productos</NavItem>
              <NavItem to="/nosotros">Nosotros</NavItem>
              <NavItem to="/contacto">Contacto</NavItem>
              <NavItem to="/ordenar">Como Ordenar?</NavItem>
              {user?.role === "Administrador" && (
                <NavItem to="/admin">Panel Admin</NavItem>
              )}
            </nav>

            <div className="mt-4">
              {user ? (
                <>
                  <div className="text-sm text-slate-600 mb-3">
                    Hola,{" "}
                    <span className="font-bold text-pink-600">
                      {user.nombre}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-slate-800 text-white py-2 rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-900 transition-all"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full block text-center bg-pink-500 text-white py-2 rounded-full text-sm font-black uppercase tracking-widest hover:bg-pink-600 transition-all"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
