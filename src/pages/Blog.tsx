import PostCard from "../components/PostCard";
import { usePosts } from "../context/PostsContext";

function Blog() {
  const { posts, loading, error } = usePosts();

  const publishedPosts = posts.filter(
    (post) => post.status === "Published"
  );

  return (
    <div className="blog-page">
      <h1>Blog</h1>

      {loading && <p>Loading posts...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && publishedPosts.length === 0 && (
        <p>No published posts yet.</p>
      )}

      {publishedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Blog;