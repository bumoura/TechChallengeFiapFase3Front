import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost, getPosts } from "../api/posts";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setPosts(await getPosts()); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Excluir este post?")) return;
    try { await deletePost(id, user?.token); await load(); } catch (e) { console.error(e); alert("Erro ao excluir."); }
  };

  if (loading) return <main><p>Carregando...</p></main>;

  return (
    <main>
      <div className="card">
        <h2>Administração</h2>
        <ul>
          {posts.map(p => (
            <li key={p._id} style={{ margin: "8px 0" }}>
              <strong>{p.title}</strong> — {p.author || "—"} &nbsp;
              <Link to={`/edit/${p._id}`}>Editar</Link> &nbsp;|&nbsp;
              <button onClick={() => onDelete(p._id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}