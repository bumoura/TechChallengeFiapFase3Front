import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const Bar = styled.nav`
  display: flex; gap: 12px; align-items:center;
  padding: 12px 16px; background: #222; color: #fff;
  a { color: #fff; text-decoration: none; }
  .spacer { flex: 1; }
  button { background:#fff; color:#222; border:0; padding:6px 10px; border-radius:8px; cursor:pointer; }
`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Bar>
      <Link to="/">Blog</Link>
      <Link to="/admin">Admin</Link>
      {user && <Link to="/create">Novo Post</Link>}
      <div className="spacer" />
      {user ? (
        <>
          <span>Olá, {user.username}</span>
          <button onClick={() => { logout(); navigate("/"); }}>Sair</button>
        </>
      ) : (
        <Link to="/login">Entrar</Link>
      )}
    </Bar>
  );
}