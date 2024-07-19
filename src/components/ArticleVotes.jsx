import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, addArticleVote, removeArticleVote } from "../utils/api";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";

const ArticleVotes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentArticleVotes, setCurrentArticleVotes] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ data }) => {
        return data.article;
      })
      .then((dataReturned) => {
        setCurrentArticleVotes(dataReturned.votes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Failed to update article votes, please try refresh page");
      });
  }, [article_id, currentArticleVotes]);

  const handleAddArticleVoteClick = (event) => {
    event.preventDefault()
    setCurrentArticleVotes((currentArticleVotes) => currentArticleVotes + 1)
    addArticleVote(article_id)
  };

  const handleRemoveArticleVoteClick = (event) => {
    event.preventDefault()
    setCurrentArticleVotes((currentArticleVotes) => currentArticleVotes - 1)
    removeArticleVote(article_id)
  };

  return (
    <>
      {isLoading && <div>
        <div className="flex items-center justify-center space-x-2 mt-10">
          <div className="w-2 h-2 rounded-full animate-pulse bg-purple-900"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-purple-900"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-purple-900"></div>
        </div>
      </div>}
      {!isLoading && <div>
        <section className="stats shadow light">
          <div className="stat">
            <div className="stat-title text-purple-900">Article Votes:</div>
            <div className="stat-value text-purple-900">{currentArticleVotes}</div>
          </div>
        </section>
      </div>}
      <button className="btn" onClick={handleAddArticleVoteClick}><FaThumbsUp /></button>
      <button className="btn" onClick={handleRemoveArticleVoteClick}><FaThumbsDown /></button>
      {errorMessage && <div className="error-message text-purple-900 font-bold">{errorMessage}</div>}
    </>
  );
};

export default ArticleVotes;