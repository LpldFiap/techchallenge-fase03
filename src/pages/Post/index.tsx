import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { TPost } from '../../types/posts';
import { deletePost } from '../../services/post.services';
import { getUserId, getUserRole } from '../../services/user.service';
import { TUserRole } from '../../types/user';
import { usePosts } from '../../context/Posts/PostsContext';
import LoadingComponent from '../../components/LoadingComponent';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<TPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<TUserRole | null>(null);
  const navigate = useNavigate();

  const { fetchPostById } = usePosts();

  const fetchPost = async (id?: string) => {
    setLoading(true);
    if (id) {
      try {
        const post = await fetchPostById(id);
        setPost(post);
      } catch (error) {
        console.error('Erro ao buscar o post:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const userRole = getUserRole();
    if (userRole) {
      setRole(userRole);
    }
  }, [role])

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const handleEdit = () => {
    navigate(`/new/${id}`);
  };

  const handleDelete = async () => {
    try {
      if (!id) return
      setLoading(true);
      const user_id = getUserId();
      await deletePost({id, user_id});
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (!post) {
    return <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">Post não encontrado</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.description}</p>
        <p className="text-gray-500 mb-2">Autor: {post.author}</p>
        <p className="text-gray-500 mb-2">Data de Criação: {post.created_at ? new Date(post.created_at).toISOString() : ''}</p>
        {role === 'teacher' && (
          <div className="mt-4 flex justify-end">
            <button onClick={handleEdit} className="bg-[#274F32] h-8 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#1F492A] transition z-50">
                      Editar
                    </button>
            <button
                    className="bg-[#E76565] h-8 ml-2 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#eb8181] transition z-50"
                    onClick={() => {
                      if (window.confirm("Confirmar exclusão?")) {
                        handleDelete();
                      }
                    }}
                  >
                    Remover
                  </button>
          </div>
        )}
      </div>
    </div>
  );
}