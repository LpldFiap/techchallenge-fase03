import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

interface Post {
  title: string;
  description: string;
  author: string;
}

export function NewPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({ title: '', description: '', author: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${id}`);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Erro ao buscar o post:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/posts/${id}` : '/api/posts';
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar o post:', error);
    }
  };

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