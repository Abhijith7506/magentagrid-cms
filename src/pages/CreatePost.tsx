import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const { role } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("Draft");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  

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
    .insert({
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
      image_url: imageUrl.trim() || null,
      status,
    });

  if (error) {
    setError(error.message);
    setIsSaving(false);
    return;
  }

  setIsSaving(false);

  setTitle("");
  setDescription("");
  setContent("");
  setImageUrl("");
  setStatus("Draft");
setSuccess("Post created successfully!");
setShowSuccessDialog(true);
}

  return (
    <div className="post-form-page">
  <div className="post-form-header">
  <h1>Create Post</h1>

  <button
    type="button"
    className="back-button"
    onClick={() => navigate("/dashboard")}
  >
    ← Back to Dashboard
  </button>
</div>

      <form className="post-form" onSubmit={handleSubmit}>
       <div className="form-field">
  <label htmlFor="title">Title</label>

  <input
    type="text"
    id="title"
    value={title}
    onChange={(event) => setTitle(event.target.value)}
  />
</div>
<div className="form-field">
  <label htmlFor="description">Short Description</label>

<textarea
  id="description"
  value={description}
  onChange={(event) => setDescription(event.target.value)}
/>
</div>

<div className="form-field">
  <label htmlFor="content">Main Content</label>

<textarea
  id="content"
  value={content}
  onChange={(event) => setContent(event.target.value)}
/>
</div>

<div className="form-field">
  <label htmlFor="imageUrl">Image URL (optional)</label>

<input
  id="imageUrl"
  type="text"
  value={imageUrl}
  onChange={(event) => setImageUrl(event.target.value)}
/>
</div>
<div className="form-field">
  <label htmlFor="status">Status</label>

<select
  id="status"
  value={status}
  onChange={(event) => setStatus(event.target.value)}
>
    <option value="Draft">Draft</option>
    {role === "Admin" && (
    <option value="Published">Published</option>
    )}
  </select>
</div>
{error && <p className="form-error">{error}</p>}

{success && (
  <p className="form-success">
    {success}
  </p>
)}

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Post"}
        </button>
      </form>
      
      {showSuccessDialog && (
        <div className="success-dialog-overlay">
          <div className="success-dialog">
            <div className="success-icon">✓</div>

            <h2>Success!</h2>

            <p>Post created successfully.</p>

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

export default CreatePost;