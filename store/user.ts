import { defineStore } from 'pinia';

type Login = {
    email: string,
    password: string,
}

export const useUser = defineStore('user', () => {
    const env = useRuntimeConfig();
    const api = env.public.apiBase;
    const token = useCookie("token", { maxAge: 60 * 60 * 8 });
    const user = useCookie("user", { maxAge: 60 * 60 * 8 });
    const office = useCookie("office", { maxAge: 60 * 60 * 8 });

    function removeCookies() {
        token.value = null;
        user.value = null;
        office.value = null;
    }

    async function login(form: Login) {
        try {
            const { data }: any = await useFetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { ...form },
            });

            token.value = data.value.token;
            user.value = data.value.user.name;

            switch (data.value.user.hierarchy.name) {
                case 'Developer':
                    office.value = '1';
                    break;
                case 'Master':
                    office.value = '2';
                    break;
                case 'Admin':
                    office.value = '3';
                    break;
                case 'Employee':
                    office.value = '4';
                    break;
            }

            return { code: 200 };
        } catch (e: any) {
            return {
                code: 400,
                error: new Error(e),
            };
        }
    }

    function logOut() {
        removeCookies();
        navigateTo('/')
    }

    async function getUserInfoFromToken() {
        try {
            const { error, data } = await useFetch(`${api}/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token.value}`,
                },
            });

            if (error.value) {
                throw error;
            }

            return { code: 200, content: data.value };
        } catch (e) {
            return false
        }
    }

    return {
        token,
        office,
        user,
        api,
        login,
        logOut,
        getUserInfoFromToken,
        removeCookies
    };
})