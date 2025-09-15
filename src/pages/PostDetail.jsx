import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => { (async () => {
    try { setPost(await getPostById(id)); } catch (e) { console.error(e); }
  })(); }, [id]);

  if (!post) return <main><p>Carregando...</p></main>;

  return (
    <main>
      <div className="card">
        <h2>{post.title}</h2>
        <p><strong>Autor:</strong> {post.author || "—"}</p>
        <p style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{post.content}</p>
        <hr style={{ margin: "16px 0" }} />
        <h3>Comentários (opcional)</h3>
        <p>[Placeholder]</p>
      </div>
    </main>
  );
}