import utils from "../utils";

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
        console.log("refresh");
        await res.refresh();
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
