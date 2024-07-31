import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllComments, deleteComment } from "../utils/api";

const AllComments = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllComments(article_id)
      .then(({ data }) => {
        return data.comments;
      })
      .then((dataReturned) => {
        setComments(dataReturned);
        setIsLoading(false);
        props.setCommentsUpdated(false)
      })
      .catch((error) => {
        console.log(error);
        navigate(`/error/${error.response?.status || 'general'}`);
      });
  }, [props.commentsUpdated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
        <div className="w-6 h-6 rounded-full animate-pulse bg-purple-900"></div>
      </div>
    )
  }

  const renderDeleteButton = (comment) => {
    if (comment.author === props.commentAuthor) {
      return (
        <button
          type="submit"
          id={comment.comment_id}
          onClick={handleSubmitDeleteComment}
          className="btn btn-sm bg-purple-900 text-white hover:bg-purple-800 mt-2"
        >
          Delete
        </button>
      );
    }
    return null;
  };

  const handleSubmitDeleteComment = (event) => {
    const comment_id = event.target.id
    event.preventDefault()
    deleteComment(comment_id)
    props.setDeleteMessage((prevState) => !prevState)
    props.setCommentsUpdated((prevState) => !prevState);
  }

  return (
    <ul className="container flex flex-col max-w-2xl px-6 py-12 mx-auto space-y-12 mb-3 divide-gray-300 bg-base-200">
      {props.deleteMessage && (
        <div className="text-secondary font-bold">
          <span>Comment has been deleted, thank you</span>
        </div>
      )}
      {comments.map((comment) => (
        <li key={comment.comment_id} className="flex justify-start p-2 border-t border-gray-300 mt-2">
          <section className="flex space-x-4">
            <aside>
              <span className="font-bold">{comment.author}</span><br />
              <span className="text-xs">{new Date(comment.created_at).toDateString()}</span><br />
              <span className="text-xs font-bold text-secondary">Votes: {comment.votes}</span><br />
              {renderDeleteButton(comment)}
            </aside>
          </section>
          <section className="p-4 space-y-2 text-sm text-left">
            <p>{comment.body}</p>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default AllComments;
