// ====================================
// AUTHENTICATION SERVICE
// ====================================
//
// This service communicates directly
// with the authentication API.
//
// Repository/business logic should not
// construct Axios requests themselves.
// ====================================

import apiClient from "../../api/apiClient";
import ENDPOINTS from "../../api/endpoints";

class AuthService {
  // ====================================
  // LOGIN
  // ====================================

  async login(credentials) {
    const response =
      await apiClient.post(
        ENDPOINTS.AUTH.LOGIN,
        credentials
      );

    return response.data;
  }

  // ====================================
  // LOGOUT
  // ====================================

  async logout() {
    // ----------------------------------
    // Current backend uses stateless JWT
    // authentication and has no server-side
    // logout endpoint yet.
    //
    // Therefore there is no API call here.
    // AuthProvider clears local auth state.
    // ----------------------------------

    return null;
  }

  // ====================================
  // CURRENT USER
  // ====================================

 async getProfile() {
  const response = await apiClient.get(
    ENDPOINTS.AUTH.ME
  );

  return response.data;
}
}

export default new AuthService();