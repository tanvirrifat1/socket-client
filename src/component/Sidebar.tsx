import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ setChatInitiated, setChats, setReceiverId }: any) {
  const router = useNavigate();
  const [user, setUser] = useState([]);
  const [loader, setLoader] = useState(false); // Loader state

  const handleSubmit = () => {
    localStorage.removeItem("chat-token");
    localStorage.removeItem("userId");
    router("/");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoader(true); // Start loader
      try {
        const users = await axios.get("http://192.168.12.206:5000/chat/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("chat-token")}`,
          },
        });
        setUser(users.data.users);
      } catch (error) {
        console.log(error);
        router("/");
      } finally {
        setLoader(false); // Stop loader
      }
    };

    fetchUsers();
  }, [router]);

  const startChat = async (id: string) => {
    try {
      const response = await axios.get(
        "http://192.168.12.206:5000/chat/message/read/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("chat-token")}`,
          },
        }
      );
      console.log("Chats data from API:", response.data);
      setChats(response.data.messages);
    } catch (error: any) {
      if (error.response?.data?.message === "Conversation not found") {
        setChats([]);
      }
      console.error(error);
    }

    setChatInitiated(true);
    setReceiverId(id);
  };

  return (
    <div className="  bg-black bg-opacity-70 relative">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-info w-full max-w-xs bg-slate-300 text-black"
      />

      {loader ? ( // Display loader if data is being fetched
        <p className="text-center text-white text-xl">Loading...</p>
      ) : user?.length > 0 ? (
        <div>
          {user.map((user: any) => (
            <div
              key={user._id}
              onClick={() => {
                startChat(user._id);
              }}
              className="flex items-center gap-4 my-2 p-2 bg-slate-400 rounded-xl"
            >
              <div className="avatar">
                <div className="w-12 rounded-full ">
                  <img
                    src={user.avatar || "https://i.ibb.co.com/zN7YXtK/th.jpg"} // Fallback to placeholder image if avatar is missing
                    alt={user.username}
                  />
                </div>
              </div>
              <p className="text-white">{user.username}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center text-red-500 text-xl">No Users</p>
        </div>
      )}

      <div onClick={handleSubmit} className="my-3 w-full flex justify-center">
        <button className="btn btn-active btn-accent">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
