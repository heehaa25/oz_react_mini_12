import { Outlet } from 'react-router';
import NavBar from '../Navbar/NavBar';

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
