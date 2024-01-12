import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage.jsx'
import Signin from './pages/Signin.jsx'
import TimerDashboard from './pages/TimerDashboard.jsx'
import { AuthContextProvider } from './context/AuthContext'
import Protected from './components/Protected.jsx'

function App() {

  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/Signin' element={<Signin />} />
          <Route path='/TimerDashboard'
            element={
              <Protected>
                <TimerDashboard />
              </Protected>} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
