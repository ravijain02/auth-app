import { useState } from "react"
import { FiUser, FiLock } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { saveSession } from "../auth/authUser"

 const Login = () => {
  const [username, setUsername] = useState("emilys")
  const [password, setPassword] = useState("emilyspass")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Login failed")

      saveSession({ token: data.token, username: data.username })
      navigate("/home")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
     <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient bg-primary bg-opacity-25">
      <div className="card shadow-lg p-4 rounded-4 bg-white" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4 text-primary">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <div className="input-group">
              <span className="input-group-text"><FiUser /></span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control rounded-end"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FiLock /></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control rounded-end"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          {error && <div className="alert alert-danger rounded-3">{error}</div>}
          <button className="btn btn-primary w-100 rounded-3" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
