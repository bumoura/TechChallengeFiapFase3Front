import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePost } from "../api/posts";
import { useAuth } from "../context/AuthContext";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", author: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { (async () => {
    try {
      const p = await getPostById(id);
      setForm({ title: p.title || "", author: p.author || "", content: p.content || "" });
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  })(); }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updatePost(id, form, user?.token);
      navigate("/admin");
    } catch (e) { console.error(e); alert("Erro ao salvar."); }
    finally { setSaving(false); }
  };

  if (loading) return <main><p>Carregando...</p></main>;

  return (
    <main>
      <div className="card">
        <h2>Editar Post</h2>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
          <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Autor" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <textarea rows={8} placeholder="Conteúdo" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</button>
        </form>
      </div>
    </main>
  );
}