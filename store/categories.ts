import { defineStore } from 'pinia';
import { useUser } from './user'

export const useCategories = defineStore('categories', () => {
    const userStore = useUser();

    const categoriesList = useState('categoriesList', () => []);

    async function loadData() {
        if (categoriesList.value.length <= 0) {
            await downloadAll();
        }
    }

    async function downloadAll() {
        try {
            const res: any = await useFetch(`${userStore.api}/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
                },
            });

            categoriesList.value = res.data.value;
        } catch (e: any) {
            return {
                code: 400,
                error: new Error(e),
            };
        }
    }

    async function create(description: string) {
        try {
            const res: any = await useFetch(`${userStore.api}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
                },
                body: {
                    description
                }
            });

            if (res.error.value) {
                throw new Error(res.error.value);
            }

            await downloadAll();
            return {
                code: 200,
            };
        } catch (e: any) {
            return {
                code: 400,
                error: new Error(e),
            };
        }
    }

    return {
        categoriesList,
        downloadAll,
        create,
        loadData
    }
})