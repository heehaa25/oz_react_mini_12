import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import Layout from './components/pages/Layout.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<App />} />
        <Route path='/search' element={<App />} />
        <Route path='/search/:keyword' element={<App />} />
        <Route path='/details/:movieId' element={<MovieDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
