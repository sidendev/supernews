import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api";
import ArticlesNavBar from "./ArticlesNavbar";
import { LiaCommentsSolid } from "react-icons/lia";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortBy, order)
      .then(({ data }) => {
        return data.articles;
      })
      .then((dataReturned) => {
        setArticles(dataReturned);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate(`/error/${error.response?.status || 'general'}`);
      });
  }, [sortBy, order, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-4 h-4 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-purple-900"></div>
      </div>
    )
  }

  return (
    <>
      <ArticlesNavBar searchParams={searchParams} setSearchParams={setSearchParams} />
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
              <section className="p-6 space-y-1">
                <h3 className="text-1xl font-semibold group-hover:underline group-focus:underline group-hover:text-purple-800">
                  {article.title}
                </h3>
                <h4 className="text-purple-800"> {article.topic} </h4>
                <span className="text-gray-400"> Votes: {article.votes} </span><br />
                <span className="text-gray-400">{new Date(article.created_at).toDateString()}</span>
                <span className="flex items-center space-x-2 text-purple-800"><LiaCommentsSolid />
                  <span>{article.comment_count}</span>
                </span>
              </section>
            </li>
          </Link>
        ))}
      </ul >
    </>
  );
};

export default Home;
