export default function stateHook(initialValue: any) {
  const state = ref(initialValue);
  const setState = (newValue: any) => {
    state.value = newValue;
  };

  return [readonly(state), setState];
}
