export default function utils() {
  const env = useRuntimeConfig();
  const api = env.public.apiBase;
  const token = useCookie("token");
  const user = useCookie("user");

  return {
    token,
    user,
    api,
  };
}
