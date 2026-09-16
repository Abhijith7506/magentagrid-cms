import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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

type PostsContextType = {
  posts: Post[];
  loading: boolean;
  error: string;
  refreshPosts: () => Promise<void>;
};

const PostsContext = createContext<PostsContextType | undefined>(
  undefined
);

export function PostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refreshPosts() {
    setError("");

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setPosts(data || []);
  }

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);

      await refreshPosts();

      setLoading(false);
    }

    loadPosts();

    const channel = supabase
      .channel("posts-context-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          refreshPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        refreshPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(
      "usePosts must be used inside PostsProvider"
    );
  }

  return context;
}