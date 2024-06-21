import { useSearchParams } from "react-router-dom";

const ArticlesNavBar = ({ searchParams, setSearchParams }) => {

  const handleSortChange = (sort_by) => {
    setSearchParams({ sort_by, order: searchParams.get("order") || "desc" });
  };

  const handleOrderChange = (order) => {
    setSearchParams({ sort_by: searchParams.get("sort_by") || "created_at", order });
  };

  return (
    <div className="navbar bg-base-300 px-3">
      <div className="flex-1 ps-6">
        <span className="text-red-600 text-xl">All Articles</span>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="text-red-600 px-6">
            <details>
              <summary className="font-bold">
                Sort
              </summary>
              <ul className="p-2 bg-white rounded-t-none">
                <li><button
                  className="hover:bg-slate-300"
                  onClick={() => handleSortChange("created_at")}>Date</button></li>
                <li><button
                  className="hover:bg-slate-300"
                  onClick={() => handleSortChange("comment_count")}>Comments</button></li>
                <li><button
                  className="hover:bg-slate-300"
                  onClick={() => handleSortChange("votes")}>Votes</button></li>
              </ul>
            </details>
          </li>
          <li className="text-red-600 px-6">
            <details>
              <summary className="font-bold">
                Order
              </summary>
              <ul className="p-2 bg-white rounded-t-none">
                <li><button className="hover:bg-slate-300" onClick={() => handleOrderChange("asc")}>Ascend</button></li>
                <li><button className="hover:bg-slate-300" onClick={() => handleOrderChange("desc")}>Descend</button></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ArticlesNavBar;