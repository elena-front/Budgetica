import { User } from "../db/models";
import type {
  SingupData,
  SignInData,
  CreateUserDTO,
} from "../types/database.types";

export default class UserService {
  // Найти пользователя по email
  static async getUserByEmail(email: string) {
    return (await User.findOne({ where: { email } }))?.get();
  }
  // Создаём пользователя в БД
  static async createNewUser(userData: CreateUserDTO) {
    return (await User.create(userData))?.get();
  }

  static validateEmail(email: string) {
    const emailPattern = /^[A-z0-9!-_%.]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password: string) {
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigits = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*(),.:"{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUppercase.test(password) ||
      !hasLowercase.test(password) ||
      !hasDigits.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    }
    return true;
  }

  static validateSignUpData(data: SingupData) {
    const { name, email, password } = data;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return {
        isValid: false,
        error: "Имя пользователя не должно быть пустым",
      };
    }

    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !UserService.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "Ошибка валидации адреса электронной почты",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0 ||
      !UserService.validatePassword(password)
    ) {
      return {
        isValid: false,
        error: "Пароль не соответствует критериям валидации",
      };
    }

    return { isValid: true, error: null };
  }

  static validateSignInData(data: SignInData) {
    const { email, password } = data;

    if (
      !email ||
      typeof email !== "string" ||
      email.trim().length === 0 ||
      !UserService.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: "Ошибка валидации адреса электронной почты",
      };
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      return {
        isValid: false,
        error: "Пароль не соответствует критериям валидации",
      };
    }

    return { isValid: true, error: null };
  }
}
