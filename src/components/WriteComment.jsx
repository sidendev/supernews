import { useState } from "react";
import { useParams } from "react-router-dom";
import { postNewComment } from "../utils/api";

const WriteComment = (props) => {
  const [commentBody, setCommentBody] = useState('');
  const { article_id } = useParams();
  const [thanksMessage, setThanksMessage] = useState(false);

  const handleChangeCommentBody = (event) => {
    setCommentBody(event.target.value)
    setThanksMessage(false)
    props.setDeleteMessage(false)
  };

  const handleSubmitComment = (event) => {
    event.preventDefault()
    postNewComment(article_id, props.commentAuthor, commentBody)
    setCommentBody('')
    setThanksMessage(true)
    props.setCommentsUpdated((prevState) => !prevState)
  }

  return (
    <section className="container flex flex-col max-w-2xl px-6 py-2 mx-auto space-y-12 divide-gray-300 bg-gray-100 text-gray-900">
      <div>
        <textarea
          type='text'
          id="commentBody"
          placeholder="Write your comment here..."
          className="textarea textarea-bordered w-full max-w-xs"
          onChange={handleChangeCommentBody}
          value={commentBody}>
        </textarea><br />
        <button
          type="submit"
          onClick={handleSubmitComment}
          className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
          Post Comment
        </button>
        {thanksMessage && <div className="text-red-600 font-bold"><span>Thanks for your comment!</span></div>}
      </div>
    </section>
  );
};

export default WriteComment;