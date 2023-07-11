import utils from "../utils";
import userFunctions from "./userFunctions";

class productsFunctions {
  public async downloadAll() {
    const { api, token } = utils();
    try {
      const res = await useFetch(`${api}/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token.value}`,
        },
      });

      if (!res.data.value) {
        await res.refresh();
      }

      if (res.error) {
        if (res.error.value?.data.code === 609) {
          userFunctions.logOut();
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

  public async downloadOne(id: number) {
    const { api, token } = utils();
    try {
      const res = await useFetch(`${api}/product/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token.value}`,
        },
      });

      if (res.error) {
        if (res.error.value?.data.code === 609) {
          userFunctions.logOut();
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

  public async uploadImg(form: any) {
    const { api, token } = utils();
    try {
      const { error, data } = await useFetch(`${api}/product/image`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: form,
      });

      if (error) {
        if (error.value?.data.code === 609) {
          userFunctions.logOut();
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

  public async update(id: number, form: any) {
    const { api, token } = utils();
    try {
      const { error, data } = await useFetch(`${api}/product/${id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: { ...form },
      });

      if (error.value) {
        if (error.value?.data.code === 609) {
          return userFunctions.logOut();
        }
        throw error;
      }

      return { code: 200 };
    } catch (e) {
      alert("Ocorreu um erro ao salvar o produto");
      return { code: 400 };
    }
  }

  public async create(form: any) {
    const { api, token } = utils();
    try {
      const { error, data } = await useFetch(`${api}/product`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token.value}`,
        },
        body: { ...form },
      });

      if (error.value) {
        if (error.value?.data.code === 609) {
          return userFunctions.logOut();
        }
        throw error;
      }

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

  public async del(id: number) {
    const { api, token } = utils();
    try {
      const { error } = await useFetch(`${api}/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token.value}`,
        },
      });

      if (error.value) {
        if (error.value?.data.code === 609) {
          return userFunctions.logOut();
        }
        throw error;
      }

      return { code: 200 };
    } catch (e) {
      return {
        code: 400,
        content: e,
      };
    }
  }
}

export default new productsFunctions();
