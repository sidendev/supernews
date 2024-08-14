import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postNewComment } from "../utils/api";
import { useAuth } from '../context/AuthContext';

const WriteComment = (props) => {
  const [commentBody, setCommentBody] = useState('');
  const { article_id } = useParams();
  const [thanksMessage, setThanksMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChangeCommentBody = (event) => {
    setCommentBody(event.target.value)
    setThanksMessage(false)
    setErrorMessage(false)
    props.setDeleteMessage(false)
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (!user) {
      setErrorMessage("Please log in first to post a comment");
      return;
    }
    if (!commentBody.trim()) {
      setErrorMessage("Oops, you need to write something in the comment box first.");
      return;
    }

    postNewComment(article_id, props.commentAuthor, commentBody.trim())
      .then(() => {
        setCommentBody('');
        setThanksMessage(true);
        setErrorMessage(false);
        props.setCommentsUpdated((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
        setThanksMessage(false);
        if (error.response?.status) {
          navigate(`/error/${error.response.status}`);
        } else {
          setErrorMessage("Something went wrong, please try again.");
        }
      });
  };

  return (
    <section className="container flex flex-col max-w-2xl px-6 py-2 mx-auto space-y-12 divide-gray-300 bg-base-200">
      {user ? (
        <div>
          <textarea
            type='text'
            id="commentBody"
            placeholder="Write your comment here..."
            className="textarea textarea-bordered w-full max-w-xs"
            onChange={handleChangeCommentBody}
            value={commentBody}>
          </textarea>
          <br />
          <button
            type="submit"
            onClick={handleSubmitComment}
            className="btn btn-sm bg-purple-900 text-white hover:bg-purple-800">
            Post Comment
          </button>
          {thanksMessage &&
            <div className="text-secondary font-bold">
              <span>Thanks for your comment!</span>
            </div>
          }
        </div>
      ) : (
        <div className="text-secondary font-bold">
          <span>Please log in first to post a comment</span>
        </div>
      )}
      {errorMessage &&
        <div className="text-secondary font-bold">
          <span>{errorMessage}</span>
        </div>
      }
    </section>
  );

};

export default WriteComment;