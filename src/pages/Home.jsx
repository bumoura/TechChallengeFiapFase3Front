import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getPosts, searchPosts } from "../api/posts";

const List = styled.div`display: grid; gap: 12px;`;
const Row = styled.div`
  background:#fff; border:1px solid #eee; border-radius:12px; padding:16px;
  h3 { margin: 0 0 6px 0; }
  p { margin: 0; color:#555; }
`;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = term ? await searchPosts(term) : await getPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const empty = useMemo(() => !loading && posts.length === 0, [loading, posts]);

  return (
    <main>
      <div className="card" style={{ marginBottom: 16 }}>
        <h2>Posts</h2>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input placeholder="Buscar por palavra-chave..." value={term} onChange={(e) => setTerm(e.target.value)} />
          <button onClick={load}>Buscar</button>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {empty && <p>Nenhum post encontrado.</p>}

      <List>
        {posts.map((p) => (
          <Row key={p._id}>
            <h3><Link to={`/post/${p._id}`}>{p.title}</Link></h3>
            <p><strong>Autor:</strong> {p.author || "—"}</p>
            <p>{(p.content || "").slice(0, 160)}{(p.content || "").length > 160 ? "..." : ""}</p>
          </Row>
        ))}
      </List>
    </main>
  );
}