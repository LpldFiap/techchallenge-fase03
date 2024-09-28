import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getAllPosts, getPostById } from '../../services/post.services';
import { TPost } from '../../types/posts';
import { PostsContextType } from './PostsContext.types';


const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Erro ao buscar os posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const post = await getPostById(id);
      return post;
    } catch (error) {
      console.error(`Erro ao buscar o post com id ${id}:`, error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <PostsContext.Provider value={{ posts, loading, fetchPosts, fetchPostById }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};