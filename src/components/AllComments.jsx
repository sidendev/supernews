import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllComments } from "../utils/api";

const AllComments = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    console.log("Check if this AllComments useEffect is looping!");
    getAllComments(article_id)
      .then(({ data }) => {
        return data.comments;
      })
      .then((dataReturned) => {
        setComments(dataReturned);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul className="container flex flex-col max-w-2xl px-6 py-24 mx-auto space-y-12 divide-gray-300 bg-gray-100 text-gray-900">
      {comments.map((comment) => (
        <li key={comment.comment_id} className="flex justify-between p-4">
          <section className="flex space-x-4">
            <div>
              <span className="font-bold">{comment.author}</span><br />
              <span className="text-xs text-gray-600">{new Date(comment.created_at).toDateString()}</span><br />
              <span className="text-xs font-bold text-red-600">Votes: {comment.votes}</span>
            </div>
          </section>
          <section className="p-4 space-y-2 text-sm text-gray-600">
            <p>{comment.body}</p>
          </section>
        </li>
      ))}
    </ul>
  );
};

export default AllComments;
