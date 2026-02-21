import { Routes, Route } from "react-router";
import Layout from "../Layout/Layout";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import AuthPage from "../../pages/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import type { SetUser, User } from "../../types/common";

export default function AppRouter({
  user,
  setUser,
  userIsLoading,
}: {
  user: User | null;
  setUser: SetUser;
  userIsLoading: boolean;
}) {
  return (
    <Routes>
      <Route
        path={CLIENT_ROUTES.MAIN_PAGE}
        element={<Layout user={user} setUser={setUser} />}
      >
        <Route
          path={CLIENT_ROUTES.AUTH}
          element={
            <ProtectedRoute
              anonymous={true}
              user={user}
              userIsLoading={userIsLoading}
              element={<AuthPage setUser={setUser} />}
            />
          }
        ></Route>
      </Route>
    </Routes>
  );
}
