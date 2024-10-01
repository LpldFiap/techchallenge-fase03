import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../../context/auth';
import { AuthContextType } from '../../types/user';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const mockPosts: Post[] = [
  { id: 1, title: 'Welcome', content: 'Welcome to the school portal!', author: 'Teacher A' },
  { id: 2, title: 'Homework', content: 'Please complete your homework by Friday.', author: 'Teacher B' },
];

export function Home() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState<string>(''); // For tracking the input value
  const { authenticatedUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  const fetchPosts = async (query: string) => {
    try {
      const response = await fetch(`/api/posts?search=${query}`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {

      if (searchQuery) {
        fetchPosts(searchQuery);
      } else {
        setPosts(mockPosts);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  const deletePost = async (postId: number) => {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeletePost = (id: number) => {
    if (window.confirm('Deseja realmente excluir a publicação?')) {
      deletePost(id);
    }
  };

  if (!authenticatedUser) {
    navigate("/login")
    return <></>
  }

  return (
    <div>
      <div className="p-4 mb-4">
        <strong className="text-4xl">Bom te ver {authenticatedUser?.name}!</strong>
        <div className="h-[1px] block w-full bg-slate-200 my-7" />

        <h1 className="text-xl font-bold">Publicações</h1>
        <div className="mt-6 w-full">
          <input
            className="rounded-md px-4 py-2 w-full outline-1 outline outline-slate-300 focus:outline-slate-500"
            placeholder="Buscar publicação"
            onChange={handleSearchInput}
            value={searchQuery}
          />
        </div>
        {authenticatedUser.role === 'teacher' && (
          <Link to="/new/" className="block">
          <button className="bg-[#274F32] text-white px-4 py-2 rounded-md w-full mt-6 hover:bg-[#1F492A] transition">
            Nova publicação
          </button>
        </Link>
        )}
      </div>

      <div>
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white shadow-md mb-4 p-4 border-b border-gray-200 cursor-pointer rounded-md"
            onClick={() => handlePostClick(post.id)}
          >
            <div className='flex'>

              <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
              {authenticatedUser.role === 'teacher' && (
                <Link to={`/new/${post.id}`} className="block ml-6">
                  <button className="bg-[#274F32] h-8 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#1F492A] transition">
                    Editar
                  </button>
                </Link>
              )}
              {authenticatedUser.role === 'teacher' && (
                  <button
                    className="bg-[#E76565] h-8 ml-2 text-xs text-white px-2 py-2 rounded-md items-center hover:bg-[#eb8181] transition"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Remover
                  </button>
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
