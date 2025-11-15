import { apiRequest } from "@/lib/api/client";
import { User, SignInCredentials, SignInResponse } from "@/lib/types/auth";

export const authService = {
  signIn: async (credentials: SignInCredentials): Promise<User> => {
    const data = await apiRequest<SignInResponse>("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    return data.user;
  },
};

