import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Check if this Home useEffect is looping!");
    axios
      .get("https://supernews-4j74.onrender.com/api/articles")
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {articles.map((article) => (
        <section key={article.article_id} className="bg-gray-700 text-gray-100 h-96 rounded-lg group hover:no-underline focus:no-underline">
          <img
            src={article.article_img_url}
            role="presentation"
            className="object-cover w-full rounded h-44"
          />
          <section className="p-6 space-y-2">
            <h3 className="text-1xl font-semibold group-hover:underline group-focus:underline group-hover:text-red-500">{article.title}</h3>
            <h4 className="text-gray-400"> {article.topic} </h4><br />
            <h5 className="text-gray-400"> Votes: {article.votes} </h5>
          </section>
        </section>
      ))}
    </div >
  );
};

export default Home;
