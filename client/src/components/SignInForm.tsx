import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SubmitEvent,
} from "react";
import { useNavigate } from "react-router";
import "./SignInForm.css";
import UserApi from "../entities/user/UserApi";
import { setAccessToken } from "../shared/lib/axiosInstance";
import { CLIENT_ROUTES } from "../shared/consts/clientRoutes";
import type { User } from "../types/common";

function SignInForm({ setUser }: { setUser: Dispatch<User | null> }) {
  const initialValue = { email: "", password: "" };
  const [signInData, setSignInData] = useState(initialValue);
  const navigate = useNavigate();

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSignInData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signInHandler = async (event: SubmitEvent) => {
    event.preventDefault();

    const { statusCode, data, error } = await UserApi.signIn(signInData);
    if (statusCode === 200) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      navigate(CLIENT_ROUTES.MAIN_PAGE);
      setSignInData(initialValue);
    } else {
      alert(error || "Ошибка при входе в приложение");
    }
  };

  return (
    <>
      <form className="form" onSubmit={signInHandler}>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="you@example.com"
            name="email"
            type="email"
            required
            onChange={inputHandler}
            value={signInData.email}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            placeholder="*****"
            name="password"
            type="password"
            required
            onChange={inputHandler}
            value={signInData.password}
          />
        </div>
        <button className="btn btn--active m20" type="submit">
          Войти
        </button>
      </form>
    </>
  );
}

export default SignInForm;
