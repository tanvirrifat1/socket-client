import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Sidebar from "../component/Sidebar";
import Form from "../component/Form";

interface ChatMessage {
  sender: string;
  content: string;
}

interface ChatProps {
  socket: Socket;
}

function Chat({ socket }: ChatProps) {
  const [chatInitiated, setChatInitiated] = useState(false);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [receiverId, setReceiverId] = useState<string | null>(null);

  const userId = (() => {
    try {
      return localStorage.getItem("userId") || "";
    } catch {
      return "";
    }
  })();

  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);
    }
  }, [socket, userId]);

  useEffect(() => {
    const handleNewMessage = (message: ChatMessage) => {
      // if(receiverId === message.sender){}

      setChats((prevChats) => [...prevChats, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/cryptocurrency-seamless-pattern-background_153454-4473.jpg?ga=GA1.1.824667302.1734158936&semt=ais_tags_boosted')",
        }}
        className="bg-cover w-2/4 h-[calc(100vh-80px)] rounded-lg flex"
      >
        <Sidebar
          setChatInitiated={setChatInitiated}
          setChats={setChats}
          setReceiverId={setReceiverId}
        />

        <div className="w-3/4 bg-white flex flex-col bg-opacity-20 relative">
          {chatInitiated ? (
            <div className="flex flex-col flex-1 overflow-auto">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex items-center py-2 px-4 ${
                    chat.sender === userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      chat.sender === userId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {chat.content}
                  </div>
                </div>
              ))}
              <Form receiverId={receiverId} setChats={setChats} chats={chats} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <h1 className="text-5xl -mx-10 py-3 bg-white bg-opacity-80 font-semibold text-gray-700 rounded-lg">
                Start Chat
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
