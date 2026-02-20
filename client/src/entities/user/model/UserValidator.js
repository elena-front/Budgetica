export class UserValidator {
  static validateEmail(email) {
    const emailPattern = /^[A-z0-9!-_%.]+@[A-z0-9.-]+\.[A-z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password) {
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

  static validateSignUpData(data) {
    const { name: name, email, password } = data;

    if (
      !name ||
      typeof name !== 'string' ||
      name.trim().length === 0
    ) {
      return {
        isValid: false,
        error: 'Имя пользователя не должно быть пустым',
      };
    }

    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length === 0 ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: 'Ошибка валидации адреса электронной почты',
      };
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length === 0 ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        error: 'Пароль не соответствует критериям валидации',
      };
    }

    return { isValid: true, error: null };
  }

  static validateSignInData(data) {
    const { email, password } = data;

    if (
      !email ||
      typeof email !== 'string' ||
      email.trim().length === 0 ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: 'Ошибка валидации адреса электронной почты',
      };
    }

    if (
      !password ||
      typeof password !== 'string' ||
      password.trim().length === 0
    ) {
      return {
        isValid: false,
        error: 'Пароль не соответствует критериям валидации',
      };
    }

    return { isValid: true, error: null };
  }
}