import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  description: string;
};

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      <Link to={`/blog/${post.id}`}>
        Read More
      </Link>
    </div>
  );
}

export default PostCard;