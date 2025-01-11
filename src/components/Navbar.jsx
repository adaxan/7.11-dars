import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({children}) {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          My Blog
        </Link>

        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-gray-300 hover:text-white">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-gray-300 hover:text-white">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    {children}
    </div>
  );
}

export default Navbar;