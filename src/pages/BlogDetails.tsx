import { Link, useParams } from "react-router-dom";
import { usePosts } from "../context/PostsContext";

function BlogDetails() {
  const { id } = useParams();
  const { posts, loading, error } = usePosts();

  const post = posts.find(
    (post) => post.id === id && post.status === "Published"
  );

  if (loading) {
    return <p>Loading post...</p>;
  }

  if (error) {
    return (
      <div className="blog-details-page">
        <p>{error}</p>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-details-page">
        <h1>Post Not Found</h1>
        <p>This post doesn't exist or isn't published.</p>
        <Link to="/blog">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page">
      <Link to="/blog" className="back-to-blog">
        ← Back to Blog
      </Link>

      <article className="blog-details">
        <h1>{post.title}</h1>

        <p className="blog-details-description">
          {post.description}
        </p>

        <div className="blog-meta">
          <span>
            Published:{" "}
            {new Date(post.created_at).toLocaleString()}
          </span>

          {post.updated_at !== post.created_at && (
            <span>
              Updated:{" "}
              {new Date(post.updated_at).toLocaleString()}
            </span>
          )}
        </div>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="blog-details-image"
          />
        )}

        <div className="blog-details-content">
          {post.content}
        </div>
      </article>
    </div>
  );
}

export default BlogDetails;