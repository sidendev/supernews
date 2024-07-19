import { Link } from "react-router-dom";

const Header = () => {

  return (
    <>
      <header className="bg-purple-900">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <section className="md:flex md:items-center md:gap-12">
              <Link to={'/'} className="block text-white">
                <span className="font-bold">SUPERNEWS</span>
              </Link>
            </section>

            <section className="hidden md:block">
              <nav>
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link to={'/articles/coding'} className="text-white transition hover:underline"> Coding </Link>
                  </li>
                  <li>
                    <Link to={'/articles/football'} className="text-white transition hover:underline"> Football </Link>
                  </li>
                  <li>
                    <Link to={'/articles/cooking'} className="text-white transition hover:underline"> Cooking </Link>
                  </li>
                </ul>
              </nav>
            </section>

            <section className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button className="btn rounded-full bg-purple-900 text-white hover:bg-purple-800">Login</button>
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-purple-900 transition hover:text-purple-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

            </section>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;