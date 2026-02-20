import { useLocation } from "react-router";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import { Navigate } from "react-router";

const ProtectedRoute = ({
  element,
  anonymous = false,
  user,
  userIsLoading,
}) => {
  const location = useLocation();

  if (user && anonymous) {
    return <Navigate to={CLIENT_ROUTES.APP} replace />;
  }

  if (!user && !anonymous) {
    return userIsLoading ? (
      <></>
    ) : (
      <Navigate to={CLIENT_ROUTES.AUTH} state={{ from: location }} replace />
    );
  }

  return element;
};

export default ProtectedRoute;
