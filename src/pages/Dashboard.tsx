import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePosts } from "../context/PostsContext";



function Dashboard() {
const { posts, loading, error: postsError } = usePosts();

const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const navigate = useNavigate();

const { role } = useAuth();
async function handleLogout() {
  await supabase.auth.signOut();
  navigate("/login");
  
}
async function handleDelete(id: string) {
     setError("");
    setSuccess("");
  const confirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmed) {
  
    return;
   
  }

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    setError(error.message);
    console.log("Delete error:", error.message);
    return;
  }

  console.log("Deleted rows:", data);

  if (!data || data.length === 0) {
    setError("Post was not deleted.");
    return;
  }


  setShowSuccessDialog(true);
setSuccess("Post deleted successfully!");
}
async function handlePublishToggle(id: string, currentStatus: string) {
  setError("");
  setSuccess("");
  const newStatus =
    currentStatus === "Published" ? "Draft" : "Published";

  const { error } = await supabase
    .from("posts")
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    setError(error.message);
    return;
  }


  setSuccess(
  newStatus === "Published"
    ? "Post published successfully!"
    : "Post unpublished successfully!"
);
setShowSuccessDialog(true);
}

  return (
    <div className="dashboard">
      <h1>CMS Dashboard</h1>
      <p>Role: {role ?? "No role found"}</p>
      <p>Welcome to the CMS.</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/dashboard/create">Create Post</Link>

      <h2>Posts</h2>

      {loading && <p>Loading posts...</p>}

{postsError && (
  <p className="form-error">{postsError}</p>
)}

{error && (
  <p className="form-error">{error}</p>
)}

 {/*success && (
  <p className="form-success">
    {success}
  </p>
)*/}  

{!loading && !postsError && !error && posts.length === 0 && (
  <p>No posts yet.</p>
)}

<div className="dashboard-posts">
  {posts.map((post) => (
    <div className="dashboard-post" key={post.id}>
      <h3>{post.title}</h3>

      <p>{post.description}</p>

      <p>
  Status:{" "}
  <span className={`post-status ${post.status.toLowerCase()}`}>
    {post.status}
  </span>
</p>

      <p className="post-date">
        Created: {new Date(post.created_at).toLocaleString()}
      </p>

      <p className="post-date">
        Updated: {new Date(post.updated_at).toLocaleString()}
      </p>

      <div className="post-actions">
        <Link to={`/dashboard/preview/${post.id}`}>
          Preview
        </Link>

        <Link to={`/dashboard/edit/${post.id}`}>
          Edit
        </Link>

        {role === "Admin" && (
          <>
            <button
              onClick={() =>
                handlePublishToggle(post.id, post.status)
              }
            >
              {post.status === "Published"
                ? "Unpublish"
                : "Publish"}
            </button>

            <button onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  ))}
</div>

      {showSuccessDialog && (
        <div className="success-dialog-overlay">
          <div className="success-dialog">
            <div className="success-icon">✓</div>

            <h2>Success!</h2>

            <p>{success}</p>

            <button
              type="button"
              onClick={() => {
                setShowSuccessDialog(false);
                setSuccess("");
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;