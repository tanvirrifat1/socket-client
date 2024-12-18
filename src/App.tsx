import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homes from "./Page/Home";
import Chat from "./Page/Chat";
import io from "socket.io-client";

const socket = io("http://192.168.12.206:5000");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
