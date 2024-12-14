import { create } from "zustand";
import axios from "axios";
import { API_CONST } from "../constants/api.constants";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signup: async (name, email, password) => {
    set({ error: null, isLoading: true });
    try {
      const response = await axios.post(API_CONST.signup, {
        name: name,
        email: email,
        password: password,
      });
      if (response.status === 200 && response.data.success) {
        set((state) => ({
          ...state,
          user: response.data.user,
          isLoading: false,
        }));
      } else {
        throw new Error(response?.data?.message || "sign up failed");
      }
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },

  login: async (email, password) => {
    try {
      set({ error: null, isLoading: true });
      const response = await axios.post(API_CONST.login, {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data.success) {
        set({ user: response.data.user });
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      set({ error: error.response?.data?.message || error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  verifyEmail: async (token) => {
    console.log(token);

    try {
      set((state) => ({ ...state, isLoading: true, error: null }));
      const response = await axios.post(API_CONST.verifyEmail, {
        verificationToken: token,
      });
      if (response.status === 200 && response?.data?.success) {
        set((state) => ({ ...state, user: response.data.user }));
      } else {
        throw new Error(response?.data?.message || "verification failed");
      }
    } catch (error) {
      set({ error: error?.response?.data?.message || error.message });
    } finally {
      set((state) => ({ ...state, isLoading: false }));
    }
  },
  logOut: async () => {
    set({ error: null, isLoading: true });
    try {
      await axios.post(API_CONST.logout);
      set({ user: null });
    } catch (error) {
      set({ error: error.response?.data?.message || "logout failed" });
    } finally {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    set({ error: null, isLoading:true,user:null });
    try {
        const response = await axios.get(API_CONST.checkAuth);
        if (response.status === 200 && response.data.success) {
            set({ user: response.data.user });
          } else {
            throw new Error(response.data.message || "Login failed");
          }
    } catch {
        set({ error: null});
    }finally {set({isLoading:false})}
},
}));
