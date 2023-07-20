import { defineStore } from 'pinia';

export const useUser = defineStore('user', () => {
    const env = useRuntimeConfig();
    const api = env.public.apiBase;
    const token = useCookie("token", {
        maxAge: 60 * 60 * 8
    });
    const user = useCookie("user", {
        maxAge: 60 * 60 * 8
    });
    const office = useCookie("office", {
        maxAge: 60 * 60 * 8
    });

    return {
        token,
        office,
        user,
        api,
    };
})