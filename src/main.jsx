import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import Layout from './components/pages/Layout.jsx';
import './index.css';
import App from './App.jsx';
import Login from './components/pages/Login.jsx';
import SignUp from './components/pages/SignUp.jsx';
import Mypage from './components/Mypage.jsx';
import { SupabaseProvider } from './context/index.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SupabaseProvider>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<App />} />
            <Route path='/search' element={<App />} />
            <Route path='/search/:keyword' element={<App />} />
            <Route path='/details/:movieId' element={<MovieDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/mypage' element={<Mypage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </SupabaseProvider>
  </BrowserRouter>
);
