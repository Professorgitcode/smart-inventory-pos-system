import AuthService from "../services/auth/AuthService";

const AuthRepository = {

    async login(credentials) {
        return await AuthService.login(credentials);
    },

    async logout() {
        return await AuthService.logout();
    },

    async fetchProfile() {
        return await AuthService.getProfile();
    },

    async refreshToken() {
        return await AuthService.refreshToken();
    }

};

export default AuthRepository;