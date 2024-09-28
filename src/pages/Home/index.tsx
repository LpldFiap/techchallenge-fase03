import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../../context/auth';
import { AuthContextType } from '../../types/user';

type UserRole = 'teacher' | 'student';

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
  const [role, setRole] = useState<UserRole>('teacher');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const { authenticatedUser } = useContext(
    AuthContext,
  ) as AuthContextType
  const navigate = useNavigate();

  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="p-4 mb-4">
        <strong className="text-4xl">Bom te ver {authenticatedUser?.name}!</strong>
        <div className="h-[1px] block w-full bg-slate-200 my-7" />

        <h1 className="text-xl font-bold">Publicações</h1>
        <div className="relative mt-6 w-full">
          <img
            src="/assets/icons/search.svg"
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            className="rounded-md p-2 pl-10 w-full"
            placeholder="Buscar publicação"
          />
        </div>
          {role === 'teacher' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-6 flex items-center">
              Nova publicação
              <img src="/assets/icons/plus.svg" alt="Plus Icon" className="ml-2 w-4 h-4" />
            </button>
          )}
      </nav>
      <div>
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white shadow-md mb-4 p-4 border-b border-gray-200 cursor-pointer rounded-md"
            onClick={() => handlePostClick(post.id)}
          >
            <h3 className="text-xl font-semibold mb-4">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500 text-sm">Autor: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
