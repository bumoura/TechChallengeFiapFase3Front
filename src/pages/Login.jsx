import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    login(form.username, form.password); // MOCK
    navigate(state?.from || "/admin", { replace: true });
  };

  return (
    <main>
      <div className="card">
        <h2>Login (Professores)</h2>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
          <input placeholder="Usuário" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
          <input type="password" placeholder="Senha" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button type="submit">Entrar</button>
        </form>
        <p style={{ marginTop: 8, color: "#666" }}>(Mock) Aceita qualquer usuário/senha.</p>
      </div>
    </main>
  );
}