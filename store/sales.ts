import { defineStore } from 'pinia';
import { useUser } from './user';

export const useSales = defineStore('sales', () => {
    const userStore = useUser();
    const salesList = useState(() => []);
    const paymentsMethodsList = useState(() => []);

    async function loadData() {
        if (salesList.value.length <= 0 || paymentsMethodsList.value.length <= 0) {
            await Promise.all([
                downloadAll(),
                downloadPaymentsMethods(),
            ]);

        }
    }

    async function downloadAll() {
        try {
            const { error, data, refresh }: any = await useFetch(`${userStore.api}/sales`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
                },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userStore.logOut()
                }
                throw error;
            }

            salesList.value = data.value;

            return {
                code: 200
            };
        } catch (e) {
            return {
                code: 400,
                content: e,
            };
        }
    }

    async function downloadPaymentsMethods() {
        try {
            const { error, data, refresh }: any = await useFetch(`${userStore.api}/payments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
                },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userStore.logOut()
                }
                throw error;
            }

            paymentsMethodsList.value = data.value;

            return {
                code: 200,
            };
        } catch (e) {
            return {
                code: 400,
                content: e,
            };
        }
    }

    async function create(form: any) {
        try {
            const { error, data } = await useFetch(`${userStore.api}/sales`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${userStore.token}`,
                },
                body: { ...form },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userStore.logOut()
                }
                throw error;
            }

            await downloadAll();

            return {
                code: 200,
            };
        } catch (e) {
            return {
                code: 400,
                content: e,
            };
        }
    }

    return {
        loadData,
        salesList,
        paymentsMethodsList,
        downloadAll,
        downloadPaymentsMethods,
        create
    };
})