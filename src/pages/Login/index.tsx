import { useContext, useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";
import { newUser } from "../../services/newUser";
import { AuthContext } from "../../context/auth";
import { AuthContextType } from "../../types/user";
import LoadingComponent from "../../components/LoadingComponent";
import { findUserByEmail } from "../../services/findUserByEmail";
import { saveUser } from "../../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { authenticateUser } = useContext(
    AuthContext,
  ) as AuthContextType;

  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true)

    authenticateUser({ email, password }).then(isUserAuthenticated => {
      isUserAuthenticated?.name ? navigate("/") : setErrorMessage("Credenciais incorretas")

      setIsLoading(false)

      setTimeout(() => formReset(), 3000)
    })
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerPassword !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    setIsLoading(true)

    try {
      
      const response = await newUser({
        email: registerEmail,
        name: name,
        password: registerPassword,
        role: 'student',
      });
      console.log('response', response);
      if (!response) {
        console.log("Erro ao cadastrar usuário");
        return;
      }
      saveUser({name: response.Name, email: response.Email, role: response.Role, _id: '0'});
      setIsModalOpen(false);
      navigate("/");
      formReset()
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false)
    }


  };

  const formReset = () => {
    setEmail("")
    setPassword("")
    setErrorMessage("")
  }

  if(isLoading) return <LoadingComponent />

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#45B649] to-[#DCE35B] p-4 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="flex flex-col gap-1 xl:gap-2">
          <h1 className="font-bold text-white text-3xl xl:text-5xl">
            Bem vindo de volta!
          </h1>
          <h2 className="text-white/60 text-lg xl:text-2xl max-w-80">
            Preparado para escrever algo incrível?
          </h2>
        </div>

        <div className="flex flex-col gap-4 bg-white shadow-md p-6 py-8 rounded-xl">
          <strong className="font-medium">
            Entre com seus dados
          </strong>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleLoginSubmit}
          >
            <div className="flex flex-col gap-1 px-2">
              <label className="text-sm text-[#7C7C7C]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col gap-1 px-2">
              <label className="text-sm text-[#7C7C7C]">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <p className="block h-6 text-red-400 text-sm">
              {errorMessage}
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#274F32] text-white py-2 rounded-full text-sm font-medium enabled:hover:bg-[#1F492A] transition disabled:opacity-50"
            >
              Entrar
            </button>
          </form>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white border border-[#274F32] text-[#274F32] py-2 rounded-full text-sm font-medium hover:border-[#1F492A] hover:text-[#1F492A] transition"
          >
            Cadastrar
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-md p-6 rounded w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Senha</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirme a Senha</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Registrar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
