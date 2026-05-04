import { useState } from "react";
import API from "../api";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const newChat = [...chat, { user: message }];
    setChat(newChat);

    try {
      const res = await API.post("/api/chat", { message });

      setChat([
        ...newChat,
        { bot: res.data.reply }
      ]);

    } catch (error) {
      setChat([
        ...newChat,
        { bot: "Error connecting to AI" }
      ]);
    }

    setMessage("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      background: "white",
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "10px"
    }}>
      <h4>AI Assistant</h4>

      <div style={{ height: "200px", overflowY: "auto" }}>
        {chat.map((c, i) => (
          <div key={i}>
            {c.user && <p><b>You:</b> {c.user}</p>}
            {c.bot && <p><b>Bot:</b> {c.bot}</p>}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}