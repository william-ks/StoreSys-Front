import { read, create, del, clear } from "~/composables/localStorage";

class categoriesFunctions {
  private api() {
    const env = useRuntimeConfig();
    return env.public.apiBase;
  }

  private token() {
    const token = useCookie("token");
    return token;
  }

  public async download(refreshing?: boolean) {
    try {
      const res: any = await useFetch(`${this.api()}/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${this.token().value}`,
        },
      });

      if (!res.data.value && !refreshing) {
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
}

export default new categoriesFunctions();
