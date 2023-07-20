import { defineStore } from 'pinia';
import { useUser } from './user'

export const useCategories = defineStore('categories', () => {
    const { api, token } = useUser();

    const categoriesList = useState('categoriesList', () => []);

    async function downloadAll() {
        try {
            const res: any = await useFetch(`${api}/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
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
            const res: any = await useFetch(`${api}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
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
        create
    }
})