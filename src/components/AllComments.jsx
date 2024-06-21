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
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
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
          className="btn btn-sm bg-red-600 text-white hover:bg-red-700 mt-2"
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
    <ul className="container flex flex-col max-w-2xl px-6 py-12 mx-auto space-y-12 divide-gray-300 bg-gray-100 text-gray-900">
      {props.deleteMessage && (
        <div className="text-red-600 font-bold">
          <span>Comment has been deleted, thank you</span>
        </div>
      )}
      {comments.map((comment) => (
        <li key={comment.comment_id} className="flex justify-start p-2 border-t border-gray-300 mt-2">
          <section className="flex space-x-4">
            <aside>
              <span className="font-bold">{comment.author}</span><br />
              <span className="text-xs text-gray-600">{new Date(comment.created_at).toDateString()}</span><br />
              <span className="text-xs font-bold text-red-600">Votes: {comment.votes}</span><br />
              {renderDeleteButton(comment)}
            </aside>
          </section>
          <section className="p-4 space-y-2 text-sm text-gray-600 text-left">
            <p>{comment.body}</p>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default AllComments;
