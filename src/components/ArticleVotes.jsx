import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, addArticleVote, removeArticleVote } from "../utils/api";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';


const ArticleVotes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentArticleVotes, setCurrentArticleVotes] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const { article_id } = useParams();
  const { user } = useAuth();


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
    event.preventDefault();
    if (!user) {
      setErrorMessage("Please log in first to vote");
      return;
    }
    if (hasVoted) {
      setErrorMessage("You can only vote once");
      return;
    }
    setCurrentArticleVotes((currentArticleVotes) => currentArticleVotes + 1);
    addArticleVote(article_id);
    setHasVoted(true);
  };

  const handleRemoveArticleVoteClick = (event) => {
    event.preventDefault();
    if (!user) {
      setErrorMessage("Please log in first to vote");
      return;
    }
    if (hasVoted) {
      setErrorMessage("You can only vote once");
      return;
    }
    setCurrentArticleVotes((currentArticleVotes) => currentArticleVotes - 1);
    removeArticleVote(article_id);
    setHasVoted(true);
  };

  return (
    <>
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="flex items-center space-x-4 p-2 bg-base-300 rounded-full">
          <div className="flex items-center space-x-2 bg-base-300 rounded-full p-2" style={{ minWidth: '100px' }}>
            {isLoading ? (
              <span className="loading loading-spinner text-secondary"></span>
            ) : (
              <>
                <span className="text-secondary font-bold">Votes:</span>
                <span className="text-secondary font-bold">{currentArticleVotes}</span>
              </>
            )}
          </div>
          <button
            className="btn btn-circle"
            onClick={handleAddArticleVoteClick}
          >
            <FaThumbsUp />
          </button>
          <button
            className="btn btn-circle"
            onClick={handleRemoveArticleVoteClick}
          >
            <FaThumbsDown />
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="error-message text-secondary font-bold">{errorMessage}</div>
      )}
    </>
  );
};

export default ArticleVotes;