import UserService from "../service/User.service";
import formatResponse from "../utils/formatResponse";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens";
import cookieConfig from "../config/cookieConfig";
import type { Request, Response } from "express";

export async function signIn(req: Request, res: Response) {
  // Достаём данные для логина из тела запроса
  const { email, password } = req.body;

  // Валидация данных
  const { isValid, error } = UserService.validateSignInData({
    email,
    password,
  });

  if (!isValid) {
    return res
      .status(400)
      .json(formatResponse(400, "Ошибка валидации", null, error));
  }

  // Нормализация адреса эл. почты
  const normalizedEmail = email.toLowerCase().trim();

  try {
    // Проверяем наличие пользователя с таким email
    const existingUser = await UserService.getUserByEmail(normalizedEmail);

    if (!existingUser) {
      return res
        .status(404)
        .json(
          formatResponse(
            404,
            "Пользователь с таким адресом электронной почты не зарегистрирован",
            null,
            "Пользователь с таким адресом электронной почты не зарегистрирован",
          ),
        );
    }
    // сравниваем хэш пароля с хэшем из БД
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isValidPassword) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Неверные данные для входа",
            null,
            "Неверные данные для входа",
          ),
        );
    }

    // Удаляем пароль из объекта пользователя
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = existingUser;

    // Выписываем новые токены
    const { accessToken, refreshToken } = generateTokens({
      user: safeUser,
    });
    // refreshToken - отправляем в cookie, accessToken и user отправляем в ответе от сервера
    res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json(
        formatResponse(
          200,
          "Успешный логин",
          { user: safeUser, accessToken },
          null,
        ),
      );
  } catch (error) {
    console.log("==== UserController.signIn ==== ");
    console.log(error);
    res
      .status(500)
      .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
  }
}

export async function signUp(req: Request, res: Response) {
  // Достаём данные для регистрации из тела запроса
  const { name, email, password } = req.body;

  // Валидация данных
  const { isValid, error } = UserService.validateSignUpData({
    name,
    email,
    password,
  });

  if (!isValid) {
    return res
      .status(400)
      .json(formatResponse(400, "Ошибка валидации", null, error));
  }

  // Нормализация адреса эл. почты
  const normalizedEmail = email.toLowerCase().trim();
  try {
    // Проверяем наличие пользователя с таким email
    const existingUser = await UserService.getUserByEmail(normalizedEmail);

    if (existingUser) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Пользователь с таким адресом электронной почты уже зарегистрирован",
            null,
            "Пользователь с таким адресом электронной почты уже зарегистрирован",
          ),
        );
    }
    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем пользователя в БД
    const newUser = await UserService.createNewUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res
        .status(500)
        .json(
          formatResponse(
            500,
            "Ошибка при создании пользователя",
            null,
            "Ошибка при создании пользователя",
          ),
        );
    }
    // Удаляем пароль из объекта пользователя
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = newUser;

    const { accessToken, refreshToken } = generateTokens({ user: safeUser });

    res
      .status(201)
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json(
        formatResponse(
          201,
          "Регистрация успешна",
          { user: safeUser, accessToken },
          null,
        ),
      );
  } catch (error) {
    console.log("==== UserController.signUp ==== ");
    console.log(error);
    res
      .status(500)
      .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
  }
}

export async function refresh(req: Request, res: Response) {
  // Достаём данные пользователя из res.locals, там он появился благодаря  мидлваре verifyRefreshToken
  try {
    const { user } = res.locals;

    if (!user) {
      return res
        .status(401)
        .json(
          formatResponse(
            401,
            "Ошибка при продлении сессии",
            null,
            "Ошибка при продлении сессии",
          ),
        );
    }

    // Выписываем новые токены
    const { accessToken, refreshToken } = generateTokens({
      user,
    });
    // refreshToken - отправляем в cookie, accessToken и user отправляем в ответе от сервера
    res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieConfig)
      .json(
        formatResponse(
          200,
          "Пользовательская сессия продлена успешно",
          { user, accessToken },
          null,
        ),
      );
  } catch (error: unknown) {
    console.log("==== UserController.refreshTokens ==== ");
    console.log(error);
    res
      .status(500)
      .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
  }
}

export async function signOut(req: Request, res: Response) {
  try {
    res
      .status(200)
      .clearCookie("refreshToken")
      .json(formatResponse(200, "Успешный выход из приложения"));
  } catch (error) {
    console.log("==== UserController.signOut ==== ");
    console.log(error);
    res
      .status(500)
      .json(formatResponse(500, "Внутренняя ошибка сервера", null, error));
  }
}
