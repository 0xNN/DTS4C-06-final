import 'antd/dist/antd.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Profile from './auth/Profile'
import Home from './pages/Home';
import Register from './auth/Register'
import VerifyEmail from './auth/VerifyEmail';
import Login from './auth/Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './auth/AuthContext'
import {auth} from './auth/firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './auth/PrivateRoute'
import {Navigate} from 'react-router-dom'
import { Spin } from 'antd';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        {loading ? <div className='container-center'><div className='center'><Spin /></div></div> : (
          <Routes>
            <Route exact path='/' element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }/>
            <Route path="/login" element={
              !currentUser?.emailVerified 
              ? <Login/>
              : <Navigate to='/' replace/>
            } />
            <Route path="/register" element={
              !currentUser?.emailVerified 
              ? <Register/>
              : <Navigate to='/' replace/>
            } />
            <Route path='/verify-email' element={<VerifyEmail/>} /> 
          </Routes>
        )}
      </AuthProvider>
  </Router>
  );
}

export default App;