import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { createPost, updatePost } from '../../services/post.services';
import { getUserId, getUserName } from '../../services/user.service';
import { usePosts } from '../../context/Posts/PostsContext';
import LoadingComponent from '../../components/LoadingComponent';

interface Post {
  title: string;
  description: string;
  author: string;
}

export default function NewPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({ title: '', description: '', author: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchPostById } = usePosts();

  const fetchPost = async (id?: string) => {
    setLoading(true);
    if (id) {
      try {
        const post = await fetchPostById(id);
        if (post) setPost(post);
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  },[id])

  useEffect(() => {
    const user = getUserName();
    if (user && post.author === '') {
      setPost(prevPost => ({ ...prevPost, author: user }));
    }
    
  }, [post.author]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const created_at = new Date().toISOString();
      const user_id = getUserId();
      const _response = id ? await updatePost({ post: { ...post }, user_id }) : await createPost({ post: { ...post, created_at }, user_id });
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
    }finally {
      setLoading(false);
      navigate('/');
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Post' : 'Criar Novo Post'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descrição</label>
            <textarea
              name="description"
              value={post.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Autor</label>
            <input
              type="text"
              name="author"
              value={post.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
              disabled
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            {id ? 'Atualizar Post' : 'Criar Post'}
          </button>
        </form>
      </div>
    </div>
  );
}