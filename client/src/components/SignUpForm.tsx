import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SubmitEvent,
} from "react";
import { setAccessToken } from "../shared/lib/axiosInstance";
import "./SignUpForm.css";
import { UserValidator } from "../entities/user/model/UserValidator";
import UserApi from "../entities/user/UserApi";
import type { User } from "../types/common";

function SignUpForm({ setUser }: { setUser: Dispatch<User | null> }) {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const [signUpData, setSignUpData] = useState(initialValue);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const signUpHandler = async (event: SubmitEvent) => {
    event.preventDefault();

    const { isValid, error: validationError } =
      UserValidator.validateSignUpData(signUpData);

    if (!isValid) {
      alert(validationError);
      return;
    }

    const { statusCode, data, error } = await UserApi.signUp(signUpData);
    if (statusCode === 201) {
      setAccessToken(data.accessToken);
      setUser(data.user);
      setSignUpData(initialValue);
    } else {
      alert(error || "Ошибка при входе в приложение");
    }
  };

  return (
    <>
      <form className="form" onSubmit={signUpHandler}>
        <div className="inputGroup">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            placeholder="ваше имя"
            name="name"
            type="text"
            required
            onChange={inputHandler}
            value={signUpData.name}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="you@example.com"
            name="email"
            type="email"
            required
            onChange={inputHandler}
            value={signUpData.email}
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
            value={signUpData.password}
          />
        </div>

        <button className="btn btn--active m20" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}

export default SignUpForm;
