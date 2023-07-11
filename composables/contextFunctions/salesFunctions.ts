import userFunctions from './userFunctions';
import { read } from "~/composables/localStorage";

class salesFunctions {
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
      const { error, data, refresh } = await useFetch(`${this.api()}/sales`, {
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

  public async downloadPaymentsMethods() {
    try {
      const { error, data, refresh } = await useFetch(`${this.api()}/payments`, {
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

  public async create(form: any) {
    const { api, token } = utils();
    try {
      const { error, data } = await useFetch(`${api}/sales`, {
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
}

export default new salesFunctions();
