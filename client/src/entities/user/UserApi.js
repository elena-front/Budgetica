import { axiosInstance } from '../../shared/lib/axiosInstance';

export default class UserApi {

    static async signUp(userData) {
        try {
            const response = await axiosInstance.post('/auth/signup', userData);
            return response.data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

    static async signIn(userData) {
        try {
            const response = await axiosInstance.post('/auth/signin', userData);
            return response.data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

    static async refresh() {
        try {
            const response = await axiosInstance.get('/auth/refresh');
            return response.data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

    static async signOut() {
        try {
            const response = await axiosInstance.get('/auth/signout');
            return response.data;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    }

}