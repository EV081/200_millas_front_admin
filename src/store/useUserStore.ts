import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type User } from "@interfaces/auth"


export const useUserStore = create(persist<{
    user: User | null;
    setUser: (user: User | null) => void;
}>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
}), {
    name: "user-storage", // name of the item in the storage (must be unique)
}))
