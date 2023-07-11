import userFunctions from "~/composables/contextFunctions/userFunctions";
import utils from "~/composables/utils";

export default defineNuxtRouteMiddleware(async (to) => {
  const { token, user } = utils();


  if (!token.value) {
    token.value = null;
    user.value = null;

    return "/"
  } else {
    const res: any = await userFunctions.getUserInfoFromToken();
    if (res.code !== 200) {
      token.value = null;
      user.value = null;
      return "/"
    }
  }

})
