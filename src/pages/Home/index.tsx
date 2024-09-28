import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../../context/auth';
import { AuthContextType } from '../../types/user';
import usePosts from '../../hooks/usePosts';
import { useMutation } from 'react-query';
import deletePost from '../../services/deletePost';

interface Post {
  _id: number;
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const { data: postsData } = usePosts();

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData]);

  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  const deleteMutation = useMutation(
    (postId: string) => {
      deletePost(postId);
      console.log(`Removendo post pelo ID: ${postId}`);
      return Promise.resolve();
    },
    {
      onSuccess: () => {
        console.log("Post removido com sucesso");
      },
      onError: (error: Error) => {
        console.error("Erro ao deletar ´pst:", error);
      },
    }
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="p-4 mb-4">
        <strong className="text-4xl">Bom te ver {authenticatedUser?.name}!</strong>
        <div className="h-[1px] block w-full bg-slate-200 my-7" />

        <h1 className="text-xl font-bold">Publicações</h1>
        {authenticatedUser?.roles?.includes('teacher') && (
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
            className="bg-white shadow-md mb-4 p-4 border-b border-gray-200 cursor-pointer rounded-md"
            onClick={() => handlePostClick({id: post._id})}
          >
            <div className="flex">
              <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
              {authenticatedUser?.roles?.includes('teacher') && (
                <>
                  <Link to={`/new/${post._id}`} className="block ml-6">
                    <button className="bg-[#274F32] h-8 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#1F492A] transition">
                      Editar
                    </button>
                  </Link>
                  <button
                    className="bg-[#E76565] h-8 ml-2 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#eb8181] transition"
                    onClick={() => {
                      if (window.confirm("Confirmar exclusão?")) {
                        deleteMutation.mutate(post?._id.toString());
                      }
                    }}
                  >
                    Remover
                  </button>
                </>
              )}
            </div>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500 text-sm">Autor: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
