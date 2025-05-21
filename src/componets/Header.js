import { useNavigate } from "react-router-dom"
import { clearSession, getSession } from "../auth/authUser"
import { useTheme } from "../context/ThemeContext"
import { FiMoon, FiSun, FiUser, FiLogOut } from "react-icons/fi"

const Header = () => {
  const navigate = useNavigate()
  const user = getSession()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    clearSession()
    navigate("/login")
  }

  return (
    <nav className={`navbar  navbar-${theme === "dark" ? "dark" : "light"} bg-${theme} px-4 border-bottom border-2`}>
      <div className="d-flex align-items-center">
        <span className="navbar-brand mb-0 h1">Chat App</span>
        <button
        onClick={toggleTheme}
        className={`btn btn-sm me-3 ${theme === "dark" ? "btn-light" : "btn-dark"}`}
        >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
      </div>
      <div className="text-light d-flex align-items-center">
        {user?.username && (
            <span className={theme === "dark" ? "text-light" : "text-dark"}>
                 <FiUser className="me-1" />
                {user.username}
            </span>
        )}
        <button className="btn btn-sm btn-primary ms-3" onClick={handleLogout}>Logout  <FiLogOut className="me-1" /></button>
      </div>
    </nav>
  )
}

export default Header
