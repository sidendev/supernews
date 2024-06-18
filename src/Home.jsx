import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "./utils/api";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Check if this Home useEffect is looping!");
    getArticles()
      .then(({ data }) => {
        return data.articles;
      })
      .then((dataReturned) => {
        setArticles(dataReturned);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
              <h5 className="text-gray-400"> Votes: {article.votes} </h5>
            </section>
          </li>
        </Link>
      ))
      }
    </ul >
  );
};

export default Home;
