import { useUser } from "~/store/user";

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUser();


  if (!userStore.token) {
    userStore.removeCookies();
    return "/"
  } else {
    const res: any = await userStore.getUserInfoFromToken();
    if (res.code !== 200) {
      userStore.removeCookies();
      return "/"
    }
  }

})
