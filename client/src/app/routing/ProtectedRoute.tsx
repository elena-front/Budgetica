import { useLocation } from "react-router";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import { Navigate } from "react-router";
import type { User } from "../../types/common";
import type { ReactElement } from "react";

const ProtectedRoute = ({
  element,
  anonymous = false,
  user,
  userIsLoading,
}: {
  element: ReactElement;
  anonymous: boolean;
  user: User | null;
  userIsLoading: boolean;
}) => {
  const location = useLocation();

  if (user && anonymous) {
    return <Navigate to={CLIENT_ROUTES.MAIN_PAGE} replace />;
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
