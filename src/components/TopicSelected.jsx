import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getArticlesByTopic } from "../utils/api";
import { FaThumbsUp } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";

const TopicSelected = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const { topic } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic)
      .then(({ data }) => {
        return data.articles;
      })
      .then((dataReturned) => {
        setArticlesByTopic(dataReturned);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate(`/error/${error.response?.status || 'general'}`);
      });
  }, [topic, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-center my-6">
        <h2 className="font-bold text-secondary text-lg">{topic.toUpperCase()}</h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 my-4 mx-2">
        {articlesByTopic.map((article) => (
          <Link key={article.article_id} to={`/article/${article.article_id}`} >
            <li
              className="bg-base-300 h-96 
            rounded-2xl group hover:no-underline focus:no-underline">
              <img
                src={article.article_img_url}
                role="presentation"
                className="object-cover w-full rounded-2xl h-44"
              />
              <section className="p-6 space-y-1">
                <h2 className="text-xl font-semibold group-hover:underline group-focus:underline group-hover:text-purple-500">
                  {article.title}
                </h2>
                <h4 className="text-purple-500 font-semibold"> {article.topic} </h4>
                <span className="text-sm">{new Date(article.created_at).toDateString()}</span>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 font-semibold">
                    <FaThumbsUp className="text-purple-500 text-sm" />
                    <span className="text-sm">{article.votes}</span>
                  </span>
                  <span className="flex items-center space-x-1 px-1 font-semibold">
                    <IoIosChatboxes className="text-purple-500" />
                    <span className="text-sm">{article.comment_count}</span>
                  </span>
                </div>
              </section>
            </li>
          </Link>
        ))}
      </ul >
    </>
  );
};

export default TopicSelected;