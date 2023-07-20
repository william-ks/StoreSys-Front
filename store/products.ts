import { defineStore } from "pinia";
import { useUser } from "./user";

export const useProducts = defineStore('useProducts', () => {
    const userStore = useUser();

    const productList = useState(() => []);

    async function loadData() {
        if (productList.value.length <= 0) {
            await downloadAll();
        }
    }

    async function downloadAll() {

        try {
            const res: any = await useFetch(`${userStore.api}/product`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
                },
            });

            if (res.error) {
                if (res.error.value?.data.code === 609) {
                    return userStore.logOut();
                }
            }

            productList.value = res.data.value;

            return {
                code: 200
            };
        } catch (e: any) {
            return {
                code: 400,
                error: new Error(e),
            };
        }
    }

    async function downloadOne(id: number) {

        try {
            const res = await useFetch(`${userStore.api}/product/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${userStore.token}`,
                },
            });

            if (res.error) {
                if (res.error.value?.data.code === 609) {
                    userStore.logOut();
                }
            }

            return {
                code: 200,
                content: res.data.value,
            };
        } catch (e: any) {
            return {
                code: 400,
                error: new Error(e),
            };
        }
    }

    async function uploadImg(form: any) {

        try {
            const { error, data } = await useFetch(`${userStore.api}/product/image`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${userStore.token}`,
                },
                body: form,
            });

            if (error) {
                if (error.value?.data.code === 609) {
                    userStore.logOut();
                }
            }

            return {
                code: 200,
                content: data.value,
            };
        } catch (e) {
            return {
                code: 400,
                error: e,
            };
        }
    }

    async function update(id: number, form: any) {

        try {
            const { error, data } = await useFetch(`${userStore.api}/product/${id}`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${userStore.token}`,
                },
                body: { ...form },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userStore.logOut();
                }
                throw error;
            }

            await downloadAll();

            return { code: 200 };
        } catch (e) {
            alert("Ocorreu um erro ao salvar o produto");
            return { code: 400 };
        }
    }

    async function create(form: any) {

        try {
            const { error, data } = await useFetch(`${userStore.api}/product`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${userStore.token}`,
                },
                body: { ...form },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userStore.logOut();
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

    async function del(id: number) {

        try {
            const { error } = await useFetch(`${userStore.api}/product/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${userStore.token}`,
                },
            });

            if (error.value) {
                if (error.value?.data.code === 609) {
                    return userStore.logOut();
                }
                throw error;
            }

            await downloadAll();

            return { code: 200 };
        } catch (e) {
            return {
                code: 400,
                content: e,
            };
        }
    }



    return {
        productList,
        loadData,
        downloadAll,
        downloadOne,
        uploadImg,
        create,
        update,
        del
    }
})