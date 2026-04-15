export const lovable = {
  auth: {
    signInWithOAuth: async (_provider: "google" | "apple" | "microsoft", _opts?: any) => {
      return { error: new Error("OAuth social login is not configured. Please use email/password login.") };
    },
  },
};
