import { FaComments } from "react-icons/fa"

const ChatButton = ({ onClick }) => {

  return (
    <button
      type="button"
      className="btn btn-primary bold rounded-circle position-fixed bottom-0 end-0 m-3 d-flex align-items-center justify-content-center"
      style={{ width: "60px", height: "60px" }}
      onClick={onClick}
    >
      <FaComments size={24} />
    </button>
  )
  
}

export default ChatButton
