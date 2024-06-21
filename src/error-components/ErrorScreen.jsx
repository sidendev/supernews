import { Link, useParams } from "react-router-dom";
import ErrorScreen400 from "./ErrorScreen400";
import ErrorScreen404 from "./ErrorScreen404";
import ErrorScreen500 from "./ErrorScreen500";
import ErrorScreenGeneral from "./ErrorScreenGeneral";

const ErrorScreen = () => {
  const { status } = useParams();

  const renderErrorScreen = () => {
    switch (status) {
      case '400':
        return <ErrorScreen400 />;
      case '404':
        return <ErrorScreen404 />;
      case '500':
        return <ErrorScreen500 />;
      default:
        return <ErrorScreenGeneral />;
    }
  };

  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        {renderErrorScreen()}
        <br />
        <p className="mt-4 text-gray-500">
          Try returning to the home screen to start from the beginning.
        </p>
        <br />
        <Link to={'/'}>
          <button className="btn btn-sm bg-red-600 text-white hover:bg-red-700">
            Go back to home
          </button>
        </Link>
      </div>
    </div>

  );
};

export default ErrorScreen;