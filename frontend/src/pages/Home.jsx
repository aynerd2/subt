import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";     


const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-xl mb-8">Your complete authentication solution</p>
        {user ? (
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </button>
        ) : (
          <div className="space-x-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;