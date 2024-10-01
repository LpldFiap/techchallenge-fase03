import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../../context/auth';
import { AuthContextType } from '../../types/user';

interface Post {
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export function PostDetail() {
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      } finally {
        setLoading(false);
      }
    };

    //mock post id 1 ou 2
    if (id === '1' || id === '2') {
      setPost({
        title: 'Welcome',
        description: 'Welcome to the school portal!',
        author: 'Teacher A',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setLoading(false);
    } else {
      fetchPost();
    }
  }, [id]);

  const handleEdit = () => {
    // Lógica para editar o post
    console.log('Editar post:', id);
    navigate(`/new/${id}`);
  };

  const handleDelete = async () => {
    // Lógica para deletar o post
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">Carregando...</div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">Post não encontrado</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.description}</p>
        <p className="text-gray-500 mb-2">Autor: {post.author}</p>
        <p className="text-gray-500 mb-2">Data de Criação: {new Date(post.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-500">Última Modificação: {new Date(post.updatedAt).toLocaleDateString()}</p>
        {authenticatedUser?.role === 'teacher' && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Deletar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
