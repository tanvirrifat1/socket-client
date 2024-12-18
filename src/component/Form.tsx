import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

function Form({ receiverId, setChats, chats }: any) {
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.12.206:5000/chat/message/send/" + receiverId,
        { content: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("chat-token")}`,
          },
        }
      );
      console.log(response);
      setChats([...chats, { content: message, sender: userId }]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 fixed absolute bottom-0 right-0 left-0 bg-white  bg-opacity-30">
      <form onSubmit={sendMessage} className="flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border rounded-l-lg "
        />

        <button className="p-2   bg-blue-500 text-white rounded-r-lg">
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
}

export default Form;
