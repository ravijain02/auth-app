import Header from './Header'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  const hideHeader = ['/login']

  return (
    <div>
      {!hideHeader.includes(location.pathname) && <Header />}
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
