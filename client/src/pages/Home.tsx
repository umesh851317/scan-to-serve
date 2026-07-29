import { useNavigate } from "react-router-dom";
import restaurant from "../assets/restaurant-img.jpg";
const Home = () => {
       const navigate = useNavigate()
       const start = () => {
              navigate("/auth")
       }
       return (
              <div
                     className="relative h-full bg-cover bg-center bg-fixed flex items-center justify-center"
                     style={{ backgroundImage: `url(${restaurant})` }}
              >
                     <div className="absolute inset-0 bg-gray-900/75"></div>
                     <button onClick={() => start()} className="absolute font-bold px-6 py-3 bg-yellow-500 text-white text-2xl rounded-lg">
                            Get started
                     </button>
                     <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white z-10">
                            "Serve customers the best food with prompt and friendly service in a
                            welcoming atmosphere, and they'll keep coming back."
                            <br />

                            <span className="block mt-4 text-yellow-400">
                                   - Founder of S2S
                            </span>
                     </blockquote>
              </div>
       )
}

export default Home
