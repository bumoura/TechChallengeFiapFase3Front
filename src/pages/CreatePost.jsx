import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import { useAuth } from "../context/AuthContext";

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await createPost(form, user?.token);
      navigate("/");
    } catch (e) { console.error(e); alert("Erro ao criar post."); }
    finally { setSaving(false); }
  };

  return (
    <main>
      <div className="card">
        <h2>Novo Post</h2>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
          <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <textarea rows={8} placeholder="Conteúdo" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar"}</button>
        </form>
      </div>
    </main>
  );
}