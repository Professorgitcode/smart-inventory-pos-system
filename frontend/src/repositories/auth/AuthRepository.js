// ====================================
// AUTHENTICATION REPOSITORY
// ====================================
//
// This repository sits between the
// authentication business logic and the
// authentication service.
//
// It does not construct HTTP requests.
// Those remain inside AuthService.
// ====================================

import AuthService from "../../services/auth/AuthService";

const AuthRepository = {
  // ====================================
  // LOGIN
  // ====================================

  async login(credentials) {
    return await AuthService.login(credentials);
  },

  // ====================================
  // LOGOUT
  // ====================================

  async logout() {
    return await AuthService.logout();
  },

  // ====================================
  // CURRENT USER
  // ====================================

  async fetchProfile() {
    return await AuthService.getProfile();
  }
};

export default AuthRepository;