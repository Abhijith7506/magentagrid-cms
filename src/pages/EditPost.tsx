import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";


function EditPost() {
  const { role } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Draft");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);
   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  
useEffect(() => {
  async function fetchPost() {
    if (!id) {
      return;
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    setTitle(data.title);
    setDescription(data.description);
    setContent(data.content);
    setImageUrl(data.image_url ?? "");
    setStatus(data.status);
  }

  fetchPost();
}, [id]);

async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  )  {
  event.preventDefault();
  setError("");
  setSuccess("");

  if (!title.trim()) {
    setError("Title is required");
    return;
  }

  if (!description.trim()) {
    setError("Short description is required");
    return;
  }

  if (!content.trim()) {
    setError("Main content is required");
    return;
  }

  setError("");
  setIsSaving(true);

  const { error } = await supabase
    .from("posts")
    .update({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      image_url: imageUrl.trim() || null,
      status,
      updated_at: new Date().toISOString(),
    })
     .eq("id", id);
  if (error) {
    setError(error.message);
    setIsSaving(false);
    return;
  }

  setIsSaving(false);
setSuccess("Post updated successfully!");
 setShowSuccessDialog(true);

setTimeout(() => {
  navigate("/dashboard");
}, 800);
}

  return (
    <div className="post-form-page">
      <h1>Edit Post</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-field">
  <label>Title</label>

  <input
    type="text"
    value={title}
    onChange={(event) => setTitle(event.target.value)}
  />
</div>
<div className="form-field">
  <label>Short Description</label>

  <textarea
    value={description}
    onChange={(event) => setDescription(event.target.value)}
  />
</div>

<div className="form-field">
  <label>Main Content</label>

  <textarea
    value={content}
    onChange={(event) => setContent(event.target.value)}
  />
</div>

<div className="form-field">
  <label>Image URL (optional)</label>

  <input
    type="text"
    value={imageUrl}
    onChange={(event) => setImageUrl(event.target.value)}
  />
</div>
<div className="form-field">
  <label htmlFor="status">Status</label>

  {role === "Admin" ? (
    <select
      id="status"
      value={status}
      onChange={(event) => setStatus(event.target.value)}
    >
      <option value="Draft">Draft</option>
      <option value="Published">Published</option>
    </select>
  ) : (
    <input
      id="status"
      type="text"
      value={status}
      disabled
    />
  )}
</div>
{error && <p className="form-error">{error}</p>}

{success && (
  <p className="form-success">
    {success}
  </p>
)}

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Update Post"}
        </button>
      </form>
      {showSuccessDialog && (
  <div className="success-dialog-overlay">
    <div className="success-dialog">
      <div className="success-icon">✓</div>

      <h2>Success!</h2>

      <p>Post updated successfully.</p>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default EditPost;