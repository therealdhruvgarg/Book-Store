import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
    links.splice(2, 3);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");
  return (
    <>
      <nav className="z-50 flex bg-gray-900 text-white px-6 py-4 items-center justify-between shadow-md">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-3" src="/books.png" alt="logo" />
          <h1 className="text-2xl font-bold tracking-tight">BookStop</h1>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => (
            <div key={i} className="relative group">
              <Link
                to={item.link}
                className={`px-3 py-2 rounded transition duration-300 ease-in-out ${
                  item.title === "Profile" || item.title === "Admin Profile"
                    ? "border border-blue-500 hover:bg-blue-500 hover:text-white"
                    : "hover:text-blue-400"
                }`}
              >
                {item.title}
              </Link>
            </div>
          ))}
          <div className="hidden md:flex gap-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/LogIn"
                  className="px-4 py-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <button
            className="block md:hidden text-white text-2xl hover:text-blue-400"
            onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${
          MobileNav
        } bg-gray-900 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="mb-4 text-white text-4xl font-semibold hover:text-blue-400 transition-all duration-300"
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className="mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded text-white hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};
