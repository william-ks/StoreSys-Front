import userFunctions from './userFunctions';

class machinesFunctions {
    private api() {
        const env = useRuntimeConfig();
        return env.public.apiBase;
    }

    private token() {
        const token = useCookie("token");
        return token;
    }

    public async downloadAll() {
        try {
            const { error, data, refresh } = await useFetch(`${this.api()}/machine`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${this.token().value}`,
                },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userFunctions.logOut();
                }
                throw error;
            }

            if (!data.value) {
                await refresh();
            }

            return {
                code: 200,
                content: data.value,
            };
        } catch (e) {
            return {
                code: 400,
                content: e,
            };
        }
    }
}

export default new machinesFunctions();


