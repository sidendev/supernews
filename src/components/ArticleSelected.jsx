import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import AllComments from "./AllComments";

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
    <>
      <article className="max-w-2xl px-6 pt-24 mx-auto space-y-12 bg-gray-100 text-gray-900">
        <div className="w-full mx-auto space-y-4 text-center">
          <span className="text-xs font-semibold tracking-wider uppercase">{article.topic}</span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{article.title}</h1>
          <img src={article.article_img_url} alt={`article image related to ${article.topic}`} />
          <p className="text-sm text-gray-600">by{" "}
            <Link className="underline text-red-600">
              <span itemProp="name">{article.author}</span>
            </Link> on{" "}
            <span>{new Date(article.created_at).toDateString()}</span>
          </p>
        </div>
        <section className="text-gray-800">
          <p>{article.body}</p>
        </section>
        <div className="pt-4 border-t border-gray-300">
          <span className="font-bold">Comments:</span>
        </div>
      </article>
      <section>
        <AllComments />
      </section>
    </>
  );
};

export default ArticleSelected;
