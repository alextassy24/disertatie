import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => {
    return {
      isAuthenticated: false,
      user: null,
      // fistName: null,
      // lastName: null,
      // phoneNumber: null,
      // email: null,
      // age: null,
      // wearers: [],
      // products: [],
    };
  },
  actions: {
    initializeAuthState(){
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');

      if(token && userString){
        this.isAuthenticated = true;
        this.user = JSON.parse(userString);
      }
    },
    login(user, token) {
      this.user = user;
      this.isAuthenticated = true;
      // this.fistName = user.fistName;
      // this.lastName = user.lastName;
      // this.phoneNumber = user.phoneNumber;
      // this.email = user.email;
      // this.age = user.age;
      // this.wearers = user.wearers;
      // this.products = user.products;

      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(user));
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      // this.fistName = null;
      // this.lastName = null;
      // this.phoneNumber = null;
      // this.email = null;
      // this.age = null;
      // this.wearers = [];
      // this.products = [];

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});
