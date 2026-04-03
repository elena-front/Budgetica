import { Outlet, Link } from "react-router";
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
      <header className="siteHeader">
        <div className="shell shell--header">
          <div className="brandBlock">
            <Link className="brandBlock__logo" to={CLIENT_ROUTES.MAIN_PAGE}>
              B
            </Link>
            <div>
              <Link className="brandBlock__title" to={CLIENT_ROUTES.MAIN_PAGE}>
                Budgetica
              </Link>
              <p className="brandBlock__tagline">
                Личный планировщик бюджета с ясной картиной расходов
              </p>
            </div>
          </div>

          <div className="headerActions">
            {!user && (
              <Link to={CLIENT_ROUTES.AUTH} className="btn btn--primary">
                Войти
              </Link>
            )}

            {user && (
              <div className="userPill">
                <div>
                  <span className="userPill__label">Пользователь</span>
                  <strong>{user.name}</strong>
                </div>
                <button onClick={handleSignOut} className="btn btn--ghost">
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="main shell">
        <Outlet />
      </main>
      <footer className="siteFooter">
        <div className="shell shell--footer">
          <div>
            <strong>Budgetica</strong>
            <p className="siteFooter__text">
              Планируйте месяц спокойнее, следите за расходами и сохраняйте больше.
            </p>
          </div>
          <p className="siteFooter__text">Budget Buddy для повседневного контроля бюджета.</p>
        </div>
      </footer>
    </>
  );
}
