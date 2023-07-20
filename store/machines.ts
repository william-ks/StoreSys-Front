import { defineStore } from "pinia";
import { useUser } from "./user";
import userFunctions from "~/composables/contextFunctions/userFunctions";

export const useMachines = defineStore('useMachines', () => {
    const userStore = useUser();
    const machinesList = useState('machines', () => []);

    async function loadData() {
        if (machinesList.value.length <= 0) {
            await downloadAll();
        }
    }

    async function downloadAll() {
        try {
            const { error, data, refresh }: any = await useFetch(`${userStore.api}/machine`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
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

            machinesList.value = data.value;

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

    return {
        machinesList,
        downloadAll,
        loadData
    }
});