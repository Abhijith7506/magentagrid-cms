import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";


type Post = {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

function PreviewPost() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      if (!id) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      setPost(data);
      setLoading(false);
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading preview...</p>;
  }

  if (error || !post) {
    return (
      <div className="preview-page">
        <h1>Post not found</h1>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="preview-page">

      <div className="preview-header">
        <Link to="/dashboard">
          ← Back to Dashboard
        </Link>

        <span className="preview-badge">
          Preview — {post.status}
        </span>
      </div>

      <article className="preview-article">

        <h1>{post.title}</h1>

        <p className="preview-description">
          {post.description}
        </p>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
          />
        )}

        <div className="preview-content">
          {post.content}
        </div>

      </article>

    </div>
  );
}

export default PreviewPost;