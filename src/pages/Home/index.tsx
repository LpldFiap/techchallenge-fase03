import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import usePosts from '../../hooks/usePosts';
import LoadingComponent from '../../components/LoadingComponent';
import { getUser, getUserId, getUserName } from '../../services/user.service';
import { deletePost } from '../../services/post.services';

interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const user = getUser()
  const navigate = useNavigate();

  const { data: postsData } = usePosts() as unknown as {data:Post[]};
  
  useEffect(() => {
    setLoading(true);
    if (postsData) {
      setPosts(postsData);
    }
    setLoading(false);
  }, [postsData]);

  const handlePostClick = ({id}:{id: string | number}) => {
    navigate(`/post/${id}`);
  };

  const handleDelete = async (id: string) => {
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
    return <LoadingComponent />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="p-4 mb-4">
        <strong className="text-4xl">Bom te ver {user?.name}!</strong>
        <div className="h-[1px] block w-full bg-slate-200 my-7" />

        <h1 className="text-xl font-bold">Publicações</h1>
        {user?.role === 'teacher' && (
          <Link to="/new/" className="block">
            <button className="bg-[#274F32] text-white px-4 py-2 rounded-md w-full mt-6 hover:bg-[#1F492A] transition">
              Nova publicação
            </button>
          </Link>
        )}
      </nav>
      <div>
        {posts.map(post => (
          <div
            key={post._id}
            className="bg-white shadow-md mb-4 p-4 border-b border-gray-200 rounded-md z-50"
            
          >
            <div className="flex z-50">
              <div className='cursor-pointer' onClick={() => handlePostClick({id: post._id || ''})}>
                <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
              </div>
              {user?.role === 'teacher' && (
                <>
                  <Link to={`/new/${post._id}`} className="block ml-6 z-50">
                    <button className="bg-[#274F32] h-8 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#1F492A] transition z-50">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="bg-[#E76565] h-8 ml-2 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#eb8181] transition z-50"
                    onClick={() => {
                      if (window.confirm("Confirmar exclusão?")) {
                        handleDelete(post?._id.toString());
                      }
                    }}
                  >
                    Remover
                  </button>
                </>
              )}
            </div>
            <div>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-gray-500 text-sm">Autor: {post.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
