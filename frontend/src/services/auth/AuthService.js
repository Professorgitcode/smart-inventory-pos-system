import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class AuthService {

    async login(credentials) {

        const response =
            await apiClient.post(
                ENDPOINTS.AUTH.LOGIN,
                credentials
            );

        return response.data;

    }

    async logout() {

        await apiClient.post(
            ENDPOINTS.AUTH.LOGOUT
        );

    }

}

export default new AuthService();