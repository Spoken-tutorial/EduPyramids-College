import create from "zustand";

export type UserDTO = {
    id: number;
    username: string;
    email: string;
    roles: string[]
};

type AuthState = {
    status: "unknown" | "authenticated" | "anonymous";
    accessToken: string | null;
    user: UserDTO | null;
    login: (p: { access: string; user: UserDTO }) => void;
    setAccessToken: (access: string | null) => void;
    setUser: (u: UserDTO | null) => void;
    logout: () => void;
    setStatus: (s: AuthState["status"]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    status: "unknown",
    accessToken: "",
    user: null,
    login: ({ access, user }) => set({ accessToken: access, user, status: "authenticated" }),
    setAccessToken: (access) => (set({accessToken: access})),
    setUser: (user) => (set({user})),
    logout: () => set({accessToken: null, user: null, status: "anonymous"}),
    setStatus: (s) => set({ status: s}),
}))