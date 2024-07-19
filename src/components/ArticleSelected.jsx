import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../utils/api";
import AllComments from "./AllComments";
import ArticleVotes from "./ArticleVotes";
import WriteComment from "./WriteComment";

const ArticleSelected = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState([]);
  const { article_id } = useParams();
  const [commentsUpdated, setCommentsUpdated] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const navigate = useNavigate();
  // commentAuthor hardcoded during project build
  // eslint-disable-next-line no-unused-vars
  const [commentAuthor, setCommentAuthor] = useState('grumpy19');

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ data }) => {
        return data.article;
      })
      .then((dataReturned) => {
        setArticle(dataReturned);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate(`/error/${error.response?.status || 'general'}`);
      });
  }, [navigate]);

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
      <article className="max-w-2xl px-6 pt-24 mx-auto space-y-12 bg-gray-100 text-gray-900">
        <section className="w-full mx-auto space-y-4 text-center">
          <span className="text-xs font-semibold tracking-wider uppercase">{article.topic}</span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{article.title}</h1>
          <img
            src={article.article_img_url}
            alt={`article image related to ${article.topic}`} />
          <p className="text-sm text-gray-600">by{" "}
            <Link className="underline text-purple-900">
              <span itemProp="name">{article.author}</span>
            </Link> on{" "}
            <span>{new Date(article.created_at).toDateString()}</span>
          </p>
          <ArticleVotes />
        </section>
        <main className="text-gray-800">
          <p>{article.body}</p>
        </main>
        <aside className="pt-4 border-t border-gray-300">
          <span className="font-bold">Comments:</span>
        </aside>
      </article>
      <section>
        <WriteComment
          setCommentsUpdated={setCommentsUpdated}
          setDeleteMessage={setDeleteMessage}
          commentAuthor={commentAuthor}
        />
      </section>
      <section>
        <AllComments
          commentsUpdated={commentsUpdated}
          setCommentsUpdated={setCommentsUpdated}
          deleteMessage={deleteMessage}
          setDeleteMessage={setDeleteMessage}
          commentAuthor={commentAuthor}
        />
      </section>
    </>
  );
};

export default ArticleSelected;
