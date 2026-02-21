import { Outlet, NavLink, Link } from "react-router";
import { CLIENT_ROUTES } from "../../shared/consts/clientRoutes";
import "./Layout.css";
import UserApi from "../../entities/user/UserApi";
import type { User } from "../../types/common";
import type { Dispatch } from "react";

export default function Layout({
  user,
  setUser,
}: {
  user: User | null;
  setUser: Dispatch<User | null>;
}) {
  const handleSignOut = async () => {
    await UserApi.signOut();
    setUser(null);
  };

  return (
    <>
      ``
      <header>
        <div className="header">
          <nav>
            <NavLink
              to={CLIENT_ROUTES.MAIN_PAGE}
              end
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--active" : ""}`
              }
            >
              Main
            </NavLink>
          </nav>

          <div>
            {!user && (
              <Link to={CLIENT_ROUTES.AUTH} className="btn btn--ghost">
                Login
              </Link>
            )}

            {user && (
              <div className="logoutBtn">
                Hello, {user.name}
                <button onClick={handleSignOut} className="btn btn--ghost">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
