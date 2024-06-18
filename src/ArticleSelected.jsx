import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "./utils/api";

const ArticleSelected = () => {
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    console.log("Check if this ArticleSelected useEffect is looping!");
    getArticleById(article_id)
      .then(({ data }) => {
        return data.article;
      })
      .then((dataReturned) => {
        setArticle(dataReturned);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <article className="max-w-2xl px-6 py-24 mx-auto space-y-12 bg-gray-100 text-gray-900">
        <div className="w-full mx-auto space-y-4 text-center">
          <p className="text-xs font-semibold tracking-wider uppercase">{article.topic}</p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{article.title}</h1>
          <img src={article.article_img_url} alt={`article image related to ${article.topic}`} />
          <p className="text-sm text-gray-600">by {" "}
            <Link className="underline text-red-600">
              <span itemProp="name">{article.author}</span>
            </Link> on
            <span>{new Date(article.created_at).toDateString()}</span>
          </p>
        </div>
        <div className="text-gray-800">
          <p>{article.body}</p>
        </div>
        <div className="pt-12 border-t border-gray-300">
        </div>
      </article>
    </div>
  );
};

export default ArticleSelected;
