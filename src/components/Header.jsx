import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { themeChange } from 'theme-change';

const Header = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    themeChange(false); // Initialize theme-change package
    const currentTheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [isDark]);

  return (
    <>
      <header className="bg-purple-900">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <section className="md:flex md:items-center md:gap-12">
              <Link to={'/'} className="block text-white">
                <span className="font-extrabold text-2xl">SuperNews</span>
              </Link>
            </section>

            <section className="hidden lg:block">
              <nav>
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link to={'/articles/cooking'} className="font-semibold text-white transition hover:underline"> Cooking </Link>
                  </li>
                  <li>
                    <Link to={'/articles/funny'} className="font-semibold text-white transition hover:underline"> Funny </Link>
                  </li>
                  <li>
                    <Link to={'/articles/animals'} className="font-semibold text-white transition hover:underline"> Animals </Link>
                  </li>
                  <li>
                    <Link to={'/articles/uplifting'} className="font-semibold text-white transition hover:underline"> Uplifting </Link>
                  </li>
                  <li>
                    <Link to={'/articles/health'} className="font-semibold text-white transition hover:underline"> Health </Link>
                  </li>
                  <li>
                    <Link to={'/articles/environment'} className="font-semibold text-white transition hover:underline"> Environment </Link>
                  </li>
                  <li>
                    <Link to={'/articles/heroes'} className="font-semibold text-white transition hover:underline"> Heroes </Link>
                  </li>
                </ul>
              </nav>
            </section>

            <section className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button className="btn btn-secondary rounded-full bg-purple-900 text-white font-semibold">Login</button>
              </div>

              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                  className="theme-controller"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-8 w-8 fill-purple-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-8 w-8 fill-purple-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24">
                  <path
                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              <div className="block lg:hidden">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-secondary btn-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="
                    menu menu-md dropdown-content 
                    bg-base-100 rounded-box
                    z-[1] mt-3 w-52 p-2 shadow text-secondary">
                    <li>
                      <Link to={'/articles/cooking'} className="font-semibold">Cooking</Link>
                    </li>
                    <li>
                      <Link to={'/articles/funny'} className="font-semibold">Funny</Link>
                    </li>
                    <li>
                      <Link to={'/articles/animals'} className="font-semibold">Animals</Link>
                    </li>
                    <li>
                      <Link to={'/articles/uplifting'} className="font-semibold">Uplifting</Link>
                    </li>
                    <li>
                      <Link to={'/articles/health'} className="font-semibold">Health</Link>
                    </li>
                    <li>
                      <Link to={'/articles/environment'} className="font-semibold">Environment</Link>
                    </li>
                    <li>
                      <Link to={'/articles/heroes'} className="font-semibold">Heroes</Link>
                    </li>
                  </ul>
                </div>
              </div>

            </section>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;