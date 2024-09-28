import { TPost } from "../../types/posts";

export type PostsContextType = {
  posts: TPost[];
  loading: boolean;
  fetchPosts: () => void;
  fetchPostById: (id: string) => Promise<TPost | null>;
}