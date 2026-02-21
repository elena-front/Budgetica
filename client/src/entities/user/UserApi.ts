import type { AxiosError } from "axios";
import { axiosInstance } from "../../shared/lib/axiosInstance";
import type { SignInData, SignUpData } from "../../types/common";

export default class UserApi {
  static async signUp(userData: SignUpData) {
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return (error as AxiosError).response?.data;
    }
  }

  static async signIn(userData: SignInData) {
    try {
      const response = await axiosInstance.post("/auth/signin", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return (error as AxiosError).response?.data;
    }
  }

  static async refresh() {
    try {
      const response = await axiosInstance.get("/auth/refresh");
      return response.data;
    } catch (error) {
      console.log(error);
      return (error as AxiosError).response?.data;
    }
  }

  static async signOut() {
    try {
      const response = await axiosInstance.get("/auth/signout");
      return response.data;
    } catch (error) {
      console.log(error);
      return (error as AxiosError).response?.data;
    }
  }
}
