import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/api";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then(({ data }) => {
        return data.articles;
      })
      .then((dataReturned) => {
        setArticles(dataReturned);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 my-4 mx-2">
      {articles.map((article) => (
        <Link key={article.article_id} to={`/article/${article.article_id}`} >
          <li
            className="bg-gray-700 text-gray-100 h-96 
            rounded-lg group hover:no-underline focus:no-underline">
            <img
              src={article.article_img_url}
              role="presentation"
              className="object-cover w-full rounded h-44"
            />
            <section className="p-6 space-y-2">
              <h3 className="text-1xl font-semibold 
                group-hover:underline group-focus:underline group-hover:text-red-600">{article.title}</h3>
              <h4 className="text-gray-400"> {article.topic} </h4>
              <span className="text-gray-400"> Votes: {article.votes} </span>
            </section>
          </li>
        </Link>
      ))}
    </ul >
  );
};

export default Home;
