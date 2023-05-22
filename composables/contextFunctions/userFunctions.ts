import utils from "../utils";

interface loginFormI {
  email: string;
  password: string;
}

class userFunctions {
  public async login(form: loginFormI) {
    const { token, api, user } = utils();
    try {
      const { data }: any = await useFetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { ...form },
      });

      token.value = data.value.token;
      user.value = data.value.user.name;

      return { code: 200 };
    } catch (e: any) {
      return {
        code: 400,
        error: new Error(e),
      };
    }
  }

  public async validateLogin() {
    const { token, api, user } = utils();
    try {
      const { error, data } = await useFetch(`${api}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token.value}`,
        },
      });

      if (error.value) {
        throw error;
      }

      return { code: 200, content: data.value };
    } catch (e) {
      token.value = null;
      user.value = null;
      return { code: 400 };
    }
  }
}

export default new userFunctions();
