export const formatToPrice = (value: number) => {
  const newValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return newValue;
};
