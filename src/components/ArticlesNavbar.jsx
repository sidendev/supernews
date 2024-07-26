const ArticlesNavBar = ({ searchParams, setSearchParams }) => {

  const handleSortChange = (sort_by) => {
    setSearchParams({ sort_by, order: searchParams.get("order") || "desc" });
  };

  const handleOrderChange = (order) => {
    setSearchParams({ sort_by: searchParams.get("sort_by") || "created_at", order });
  };

  return (
    <div className="bg-base-300">
      <div className="navbar bg-base-300 mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1 ps-6">
          <span className="text-secondary text-xl font-semibold">All Articles</span>
        </div>
        <div className="flex-1 hidden md:block items-center text-nowrap">
          <span className="text-secondary text-xl font-bold">Just Super Good News</span>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="text-secondary px-6">
              <details className="dropdown">
                <summary className="font-bold">
                  Sort
                </summary>
                <ul className="p-2 rounded-t-none bg-base-100 mt-2 -left-10 absolute">
                  <li><button
                    className="hover:bg-slate-300 font-semibold"
                    onClick={() => handleSortChange("created_at")}>Date</button></li>
                  <li><button
                    className="hover:bg-slate-300 font-semibold"
                    onClick={() => handleSortChange("comment_count")}>Comments</button></li>
                  <li><button
                    className="hover:bg-slate-300 font-semibold"
                    onClick={() => handleSortChange("votes")}>Votes</button></li>
                </ul>
              </details>
            </li>
            <li className="text-secondary px-6">
              <details className="dropdown">
                <summary className="font-bold">
                  Order
                </summary>
                <ul className="p-2 rounded-t-none bg-base-100 mt-2 -left-10 absolute">
                  <li><button className="hover:bg-slate-300 font-semibold" onClick={() => handleOrderChange("asc")}>Ascending</button></li>
                  <li><button className="hover:bg-slate-300 font-semibold" onClick={() => handleOrderChange("desc")}>Descending</button></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticlesNavBar;