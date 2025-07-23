import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const checkToken = sessionStorage.getItem('token')
  useEffect(() => {
    if (!checkToken) {
      navigate('/login');
    }

  }, [checkToken]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-gray-100">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          onLogout={handleLogout}
        />
        <div className="flex mx-3">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="mb-4 mx-1 p-2 w-full rounded-md min-h-screen">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
