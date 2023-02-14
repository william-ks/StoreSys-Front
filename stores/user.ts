import stateHook from "~~/composables/state";

export const userStore = defineStore("user", () => {
  // const [name, setName] = stateHook("William K");

  const logOut = async (): Promise<void> => {
    try {
      //
      navigateTo("/");
    } catch (e) {
      alert("Error");
    }
  };

  return { logOut };
});
