import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

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
  const [role, setRole] = useState<UserRole>('student');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const navigate = useNavigate();

  const handlePostClick = (id: number) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="min-h-screen p-4 md:max-w-2xl xl:max-w-5xl mx-auto">
      <div className="bg-white shadow-md p-4 mb-4 flex justify-between">
        <h1 className="text-xl font-bold">Portal Tech Challenge</h1>
        <div>
          {role === 'teacher' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Criar Post</button>
          )}
          <button className="bg-green-500 text-white px-4 py-2 rounded">Visualizar Posts</button>
        </div>
      </div>
      <div className="bg-white shadow-md p-4 rounded">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {posts.map(post => (
          <div
            key={post.id}
            className="mb-4 p-4 border-b border-gray-200 cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>
            <p className="text-gray-500 text-sm">Autor: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
