import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postNewComment } from "../utils/api";

const WriteComment = (props) => {
  const [commentBody, setCommentBody] = useState('');
  const { article_id } = useParams();
  const [thanksMessage, setThanksMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleChangeCommentBody = (event) => {
    setCommentBody(event.target.value)
    setThanksMessage(false)
    setErrorMessage(false)
    props.setDeleteMessage(false)
  };

  const handleSubmitComment = (event) => {
    event.preventDefault()
    if (!commentBody.trim()) {
      setErrorMessage("Oops, you need to write something in the comment box first.");
      return;
    }

    postNewComment(article_id, props.commentAuthor, commentBody)
      .then(() => {
        setCommentBody('')
        setThanksMessage(true)
        setErrorMessage(false);
        props.setCommentsUpdated((prevState) => !prevState)
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
    <section
      className="container flex flex-col max-w-2xl px-6 py-2 mx-auto space-y-12 divide-gray-300 bg-gray-100 text-gray-900">
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
          className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
          Post Comment
        </button>
        {thanksMessage &&
          <div className="text-red-600 font-bold">
            <span>Thanks for your comment!</span>
          </div>
        }
        {errorMessage &&
          <div className="text-red-600 font-bold">
            <span>{errorMessage}</span>
          </div>
        }
      </div>
    </section>
  );
};

export default WriteComment;