import { read } from "~/composables/localStorage";

class userFunctions {
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

export default new userFunctions();
