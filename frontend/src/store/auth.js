import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore({
	id: "auth",
	state: () => {
		return {
			isAuthenticated: false,
			user: null,
			token: null,
			cookiePolicy: localStorage.getItem("cookiePolicy") === "true",
			apiAddress: "https://disertatie-api.azurewebsites.net",
			// apiAddress: "http://127.0.0.1:5088",
		};
	},
	actions: {
		initializeAuthState() {
			if (localStorage.getItem("token") && localStorage.getItem("user")) {
				this.isAuthenticated = true;
				this.token = localStorage.getItem("token");
				this.user = localStorage.getItem("user");
				this.cookiePolicy = localStorage.getItem("cookiePolicy");
			}
			if (this.token) {
				// console.log("token = ",this.token);
				const decodedToken = jwtDecode(this.token);
				// console.log("decoded token = ",decodedToken);
				const expirationTime = decodedToken.exp * 1000;
				// console.log("exp time: ", expirationTime);
				const currentTime = Date.now();
				// console.log("current time: ", currentTime);

				if (currentTime > expirationTime) {
					this.logout();
				}
			}
		},
		login(user) {
			this.user = user.email;
			this.token = user.token;
			this.isAuthenticated = true;

			localStorage.setItem("token", user.token);
			localStorage.setItem("user", user.email);
		},
		logout() {
			this.user = null;
			this.token = null;
			this.isAuthenticated = false;

			localStorage.removeItem("token");
			localStorage.removeItem("user");
		},
		initializeCookieState() {
			if (localStorage.getItem("cookiePolicy")) {
				this.cookiePolicy = localStorage.getItem("cookiePolicy");
			}
		},
		setCookiePolicy() {
			this.cookiePolicy = true;
			localStorage.setItem("cookiePolicy", this.cookiePolicy);
		},
	},
});
