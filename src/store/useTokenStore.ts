import {create} from 'zustand';
import {persist} from 'zustand/middleware';


export const useTokenStore = create(persist<{
    token: string | null;
    setToken: (token: string | null) => void;
}>((set) => ({
    token: null,
    setToken: (token: string | null) => set({token}),
}), {
    name: 'token-storage', // name of the item in the storage (must be unique)
}));