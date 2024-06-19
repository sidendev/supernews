import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllComments } from "../utils/api";

const AllComments = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

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
      });
  }, [props.commentsUpdated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 mt-10">
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-red-600"></div>
      </div>
    )
  }

  return (
    <ul className="container flex flex-col max-w-2xl px-6 py-12 mx-auto space-y-12 divide-gray-300 bg-gray-100 text-gray-900">
      {comments.map((comment) => (
        <li key={comment.comment_id} className="flex justify-start p-4">
          <section className="flex space-x-4">
            <aside>
              <span className="font-bold">{comment.author}</span><br />
              <span className="text-xs text-gray-600">{new Date(comment.created_at).toDateString()}</span><br />
              <span className="text-xs font-bold text-red-600">Votes: {comment.votes}</span>
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
