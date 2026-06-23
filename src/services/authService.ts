import axios from "axios";
import { signIn, signOut } from "next-auth/react";

const authService = {
  register(name: string, email: string, password: string) {
    return axios.post("/api/auth/register", { name, email, password });
  },
  login(email: string, password: string) {
    return signIn("credentials", { email, password, redirect: false });
  },
  logout() {
    return signOut({ redirect: false });
  },
};

export default authService;