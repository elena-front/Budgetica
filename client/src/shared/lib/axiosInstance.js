import axios from 'axios';

//конфигурируем клиент для http запросов
export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,   // адрес
    headers: { 'Content-Type': 'application/json' }, //dвключать эти заголовки
    withCredentials: true,  // прикладывать куки
});

let accessToken = '';

//настраиваем интерцептор (ф-я для изменения accessToken)
export function setAccessToken(newAccessToken) {
    accessToken = newAccessToken;
}
//добавляем  accessToken в заголовок 
axiosInstance.interceptors.request.use((config) => {
    if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const previousRequest = error.config;

        if (error.response?.status === 403 && !previousRequest.sent) {
            previousRequest.sent = true;
            try {
                const { data } = await axiosInstance.get('/auth/refresh');
                const newToken = data.data.accessToken;
                setAccessToken(newToken);
                previousRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(previousRequest);
            } catch (error) {
                setAccessToken('');
                window.location.href = '/auth';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    });