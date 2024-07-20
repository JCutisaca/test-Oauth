import { useEffect, useRef, useState } from "react";
import { googleLogout } from "@react-oauth/google";

export default function NavBar({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-400 h-18 p-4 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="text-white text-lg font-bold">
          <a href="#">Test</a>
        </div>
        {user && (
          <div ref={menuRef} className="relative">
            <div
              onClick={toggleMenu}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <p className="hidden md:flex text-white">Hi {user?.name}</p>
              <img
                className="h-10 w-10 rounded-full"
                src={user?.picture}
                alt={user?.name}
              />
            </div>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 shadow bg-white text-black shadow-lg rounded-lg">
                <a
                  href="#"
                  onClick={() => {
                    googleLogout();
                    setUser(null);
                  }}
                  className="block px-4 rounded-lg py-2 hover:bg-[#f0f0f0]"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
