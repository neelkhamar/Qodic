import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../Redux/User/Action";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const logout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <nav
      className="bg-gray-800 text-white shadow-md dark:bg-gray-600 dark:text-gray-300"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to="/" aria-label="Go to homepage">
            Qodic
          </Link>
        </div>
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-controls="navbar-menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        </button>
        <div
          id="navbar-menu"
          className={`md:flex flex-col md:flex-row items-center md:space-x-4 mt-3 md:mt-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <ThemeToggle />
          <span
            className="block py-2 px-4 hover:bg-gray-700 rounded-md cursor-pointer"
            onClick={logout}
          >
            Logout
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
