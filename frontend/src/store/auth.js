import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  },
  actions: {
    initializeAuthState() {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        this.isAuthenticated = true;
        this.user = JSON.parse(userString);

        if (this.isTokenExpired(token)) {
          this.logout();
        } else {
          this.token = token;
        }
      }
    },
    login(user, token) {
      this.user = user;
      this.token = token;
      this.isAuthenticated = true;

      localStorage.setItem("token", token.access);
      localStorage.setItem("user", JSON.stringify(user));

      const expiresIn = token.expiresIn * 1000;
      setTimeout(() => {
        this.logout();
      }, expiresIn);
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    isTokenExpired(token) {
      const now = Date.now() / 1000;
      return now >= token.expiresIn;
    },
  },
});
