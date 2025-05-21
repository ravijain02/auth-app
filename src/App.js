import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from './componets/Layout'
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedRoute from "./componets/ProtectedRoute"
import { isLoggedIn } from "./auth/authUser"
import { store } from "./store"
import { Provider } from "react-redux"
import { ThemeProvider } from "./context/ThemeContext"

function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <Layout >
            <Routes>
              <Route path="/" element={<Navigate to={isLoggedIn() ? "/home" : "/login"} replace />} />
              <Route path="/login" element={isLoggedIn() ? <Navigate to="/home" /> : <Login />} />
              <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
            </Routes>
          </Layout>
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App
