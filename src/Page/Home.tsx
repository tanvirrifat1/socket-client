import { useEffect, useState } from "react";
import Model from "../component/Model";
import Register from "../component/Register";
import Login from "../component/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Homes() {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useNavigate();

  const openSignUp = () => {
    setIsModelOpen(true);
    setIsLogin(false);
  };

  const openLogin = () => {
    setIsModelOpen(true);
    setIsLogin(true);
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          "http://192.168.12.206:5000/chat/user/verify",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("chat-token")}`,
            },
          }
        );

        if (response.data.message === "success") {
          router("/chat");
        } else {
          router("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/cryptocurrency-seamless-pattern-background_153454-4473.jpg?ga=GA1.1.824667302.1734158936&semt=ais_tags_boosted')",
        }}
        className="bg-cover w-2/4 h-[calc(100vh-80px)] rounded-lg flex justify-center items-center"
      >
        <div className="text-center">
          <h1 className="text-5xl -mx-10 py-3 bg-white bg-opacity-80 font-semibold text-gray-700 rounded-lg">
            welcome
          </h1>
          <button
            onClick={() => setIsModelOpen(true)}
            className="text-xl my-4 rounded-lg w-32 h-14 bg-sky-500 text-white relative overflow-hidden group z-10 hover:text-white duration-1000"
          >
            <span className="absolute bg-sky-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
            <span className="absolute bg-sky-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
            Login
          </button>
        </div>
      </div>
      <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        {isLogin ? (
          <Login openSignUp={openSignUp} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Model>
    </div>
  );
}

export default Homes;
