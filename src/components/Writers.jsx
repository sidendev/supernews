import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../utils/api";

const Writers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    getUsers()
      .then(({ data }) => {
        setWriters(data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl px-6 pt-24 mx-auto space-y-12 bg-base-200 rounded-2xl my-8">
      <div className="w-full mx-auto space-y-4 text-center">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">Meet Our Writers</h1>
      </div>
      <section className="prose mx-auto pb-10 text-center">
        <p>
          Our crowd-sourced writers are committed to bringing you the most super positive news stories they can find.
        </p>
        <p>
          Have you got a super news story that you would like to share?
        </p>
        <p>
          <Link to="/join" className="link link-hover text-secondary font-semibold">Then why not join them!</Link>
        </p>
      </section>
      <div className="flex justify-center">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 mx-2 pb-10">
          {writers.map((writer) => (
            <li key={writer.username} className="bg-base-300 p-6 rounded-2xl flex flex-col items-center">
              <img
                src={writer.avatar_url}
                alt={`${writer.username}'s avatar`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{writer.username}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Writers;