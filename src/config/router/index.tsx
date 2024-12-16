import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// import RequireAuth from '../../components/RequireAuth'
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Page404 from '../../pages/Page404'

const Router = () => {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <Routes>
        {/* <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} /> */}
        <Route path="/" element={<Navigate to="/login" replace={true} />} />
        <Route path="/home" element={<Navigate to="/login" replace={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router