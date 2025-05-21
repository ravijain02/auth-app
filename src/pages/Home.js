import { useEffect, useState, useCallback, useRef } from "react"
import ChatButton from "../componets/ChatButton"
import ChatSidebar from "../componets/ChatSideBar"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [skip, setSkip] = useState(0)
  const [morePost, setMorePost] = useState(true)
  const [loading, setLoading] = useState(false)


  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState([])


  const lastPostElemRef = useRef(null)

  const fetchPosts = async () => {
    if (loading || !morePost) return
    setLoading(true)

    try {
      const res = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`)
      const data = await res.json()
      setPosts((prev) => [...prev, ...data.posts])
      setSkip((prev) => prev + 10)
      setMorePost(data.posts.length > 0)
    } catch (err) {
      console.error("Failed to fetch posts", err)
    } finally {
      setLoading(false)
    }
  }

  const lastPostRef = useCallback((node) => {
    lastPostElemRef.current = node
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const lastEl = lastPostElemRef.current
      if (!lastEl || loading || !morePost) return

      const rect = lastEl.getBoundingClientRect()
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0

      if (isVisible) {
        fetchPosts()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, morePost])

  useEffect(() => {
    fetchPosts()
  }, [])


  const handleSendMessage = (message = false) => {
    setChatMessages((prev) => [...prev, message])
  }

  return (
    <>
      <div className="container mt-5">
        <div className="align-items-center mb-4">
          <h2>Welcome to the Home Page</h2>
        </div>

        <div className="row">
          {posts.map((post, index) => (
            <div
              key={post.id}
              ref={index === posts.length - 1 ? lastPostRef : null}
              className="col-md-12 mb-4"
            >
              <div className="card p-3 shadow-sm rounded-4">
                <h5>{post.title}</h5>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>

        {loading && <p className="text-center">Loading more posts...</p>}
        {!morePost && <p className="text-center text-muted">No more posts to load.</p>}
      </div>
      <ChatButton onClick={() => setChatOpen(true)} />

      {chatOpen && (
        <ChatSidebar
          onClose={() => setChatOpen(false)}
          messages={chatMessages}
          input={chatInput}
          setInput={setChatInput}
          onSend={handleSendMessage}
        />
      )}
    </>
  )
}

export default Home
