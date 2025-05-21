import { useEffect, useRef } from "react"
import { FaTimes } from "react-icons/fa"

const ChatSidebar = ({ onClose, messages, input, setInput, onSend }) => {
  const wsRef = useRef(null)

  useEffect(() => {
    wsRef.current = new WebSocket("wss://echo.websocket.org/.ws")
    wsRef.current.onmessage = (e) => {
      onSend({ sender: "bot", text: e.data }, true)
    }

    return () => wsRef.current?.close()
  }, [])

  const handleSend = () => {
    if (input.trim() === "") return
    onSend({ sender: "user", text: input })
    wsRef.current?.send(input)
    setInput("")
  }

  return (
    <div className="position-fixed top-0 end-0 h-100 bg-white shadow p-3" style={{ width: "300px", zIndex: 1060 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold text-primary">Chat</h5>
        <button
          type="button"
          className="btn btn-light  text-danger border-0"
          aria-label="Close"
          onClick={onClose}
        >
          <FaTimes size={16} />
        </button>
      </div>
      <div className="mb-3" style={{ height: "420px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-${msg.sender === "user" ? "end" : "start"} mb-2`}
          >
            <span
              className={`badge bg-${msg.sender === "user" ? "primary" : "secondary"}`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="d-flex">
        <input
          className="form-control me-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default ChatSidebar
